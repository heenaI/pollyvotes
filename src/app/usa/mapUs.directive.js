(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .directive('globe', globe);

  /** @ngInject */
  function globe(mapService, modelService, inpollsService, expertService, predictionService, expecService) {
    return {
            restrict   : 'E',
            templateUrl: function (tElement, tAttrs) {
            if (tAttrs) {
                if (tAttrs.type === 'detaliedMap') {
                    return 'app/usa/usMap.html';
                }
                if (tAttrs.type === 'simpleUSMap') {
                    return 'app/usa/usMapSimple.html';
                }
            }
        },
            link: link
        };

        function link($scope, element) {
              var colors = ["#e74c3c", "#f4a582", "#d7dadb", "#92c5de", "#2980b9"],
               labels = ["Safe Republican", "Lean Republican", "Tossup", "Lean Democrat", "Safe Democrat"],
               dataUs = [],
               dateFormat = d3.time.format("%d.%m.%Y"),
               dateFormatChanged = d3.time.format("%b %d"),
               width = 960,
               height = 500,
               centered;
               var svg
               var features
               $scope.methods = ['PollyVote forecast', 'Polls', 'Models', 'Experts', 'Markets',  'Citizen forecasts']
               var repElectoralVote = []
               var demElectoralVote = []
               var neutralVote = []
               var demoDotted = [];
               var repDotted = [];
               var neutralVotes = [];
               var ids = ['#demdotted', '#neu', '#repdotted']
               var className = document.querySelector("#mapUSA").getAttribute("class");
               var datacleaned = [];


               //console.log($scope.lastUpadate)

               var now = moment();
               //console.log(now)
               //
               ////Map projection
      var projection = d3.geo.albersUsa()
          .scale(1100);

      //Generate paths based on projection
      var path = d3.geo.path()
          .projection(projection);


      //Create an SVG


      //Group for the map features
function makeFeatures(){
       svg = d3.select("#mapUSA");
       features = svg.append("g")
          .attr("class","features")
          .attr('id', 'features');
}

      //Create choropleth scale
      var color = d3.scale.quantize()
                   .domain([0,1])
                   .range(colors);

      //tooltip
      var mapTooltip = d3.select("body")
            .append("div")
            .attr("class", "mapTooltip");

      //Keeps track of currently zoomed feature
      var centered;

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function checkVariable(datavariable){
  if(toType(datavariable) == 'string'){
    return parseInt(datavariable.replace(/[^0-9.]/g, ""))
  } else {
    return datavariable
  }
}

function checkForNull(datavariable){
  var cleaning = checkVariable(datavariable)
  if(isNaN(cleaning)==true){
    return 0
  } else {
    return cleaning
  }
}
function cleanStrings(strings){
  if(strings==""){
    return 0
  } else if (strings == undefined){
    return 0
  } else if(strings == 'D'){
    return 'Clinton'
  } else if (strings == 'R'){
    return 'Trump'
  } else if(strings == 'T'){
    return 'Tossup'
  }
}


var uiqueData = [];

function organizeData(stateNames, data, dataCollector, date){
dataCollector.length = 0;
datacleaned.length = 0;
// console.log(JSON.stringify(data))

for(var i=0; i<data.data.length; i++){
  var stateId = data.data[i].state
    if(data.data[i].fcdate == date){

        var stateid = data.data[i].state
        var republicanWinFreq = checkForNull(data.data[i].fcrepwinfreq)
        var democratsWinFreq = checkForNull(data.data[i].fcdemwinfreq)
        var winner = cleanStrings(data.data[i].fcwinner)
        var twoPartyDemo = checkForNull(data.data[i].fcdemvs)
        var twoPartyRep = checkForNull(data.data[i].fcrepvs)
        var date = data.data[i].fcdate
        var lastupdate = data.data[i]._lastupdate


        datacleaned.push(
        {
          'iso_2': stateid,
          'Republican_fre': republicanWinFreq,
          'Democrats_fre': democratsWinFreq,
          'twoPartyDemo': twoPartyDemo,
          'twoPartyRep': twoPartyRep,
          'winner': winner,
          'totalComponents': republicanWinFreq+democratsWinFreq,
          'date': date,
          'lastupdate': lastupdate

        })




    }

  }


// console.log(JSON.stringify(datacleaned))
var datajoined = datacleaned.slice().map(function(el){
    for (var i = 0, l = stateNames.states.length; i < l; i++) {
        if (el.iso_2 === stateNames.states[i].iso2) {
            el.electoral_vote = stateNames.states[i].state_electoralvote;
            el.name = stateNames.states[i].fullName
        }
    }
    dataCollector.push(el);
});

console.log(JSON.stringify(dataCollector))

};


function collectElecVotes(orgData){
  repElectoralVote.length = 0;
  demElectoralVote.length = 0;
  neutralVote.length = 0;

  for(var i=0; i<orgData.length; i++){

  if(orgData[i].Republican_fre>orgData[i].Democrats_fre){
    repElectoralVote.push(orgData[i].electoral_vote)
  } else if(orgData[i].Republican_fre<orgData[i].Democrats_fre){
    demElectoralVote.push(orgData[i].electoral_vote)
  } else if(orgData[i].Republican_fre==orgData[i].Democrats_fre && orgData[i].twoPartyDemo>orgData[i].twoPartyRep){
    demElectoralVote.push(orgData[i].electoral_vote)
  } else if(orgData[i].Republican_fre==orgData[i].Democrats_fre && orgData[i].twoPartyDemo<orgData[i].twoPartyRep){
    repElectoralVote.push(orgData[i].electoral_vote)
  } else if(orgData[i].Republican_fre==orgData[i].Democrats_fre && orgData[i].twoPartyDemo==orgData[i].twoPartyRep){
    neutralVote.push(orgData[i].electoral_vote)
  } else if(orgData[i].Republican_fre==0 && orgData[i].Democrats_fre==0 && orgData[i].twoPartyDemo==0 && orgData[i].twoPartyRep==0){
    neutralVote.push(orgData[i].electoral_vote)
  }
}

};

//create legend

    var legendHeading = d3.select("#legend")
        .append('text')
        .text('Trump')
        .attr('class', 'legendHeading')
        .attr("style", "color:#e74c3c;");

     var legend =  d3.select("#legend")
               .append("ul")
               .attr("class", "list-inline")
               .attr("id", "legendList");

    var legendHeading = d3.select("#legend")
        .append('text')
        .text('Clinton')
        .attr('class', 'legendHeading')
        .attr("style", "color:#2980b9;")


    var keys = legend.selectAll('li.key')
        .data(color.range());

    keys.enter().append('li')
    .attr('class', 'key')
    .style('border-left-color', String)
    .append('text')
    .data(labels)
    .text(function(d){return d});




function createBars(sumRep, sumDem, neutral){

    width = 600,
    height = 20;
    var dataset = [{
     data: [{
            name: 'Clinton',
            value: sumDem
        }]
    },
     {
     data: [{
            name: 'Neutral',
            value: neutral
        }]
    },
     {
     data: [{
            name: 'Trump',
            value: sumRep
        }]
    }]

    console.log(JSON.stringify(dataset))
    var series = dataset.map(function (d) {
        return d.name;
    })
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                x: o.name,
                y: o.value
            };
        });
    })
    var stack = d3.layout.stack()

    stack(dataset)

    dataset = dataset.map(function (group) {
    return group.map(function (d) {

        // Invert the x and y values, and y0 becomes x0
        return {
            x: d.y,
            y: d.x,
            x0: d.y0
        };
    });
})
    var barsSvg = d3.selectAll('#bars, #barsSimple')
        .append('g')
        .attr('class', 'maing')

    var xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    })

    var xScale = d3.scale.linear()
        .domain([0, xMax])
        .range([0, 900]),
    months = dataset[0].map(function (d) {
        return d.y
    })
    var yScale = d3.scale.ordinal()
        .domain(months)
        .rangeRoundBands([0, height]),
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom'),
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left'),

    groups = barsSvg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .style('fill', function (d, i) {
          console.log(JSON.stringify(d))
        if(d[0].y=='Clinton'){
        return colors[4]
        }else if(d[0].y=='Neutral'){
          return colors[2]
        } else if(d[0].y=='Trump'){
        return colors[0]
        }

    }),

    rects = groups.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        .attr('x', function (d) {
        return xScale(d.x0);
    })
        .attr('y', function (d, i) {
        return yScale(d.y0);
    })
        .attr('height', function (d) {
        return yScale.rangeBand();
    })
        .attr('width', function (d) {
        return xScale(d.x);
    })
    .attr('id', function (d, i) {
        return 'bar' + '_' + d.y
    })
    .attr('class', 'bars'),

    lineEnd = 270,

   line = barsSvg.append("line")
    .attr('class', 'endLine')
      .attr("x1", function(){ return  xScale(lineEnd)})
      .attr("x2", function(){ return  xScale(lineEnd)})
      .attr("y1", -2)
      .attr("y2", height+18)
      .attr("stroke-width", 3),

   myText =  barsSvg.append("text")
   .attr("x", function(){ return xScale(lineEnd - 87)})
   .attr("y", height+12)
   .text("270 electoral votes");

   var trumpNumber = d3.select('#trumpText')
        .append('text')
        .text(sumRep)
        .attr('class', 'tru')

   var ClintonNumber = d3.select('#clintonText')
        .append('text')
        .text(sumDem)
        .attr('class', 'cli')


}


function makeMap(stateNames, data, geodata){
  features.selectAll("path")
    .data(geodata.features) //generate features from TopoJSON
    .enter()
    .append("path")
    .attr("d",path)
    .attr("class", "states")
    .attr("id", function(d){ for(var i = 0; i<stateNames.states.length; i++){
      if(stateNames.states[i].fullName === d.properties.NAME){
        return stateNames.states[i].iso2
      }
    }})
    .attr("fill", function(d){
     var id = this.id
      for(var i=0; i<data.length; i++){
        if(this.id==data[i].iso_2){
                var republicanWinFreq = data[i].Republican_fre
                var democratsWinFreq = data[i].Democrats_fre
                var sum = republicanWinFreq + democratsWinFreq
                var republicanWinShare = (republicanWinFreq / sum) *100

                var democratsWinShare = (democratsWinFreq / sum) *100
                var repVoteShare = data[i].twoPartyRep
                var demVoteShare = data[i].twoPartyDemo

                if(republicanWinShare>democratsWinShare && republicanWinShare<=100 && republicanWinShare>75){
                  return colors[0]
                }
                else if (republicanWinShare>democratsWinShare &&  republicanWinShare<=75 && republicanWinShare>=50){
                  return colors[1]
                }
                else if (republicanWinShare == democratsWinShare  && repVoteShare>demVoteShare && repVoteShare<=100 && repVoteShare>75){
                 return colors[0]
                }
                else if (republicanWinShare == democratsWinShare  && repVoteShare>demVoteShare && repVoteShare<=75 && repVoteShare>=50){
                 return colors[1]
                }
                else if (republicanWinShare == 0 && democratsWinShare == 0  && repVoteShare>demVoteShare && repVoteShare<=100 && repVoteShare>75){
                 return colors[0]
                }
                else if (republicanWinShare == 0 && democratsWinShare == 0  && repVoteShare>demVoteShare && repVoteShare<=75 && repVoteShare>=50){
                 return colors[1]
                }

                else if (republicanWinShare == democratsWinShare  && demVoteShare>repVoteShare && demVoteShare<=100 && demVoteShare>75){
                 return colors[4]
                }
                else if (republicanWinShare == democratsWinShare  && demVoteShare>repVoteShare && demVoteShare<=75 && demVoteShare>=50){
                 return colors[3]
                }
                else if(republicanWinFreq == 0 && democratsWinFreq == 0 && demVoteShare>repVoteShare && demVoteShare<=100 && demVoteShare>75){
                  return colors[3]
                }

                else if(republicanWinFreq == 0 && democratsWinFreq == 0 && demVoteShare>repVoteShare && demVoteShare<=75 && demVoteShare>=50){
                  return colors[3]
                }

                else if (democratsWinShare>republicanWinShare &&  democratsWinShare<=100 && democratsWinShare>75) {
                  return colors[4]
                }
                else if (democratsWinShare>republicanWinShare && democratsWinShare<=75 && democratsWinShare>=50) {
                  return colors[3]
                }
                else if(republicanWinFreq == 0 && democratsWinFreq == 0 && repVoteShare == 0 && demVoteShare == 0){
                  return colors[2]
                }}}})
    .on("mouseover", showTooltip)
    .on("mousemove",moveTooltip)
    .on("mouseout",hideTooltip)
    .on("click",clicked);

    //Position of the tooltip relative to the cursor
var tooltipOffset = {x: 3, y: -150};

//Create a tooltip, hidden at the start


function showTooltip(d) {

function addStosingle(number){
if(number==1){
return number + ' ' + "predict's"
} else if(number>1) {
return number + ' '  + "predict"
} else if(number==0){
  return 'none' + ' '  + "predict"
}
}


var tooltipsDisplay = mapTooltip.style("display","block");

tooltipsDisplay.style("visibility", "visible")
if(className == 'simpleMap'){
          $('path').mouseenter(function (d) {

            var pathId = $(this).attr('id');

  for(var i=0; i<data.length; i++){
              var dem = data[i].twoPartyDemo
              var rep = data[i].twoPartyRep

              if (pathId == data[i].iso_2 && data[i].Democrats_fre > data[i].Republican_fre){
                return mapTooltip.html(
                  "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
                  "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+ "</span>" + "</p>"+
                  "<p class='elecVote'>" + "Out of " + "<span >"+ addStosingle(data[i].totalComponents)+ "</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Democrats_fre) +"</span>" +" Clinton to win whereas "+ "<span>" + addStosingle(dataUs[i].Republican_fre) +"</span>" +" Trump." +"</p>"+
                  "<p class='elecVote boldText'>Popular vote forecast:</p>"+
                  "<p class='elecVote'>Clinton:" + " " + dem.toFixed(1) + "</p>"+
                  "<p class='elecVote'>Trump:" + " " + rep.toFixed(1) + "</p>"+
                  "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
                  )

          } else if(pathId == data[i].iso_2 && data[i].Democrats_fre < data[i].Republican_fre) {
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+"</span>" + "</p>"+
               "<p class='elecVote'>" + "Out of "+ "<span >" + addStosingle(data[i].totalComponents)+"</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Republican_fre)+"</span>" + " Trump to win whereas "+ "<span>" + addStosingle(dataUs[i].Democrats_fre)+"</span>" + " Clinton." + "</p>" +
               "<p class='elecVote boldText'>Popular vote forecast:</p>"+
               "<p class='elecVote'>Clinton:" + " " + data[i].twoPartyDemo.toFixed(1) + "</p>"+
               "<p class='elecVote'>Trump:" + " " + data[i].twoPartyRep.toFixed(1) + "</p>"+
               "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
              )
          }
          else if(pathId == data[i].iso_2  && data[i].Democrats_fre == data[i].Republican_fre && data[i].twoPartyRep>data[i].twoPartyDemo) {
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+"</span>" + "</p>"+
               "<p class='elecVote'>" + "Out of "+ "<span >" + addStosingle(data[i].totalComponents)+"</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Republican_fre)+"</span>" + " Trump to win whereas "+ "<span>" + addStosingle(dataUs[i].Democrats_fre)+"</span>" + " Clinton." + "</p>" +
               "<p class='elecVote boldText'>Popular vote forecast:</p>"+
               "<p class='elecVote'>Clinton:" + " " + data[i].twoPartyDemo.toFixed(1) + "</p>"+
               "<p class='elecVote'>Trump:" + " " + data[i].twoPartyRep.toFixed(1) + "</p>"+
               "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
              )
          }
           else if(pathId == data[i].iso_2  && data[i].Democrats_fre == data[i].Republican_fre && data[i].twoPartyRep<data[i].twoPartyDemo) {
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+"</span>" + "</p>"+
               "<p class='elecVote'>" + "Out of "+ "<span>" + addStosingle(data[i].totalComponents)+"</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Republican_fre)+"</span>" + " Trump to win whereas "+ "<span>" + addStosingle(dataUs[i].Democrats_fre) +"</span>" + " Clinton." + "</p>" +
               "<p class='elecVote boldText'>Popular vote forecast:</p>"+
               "<p class='elecVote'>Clinton:" + " " + data[i].twoPartyDemo.toFixed(1) + "</p>"+
               "<p class='elecVote'>Trump:" + " " + data[i].twoPartyRep.toFixed(1) + "</p>"+
               "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
              )
          }

          else if(pathId == data[i].iso_2 && data[i].Democrats_fre==0 && data[i].Republican_fre==0 && data[i].twoPartyRep==0  && data[i].twoPartyDemo==0){
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p>"+ "Sorry No Data available for "+ data[i].name  +"</p>"

              )
          }
          }







        });

}
else if(className == 'mapmain'){

            $('path').mouseenter(function (d) {

            var pathId = $(this).attr('id');

  for(var i=0; i<data.length; i++){
              var dem = data[i].twoPartyDemo
              var rep = data[i].twoPartyRep
              if (pathId == data[i].iso_2 && data[i].Democrats_fre > data[i].Republican_fre){
                return mapTooltip.html(
                  "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
                  "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+ "</span>" + "</p>"+
                  "<p class='elecVote'>" + "Out of " + "<span >"+addStosingle(data[i].totalComponents)+ "</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Democrats_fre) +"</span>" +" Clinton to win whereas "+ "<span>" + addStosingle(dataUs[i].Republican_fre) +"</span>" +" Trump." +"</p>"+
                  "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
                  )

          } else if(pathId == data[i].iso_2 && data[i].Democrats_fre < data[i].Republican_fre) {
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+"</span>" + "</p>"+
               "<p class='elecVote'>" + "Out of "+ "<span >" + addStosingle(data[i].totalComponents)+"</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Republican_fre)+"</span>" + " Trump to win whereas "+ "<span>" + addStosingle(dataUs[i].Democrats_fre)+"</span>" + " Clinton." + "</p>" +
               "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
              )
          }
          else if(pathId == data[i].iso_2  && data[i].Democrats_fre == data[i].Republican_fre) {
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p class='elecVote'>"  + "Electoral votes: "+ "<span class='boldText'>" +data[i].electoral_vote+"</span>" + "</p>"+
               "<p class='elecVote'>" + "Out of "+ "<span>" + addStosingle(data[i].totalComponents)+"</span>" + " available component methods, "+ "<span>" + addStosingle(dataUs[i].Republican_fre)+"</span>" + " Trump to win whereas "+ "<span>" + addStosingle(dataUs[i].Democrats_fre)+"</span>" + " Clinton." + "</p>" +
               "<p class='boldText pollyBot'>"+ "Click to learn more about the race in " + data[i].name + "." + "</p>"
              )
          }
          else if(pathId == data[i].iso_2 && data[i].Democrats_fre==0 && data[i].Republican_fre==0 && data[i].twoPartyRep==0  && data[i].twoPartyDemo==0){
            return mapTooltip.html(
               "<h3 class='headerMap'>"  + data[i].name + "</h3>"+
               "<p>"+ "Sorry No Data available for "+ data[i].name  +"</p>"

              )
          }
          }







        });

}






}

//Move the tooltip to track the mouse
function moveTooltip() {
  mapTooltip.style("top", (d3.event.pageY+tooltipOffset.y)+"px")
      .style("left", (d3.event.pageX+tooltipOffset.x)+"px");
}

//Create a tooltip, hidden at the start
function hideTooltip() {
 mapTooltip.style("visibility","hidden");
}

function clicked(d,i) {

  var id = this.id
  var url = 'http://pollyvote.com/en/category/state/' + id + '/'
  // console.log(url)
  window.open(url, '_blank')

}
  };



function models(){
  d3.select("#features").remove();
  d3.selectAll("#points, .cli, .tru, .endLine").remove();
  d3.select('.maing').remove();
modelService.getData()
         .success(function(data){

          var rawData = data

          repElectoralVote = []
          demElectoralVote = []

          // console.log(rawData)
          var lastDate = rawData.data[0].fcdate
          $scope.lastUpadate = moment(rawData.lastupdate, "X").fromNow();
           $scope.dateFormated = moment(lastDate, "DD.MM.YYYY").format('MMMM Do YYYY')

        d3_queue.queue()
         .defer(d3.json, 'app/usa/us.json')
         .defer(d3.json, 'app/usa/stateNames.json')
         .await(makeMyMap);



function makeMyMap(error, geodata, stateNames){
      organizeData(stateNames, rawData, dataUs, lastDate);
      collectElecVotes(dataUs);
      $scope.sumOfRepublicanVote = repElectoralVote.reduce(add, 0)
      $scope.sumOfDemocratsVote = demElectoralVote.reduce(add, 0)
      $scope.sumofNeutralVotes = neutralVote.reduce(add, 0)
      function add(a, b) {
              return a + b;
      }

      createBars($scope.sumOfRepublicanVote, $scope.sumOfDemocratsVote, $scope.sumofNeutralVotes)


        $scope.firstSentence = 'The party that wins most electoral votes, and not most popular votes, wins the presidential election. The econometric models foresee '
        $scope.repubDiff = $scope.sumOfRepublicanVote - 270
        $scope.demoDiff = $scope.sumOfDemocratsVote - 270
        $scope.lastSentence = 'more than the 270 that are necessary to win.'



        var foundID = document.getElementById("mapDisc")
        if(foundID && $scope.sumOfRepublicanVote>$scope.sumOfDemocratsVote){
          //document.getElementById("hiddenCheckRep").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Trump to gain approximately ' + $scope.sumOfRepublicanVote + ' electoral votes, ' + $scope.repubDiff+ ' ' + $scope.lastSentence
          } else if (foundID && $scope.sumOfRepublicanVote<$scope.sumOfDemocratsVote) {
          //document.getElementById("hiddenCheckDemo").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Clinton to gain approximately ' + $scope.sumOfDemocratsVote + ' electoral votes, ' + $scope.demoDiff+ ' ' + $scope.lastSentence
        }

        var foundID = document.getElementById("mapdemnumbers")

        if(foundID){
          document.getElementById("mapdemnumbers").innerHTML = $scope.sumOfDemocratsVote
          document.getElementById("maprepnumbers").innerHTML = $scope.sumOfRepublicanVote
          // document.getElementById("demoPercent").innerHTML = $scope.democratesAvg.toFixed(2) + '%'
          // document.getElementById("repPercent").innerHTML = $scope.repAvg.toFixed(2) + '%'
        }
        makeFeatures();
        makeMap(stateNames, dataUs, geodata);

};

})
}

function pollyvote_forecast(){
  d3.select("#features").remove();
  d3.selectAll("#points, .cli, .tru, .endLine").remove();
  d3.select('.maing').remove();
  d3.select("#mapUSA")
  .attr('class', 'withTooltips')


mapService.getData()
         .success(function(data){


          var rawData = data

          repElectoralVote = []
          demElectoralVote = []
          var lastDate = rawData.data[0].fcdate

          $scope.lastUpadate = moment(rawData.lastupdate, "X").fromNow();
           $scope.dateFormated = moment(lastDate, "DD.MM.YYYY").format('MMMM Do YYYY')

        d3_queue.queue()
         .defer(d3.json, 'app/usa/us.json')
         .defer(d3.json, 'app/usa/stateNames.json')
         .await(makeMyMap);


function makeMyMap(error, geodata, stateNames){
      organizeData(stateNames, rawData, dataUs, lastDate);
      repElectoralVote.length = 0
      collectElecVotes(dataUs);
      $scope.sumOfRepublicanVote = repElectoralVote.reduce(add, 0)
      $scope.sumOfDemocratsVote = demElectoralVote.reduce(add, 0)
      $scope.sumofNeutralVotes = neutralVote.reduce(add, 0)


      function add(a, b) {
              return a + b;
      }
       createBars($scope.sumOfRepublicanVote, $scope.sumOfDemocratsVote, $scope.sumofNeutralVotes);

        $scope.firstSentence = 'The party that wins most electoral votes, and not most popular votes, wins the presidential election. The latest prediction foresees '
        $scope.repubDiff = $scope.sumOfRepublicanVote - 270
        $scope.demoDiff = $scope.sumOfDemocratsVote - 270
        $scope.lastSentence = 'more than the 270 that are necessary to win.'



        var foundID = document.getElementById("mapDisc")
        if(foundID && $scope.sumOfRepublicanVote>$scope.sumOfDemocratsVote){
          //document.getElementById("hiddenCheckRep").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Trump to gain approximately ' + $scope.sumOfRepublicanVote + ' electoral votes, ' + $scope.repubDiff+ ' ' + $scope.lastSentence
          } else if (foundID && $scope.sumOfRepublicanVote<$scope.sumOfDemocratsVote) {
          //document.getElementById("hiddenCheckDemo").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Clinton to gain approximately ' + $scope.sumOfDemocratsVote + ' electoral votes, ' + $scope.demoDiff+ ' ' + $scope.lastSentence
        }


        var foundID = document.getElementById("mapdemnumbers")

        if(foundID){
          document.getElementById("mapdemnumbers").innerHTML = $scope.sumOfDemocratsVote
          document.getElementById("maprepnumbers").innerHTML = $scope.sumOfRepublicanVote
          // document.getElementById("demoPercent").innerHTML = $scope.democratesAvg.toFixed(2) + '%'
          // document.getElementById("repPercent").innerHTML = $scope.repAvg.toFixed(2) + '%'
        }
        makeFeatures();
        makeMap(stateNames, dataUs, geodata);
        // console.log(dataUs)

};

})
}
pollyvote_forecast();

 $scope.myFunction = function(functionName) {
         var str = functionName
         str = str.replace(/\s+/g, '_').toLowerCase();
    eval(str+'()')
  }

//second Service
function polls(){

  d3.select("#features").remove();
  d3.selectAll("#points, .cli, .tru, .endLine").remove();
  d3.select('.maing').remove();

  inpollsService.getData()
         .success(function(data){

          var rawData = data
          repElectoralVote = []
          demElectoralVote = []

          // console.log(rawData)
          var lastDate = rawData.data[0].fcdate
          $scope.lastUpadate = moment(rawData.lastupdate, "X").fromNow();
           $scope.dateFormated = moment(lastDate, "DD.MM.YYYY").format('MMMM Do YYYY')

        d3_queue.queue()
         .defer(d3.json, 'app/usa/us.json')
         .defer(d3.json, 'app/usa/stateNames.json')
         .await(makeMyMap);


function makeMyMap(error, geodata, stateNames){
      organizeData(stateNames, rawData, dataUs, lastDate);
      collectElecVotes(dataUs);
      $scope.sumOfRepublicanVote = repElectoralVote.reduce(add, 0)
      $scope.sumOfDemocratsVote = demElectoralVote.reduce(add, 0)
      $scope.sumofNeutralVotes = neutralVote.reduce(add, 0)




      function add(a, b) {
              return a + b;
      }

        $scope.firstSentence = 'The party that wins most electoral votes, and not most popular votes, wins the presidential election. The econometric models foresee '
        $scope.repubDiff = $scope.sumOfRepublicanVote - 270
        $scope.demoDiff = $scope.sumOfDemocratsVote - 270
        $scope.lastSentence = 'more than the 270 that are necessary to win.'



        var foundID = document.getElementById("mapDisc")
        if(foundID && $scope.sumOfRepublicanVote>$scope.sumOfDemocratsVote){
          //document.getElementById("hiddenCheckRep").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Trump to gain approximately ' + $scope.sumOfRepublicanVote + ' electoral votes, ' + $scope.repubDiff+ ' ' + $scope.lastSentence
          } else if (foundID && $scope.sumOfRepublicanVote<$scope.sumOfDemocratsVote) {
          //document.getElementById("hiddenCheckDemo").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Clinton to gain approximately ' + $scope.sumOfDemocratsVote + ' electoral votes, ' + $scope.demoDiff+ ' ' + $scope.lastSentence
        }

        var foundID = document.getElementById("mapdemnumbers")

        if(foundID){
          document.getElementById("mapdemnumbers").innerHTML = $scope.sumOfDemocratsVote
          document.getElementById("maprepnumbers").innerHTML = $scope.sumOfRepublicanVote
          // document.getElementById("demoPercent").innerHTML = $scope.democratesAvg.toFixed(2) + '%'
          // document.getElementById("repPercent").innerHTML = $scope.repAvg.toFixed(2) + '%'
        }


        makeFeatures();
        makeMap(stateNames, dataUs, geodata);
        createBars($scope.sumOfRepublicanVote, $scope.sumOfDemocratsVote, $scope.sumofNeutralVotes)
};

})

}

//Third Service
//
function experts(){
  d3.select("#features").remove();
  d3.selectAll("#points, .cli, .tru, .endLine").remove();
  d3.select('.maing').remove();
  expertService.getData()
         .success(function(data){

          var rawData = data
          repElectoralVote = []
          demElectoralVote = []

          console.log(rawData)
          var lastDate = rawData.data[0].fcdate
          $scope.lastUpadate = moment(rawData.lastupdate, "X").fromNow();
           $scope.dateFormated = moment(lastDate, "DD.MM.YYYY").format('MMMM Do YYYY')

        d3_queue.queue()
         .defer(d3.json, 'app/usa/us.json')
         .defer(d3.json, 'app/usa/stateNames.json')
         .await(makeMyMap);


function makeMyMap(error, geodata, stateNames){
      organizeData(stateNames, rawData, dataUs, lastDate);
      collectElecVotes(dataUs);
      $scope.sumOfRepublicanVote = repElectoralVote.reduce(add, 0)
      $scope.sumOfDemocratsVote = demElectoralVote.reduce(add, 0)
      $scope.sumofNeutralVotes = neutralVote.reduce(add, 0)




      function add(a, b) {
              return a + b;
      }

        $scope.firstSentence = 'The party that wins most electoral votes, and not most popular votes, wins the presidential election. The econometric models foresee '
        $scope.repubDiff = $scope.sumOfRepublicanVote - 270
        $scope.demoDiff = $scope.sumOfDemocratsVote - 270
        $scope.lastSentence = 'more than the 270 that are necessary to win.'



        var foundID = document.getElementById("mapDisc")
        if(foundID && $scope.sumOfRepublicanVote>$scope.sumOfDemocratsVote){
          //document.getElementById("hiddenCheckRep").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Trump to gain approximately ' + $scope.sumOfRepublicanVote + ' electoral votes, ' + $scope.repubDiff+ ' ' + $scope.lastSentence
          } else if (foundID && $scope.sumOfRepublicanVote<$scope.sumOfDemocratsVote) {
          //document.getElementById("hiddenCheckDemo").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Clinton to gain approximately ' + $scope.sumOfDemocratsVote + ' electoral votes, ' + $scope.demoDiff+ ' ' + $scope.lastSentence
        }

        var foundID = document.getElementById("mapdemnumbers")

        if(foundID){
          document.getElementById("mapdemnumbers").innerHTML = $scope.sumOfDemocratsVote
          document.getElementById("maprepnumbers").innerHTML = $scope.sumOfRepublicanVote
          // document.getElementById("demoPercent").innerHTML = $scope.democratesAvg.toFixed(2) + '%'
          // document.getElementById("repPercent").innerHTML = $scope.repAvg.toFixed(2) + '%'
        }


        makeFeatures();
        makeMap(stateNames, dataUs, geodata);
        createBars($scope.sumOfRepublicanVote, $scope.sumOfDemocratsVote, $scope.sumofNeutralVotes)

};

})

}

function markets(){
  d3.select("#features").remove();
  d3.selectAll("#points, .cli, .tru, .endLine").remove();
  d3.select('.maing').remove();
  predictionService.getData()
         .success(function(data){


          var rawData = data
          repElectoralVote = []
          demElectoralVote = []

          console.log(rawData)
          var lastDate = rawData.data[0].fcdate
          $scope.lastUpadate = moment(rawData.lastupdate, "X").fromNow();
           $scope.dateFormated = moment(lastDate, "DD.MM.YYYY").format('MMMM Do YYYY')

        d3_queue.queue()
         .defer(d3.json, 'app/usa/us.json')
         .defer(d3.json, 'app/usa/stateNames.json')
         .await(makeMyMap);


function makeMyMap(error, geodata, stateNames){
      organizeData(stateNames, rawData, dataUs, lastDate);
      collectElecVotes(dataUs);
      $scope.sumOfRepublicanVote = repElectoralVote.reduce(add, 0)
      $scope.sumOfDemocratsVote = demElectoralVote.reduce(add, 0)
      $scope.sumofNeutralVotes = neutralVote.reduce(add, 0)




      function add(a, b) {
              return a + b;
      }

        $scope.firstSentence = 'The party that wins most electoral votes, and not most popular votes, wins the presidential election. The econometric models foresee '
        $scope.repubDiff = $scope.sumOfRepublicanVote - 270
        $scope.demoDiff = $scope.sumOfDemocratsVote - 270
        $scope.lastSentence = 'more than the 270 that are necessary to win.'



        var foundID = document.getElementById("mapDisc")
        if(foundID && $scope.sumOfRepublicanVote>$scope.sumOfDemocratsVote){
          //document.getElementById("hiddenCheckRep").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Trump to gain approximately ' + $scope.sumOfRepublicanVote + ' electoral votes, ' + $scope.repubDiff+ ' ' + $scope.lastSentence
          } else if (foundID && $scope.sumOfRepublicanVote<$scope.sumOfDemocratsVote) {
          //document.getElementById("hiddenCheckDemo").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Clinton to gain approximately ' + $scope.sumOfDemocratsVote + ' electoral votes, ' + $scope.demoDiff+ ' ' + $scope.lastSentence
        }

        var foundID = document.getElementById("mapdemnumbers")

        if(foundID){
          document.getElementById("mapdemnumbers").innerHTML = $scope.sumOfDemocratsVote
          document.getElementById("maprepnumbers").innerHTML = $scope.sumOfRepublicanVote
          // document.getElementById("demoPercent").innerHTML = $scope.democratesAvg.toFixed(2) + '%'
          // document.getElementById("repPercent").innerHTML = $scope.repAvg.toFixed(2) + '%'
        }


        makeFeatures();
        makeMap(stateNames, dataUs, geodata);
        createBars($scope.sumOfRepublicanVote, $scope.sumOfDemocratsVote, $scope.sumofNeutralVotes)

};

})

}


function citizen_forecasts(){
  d3.select("#features").remove();
  d3.selectAll("#points, .cli, .tru, .endLine").remove();
  d3.select('.maing').remove();
  expecService.getData()
         .success(function(data){

          var rawData = data
          repElectoralVote = []
          demElectoralVote = []

          console.log(rawData)
          var lastDate = rawData.data[0].fcdate
          $scope.lastUpadate = moment(rawData.lastupdate, "X").fromNow();
           $scope.dateFormated = moment(lastDate, "DD.MM.YYYY").format('MMMM Do YYYY')

        d3_queue.queue()
         .defer(d3.json, 'app/usa/us.json')
         .defer(d3.json, 'app/usa/stateNames.json')
         .await(makeMyMap);


function makeMyMap(error, geodata, stateNames){
      organizeData(stateNames, rawData, dataUs, lastDate);
      collectElecVotes(dataUs);
      $scope.sumOfRepublicanVote = repElectoralVote.reduce(add, 0)
      $scope.sumOfDemocratsVote = demElectoralVote.reduce(add, 0)
      $scope.sumofNeutralVotes = neutralVote.reduce(add, 0)




      function add(a, b) {
              return a + b;
      }

        $scope.firstSentence = 'The party that wins most electoral votes, and not most popular votes, wins the presidential election. The econometric models foresee '
        $scope.repubDiff = $scope.sumOfRepublicanVote - 270
        $scope.demoDiff = $scope.sumOfDemocratsVote - 270
        $scope.lastSentence = 'more than the 270 that are necessary to win.'



        var foundID = document.getElementById("mapDisc")
        if(foundID && $scope.sumOfRepublicanVote>$scope.sumOfDemocratsVote){
          //document.getElementById("hiddenCheckRep").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Trump to gain approximately ' + $scope.sumOfRepublicanVote + ' electoral votes, ' + $scope.repubDiff+ ' ' + $scope.lastSentence
          } else if (foundID && $scope.sumOfRepublicanVote<$scope.sumOfDemocratsVote) {
          //document.getElementById("hiddenCheckDemo").style.display="block"
          document.getElementById("mapDisc").innerHTML = $scope.firstSentence + ' Clinton to gain approximately ' + $scope.sumOfDemocratsVote + ' electoral votes, ' + $scope.demoDiff+ ' ' + $scope.lastSentence
        }

        var foundID = document.getElementById("mapdemnumbers")

        if(foundID){
          document.getElementById("mapdemnumbers").innerHTML = $scope.sumOfDemocratsVote
          document.getElementById("maprepnumbers").innerHTML = $scope.sumOfRepublicanVote
          // document.getElementById("demoPercent").innerHTML = $scope.democratesAvg.toFixed(2) + '%'
          // document.getElementById("repPercent").innerHTML = $scope.repAvg.toFixed(2) + '%'
        }

        makeFeatures();
        makeMap(stateNames, dataUs, geodata);
        createBars($scope.sumOfRepublicanVote, $scope.sumOfDemocratsVote, $scope.sumofNeutralVotes)
};

})

}
        }
      }

})();

