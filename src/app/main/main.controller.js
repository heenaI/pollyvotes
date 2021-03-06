(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, lineChart, $translate, tmhDynamicLocale, $filter) {

    $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
  tmhDynamicLocale.set('en');
  moment.locale('en')

    $scope.photos = [   {id: 'chart-1',
                         name: "Predicting which party will win. Updated daily",
                         src: "assets/images/Image_Mirrored_Graph_3.png",
                         href: "https://www.google.de/?gws_rd=ssl",
                         discription: " "},
                        {id: 'chart-3',
                        name: 'Predicting the winner in each U.S. State',
                        src: "assets/images/Image_Map_new size.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "},
                        {id: 'chart-2',
                        name: 'Past predictions: 2004, 2008 & 2012',
                        src: "assets/images/Image_PollyVoteinAction_new size.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "},
                         {id: 'chart-4',
                        name: 'Election analytics as newsletter',
                        src: "assets/images/Image_RobotText.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "},
                        {id: 'chart-5',
                        name: 'What is PollyVote? And who is behind this?',
                        src: "assets/images/Image_About us.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "}
                    ];


   lineChart.getData()
         .success(function(data){
          var democrates_unordered = [];
          var republicans_unordered  = [];
          var ForecastsDateWhole_unordered  = [];
          var firstDate = new Date('04.01.2016')
          for (var i = 0; i<data.data.length; i++){
          if(data.data[i].fcdemvs != 0 && data.data[i].fcrepvs !=0){
          democrates_unordered.push(data.data[i].fcdemvs);
          republicans_unordered.push(data.data[i].fcrepvs);
          var date = data.data[i].fcdate;
          var dateSplit = date.split('.')
          var reserveDate = dateSplit.reverse();
          var joinDate = reserveDate.join('-');
          ForecastsDateWhole_unordered.push(joinDate);

            }

        }

          function computeLastThirtyItems(items){
          var lastThirtyItems = items.slice(Math.max(items.length - 30, 0))
          return lastThirtyItems

        }

        var democrates_ordered = democrates_unordered.reverse();
        var demoChart = ['Clinton', ]
        var democratesWhole = demoChart.concat(democrates_ordered);
        var democratesLastThirtyData = computeLastThirtyItems(democrates_ordered);
        var democratesLastThirty = demoChart.concat(democratesLastThirtyData);

        var republicans_ordered = republicans_unordered.reverse();
        var repChart = ['Trump', ]
        var republicansWhole = repChart.concat(republicans_ordered);
        var republicansLastThirtyData = computeLastThirtyItems(republicans_ordered);
        var republicansLastThirty = repChart.concat(republicansLastThirtyData);


        var ForecastsDateWhole_ordered = ForecastsDateWhole_unordered.reverse();
        var dateChart = ['x', ]
        var ForecastsDateWhole = dateChart.concat(ForecastsDateWhole_ordered);
        var ForecastsDateLastThirtyData = computeLastThirtyItems(ForecastsDateWhole_ordered);
        var ForecastsDateLastThirty = dateChart.concat(ForecastsDateLastThirtyData);


        $scope.lastitemDate = _.last(ForecastsDateWhole);
        $scope.latestDate = moment($scope.lastitemDate).format('MMM Do, YYYY')
        var dateLast = $scope.lastitemDate;
         var date = Date.parse(dateLast.replace(/-/g,"/"))
         var format = d3.time.format("%B %d");
         $scope.dateConvert = format(new Date(date));

        var democreatesLast = _.last(democratesWhole);
        var republicansLast = _.last(republicansWhole);
        var democratesSecondlast = democratesWhole[democratesWhole.length - 2]
        var republicansSecondlast = republicansWhole[republicansWhole.length - 2]



        function oneDeci(variable){
          var number = parseFloat(variable)
          var returnOneDeci = number.toFixed(1)
          return returnOneDeci

        }

        $scope.democrats = oneDeci(democreatesLast)

        $scope.republicans = oneDeci(republicansLast)


        function createConcatLastThirty(concatData, concatVari){
        var last = computeLastThirtyItems(concatData)
        var concatVar = [concatVari, ]
        var concatArray = concatVar.concat(last);
        return concatArray

        }

        function computepercentageChange(democreatesLast, democratesSecondlast){
          var x = democreatesLast-democratesSecondlast;
          return x.toFixed(2)

        }

        function computeDiffrence(democreatesLast, republicansLast){
          var x = Math.abs(democreatesLast - republicansLast);
          return x.toFixed(1)

        }

        $scope.democratesDiffrence = computepercentageChange(democreatesLast, democratesSecondlast);
        $scope.republicansDiffrence = computepercentageChange(republicansLast, republicansSecondlast);
        $scope.diffrenceParties = computeDiffrence(democreatesLast, republicansLast);


        function computeCandidates(){
           if(democreatesLast>republicansLast){
           return 'As of'+ ' ' +  $scope.dateConvert + ' '+ 'the Democrats are predicted to win the presidential election of 2016.'+ ' ' +'The latest data says that the Democrats will win with'+ ' ' + $scope.democrats +  ' ' + 'of the vote'+ ' ' +'while the Republicans get' + ' ' + $scope.republicans +  ' ' + 'percent.'
           } else {
           return 'As of'+ ' ' +  $scope.dateConvert + ' '+ 'the Republicans are predicted to win the presidential election of 2016.'+ ' ' +'The latest data says that the Republicans will win with'+ ' ' + $scope.republicans+  ' ' + 'of the vote'+ ' ' +'while the Democrats get' + ' ' + $scope.democrates +  ' ' + 'percent.'

           }

        }

        function computeHeading(){
           if(democreatesLast>republicansLast){
            return 'Prediction:  Clinton will win'
           } else {
             return 'Prediction: Trump will win'

           }

        }

        $scope.lastCandidate = computeCandidates();
        $scope.heading = computeHeading();

        function pointChart(a, b){
          if (a == true && b == true){
            return true
          } else {
            return false
          }

        }
function generateChartOne(){
       var chartOne = c3.generate({
         bindto: '#lineChart',
    data: {
      x: 'x',
        columns: [
        ForecastsDateWhole,
            democratesWhole,
            republicansWhole
        ],
         colors: {
            Clinton: '#2980b9',
            Trump: '#e74c3c'
        },
    },
     oninit: function () {
        this.main.append('rect')
            .style('fill', 'white')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.width)
            .attr('height', this.height)
          .transition().duration(1500)
            .attr('x', this.width)
            .attr('width', 0)
          .remove();
    },
     axis: {

        x: {
            type: 'timeseries',
            max: '2016-11-08',
            tick: {
               values: ["2016-02-01", "2016-06-14", "2016-11-08", "2016-09-26", "2016-10-19", "2016-07-18", "2016-07-28" ],
                format: d3.time.format("%b %d")
                },
            label: {
              text: 'Election Timeline',
              position: 'inner-right'
            }
        },
         y : {
            tick: {
                        values: ["46", "48", "50", "52", "54"],
                        format: function (d) { return parseInt(d)+ "%"; }
                    },
             label: {
                text: 'Two-party vote',
                position: 'inner-center'
            }
                }
    },
    grid: {
     y: {
        lines: [
                {value: 50},

            ]
     }
  },
  regions: [

        {axis: 'x', start: "2016-02-01", end: "2016-06-14", class: 'regionX', label: 'Primaries', horizotal: true},
        {axis: 'x', start: "2016-07-18", end: "2016-07-28", class: 'regionX', label: 'Conventions', horizotal: true},
        {axis: 'x', start: "2016-09-26", end: "2016-10-19", class: 'regionX', label: 'Debates', horizotal: true}

    ],
    point: {
      r: 1,
    focus: {
    expand: {
      enabled: true
    }
    }
       },
    legend: {
        show: false
    },
     tooltip: {
        format: {
          title: function (d) {
                               var date = moment(d).format('MMM Do')
                                return date},
            value: function (value, color) {

                return value.toFixed(1) + '%'

            }
        }
    }
});
};

function generateChartTwo(){
  var chart = c3.generate({
    bindto: '#lineChart',
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ForecastsDateLastThirty,
            democratesLastThirty,
            republicansLastThirty
        ],
         colors: {
            Clinton: '#2980b9',
            Trump: '#e74c3c'
        },
    },
     oninit: function () {
        this.main.append('rect')
            .style('fill', 'white')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.width)
            .attr('height', this.height)
          .transition().duration(1500)
            .attr('x', this.width)
            .attr('width', 0)
          .remove();
    },
    legend: {
        show: false
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%b-%d',
                 count: 7
            },
            label: {
              text: 'Election Timeline',
              position: 'inner-right'
            }
        },
        y : {
            tick: {
                        values: ["46", "48", "50", "52", "54"],
                        format: function (d) { return parseInt(d)+ "%"; }
                    },
             label: {
                text: 'Two-party vote',
                position: 'inner-center'
            }
                }
    },
    grid: {
     y: {
        lines: [
                {value: 50},

            ]
     }
    },
    point: {
      r: 1,
    focus: {
    expand: {
      enabled: true
    }
    }
       },
    tooltip: {
        format: {
          title: function (d) { var format=  d3.time.format("%B %d");
                                var date = format(d)
                                return date},
            value: function (value, color) {

                return value.toFixed(1) + '%'

            }
        }
    }
});


}

function generateChartThree(){
  var chart = c3.generate({
    bindto: '#lineChart',
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ForecastsDateWhole,
            democratesWhole,
            republicansWhole
        ],
        colors: {
            Clinton: '#2980b9',
            Trump: '#e74c3c'
        },
    },
     oninit: function () {
        this.main.append('rect')
            .style('fill', 'white')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.width)
            .attr('height', this.height)
          .transition().duration(1500)
            .attr('x', this.width)
            .attr('width', 0)
          .remove();
    },
    legend: {
        show: false
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%b-%d',
                count: 7
            },
            label: {
              text: 'Election Timeline',
              position: 'inner-right'
            }
        },
        y : {
            tick: {
                        values: ["46", "48", "50", "52", "54"],
                        format: function (d) { return parseInt(d)+ "%"; }
                    },
             label: {
                text: 'Two-party vote',
                position: 'inner-center'
            }
                }
    },
    grid: {
     y: {
        lines: [
                {value: 50},

            ]
     }
    },
    regions: [

        {axis: 'x', start: "2016-02-01", end: "2016-06-14", class: 'regionX', label: 'Primaries', horizotal: true},
        {axis: 'x', start: "2016-07-18", end: "2016-07-28", class: 'regionX', label: 'Conventions', horizotal: true},
        {axis: 'x', start: "2016-09-26", end: "2016-10-19", class: 'regionX', label: 'Debates', horizotal: true}

    ],
    point: {
      r: 1,
    focus: {
    expand: {
      enabled: true
    }
    }
       },
    tooltip: {
        format: {
          title: function (d) { var format=  d3.time.format("%B %d");
                                var date = format(d)
                                return date},
            value: function (value, color) {

                return value.toFixed(1) + '%'

            }
        }
    }
});

}
generateChartOne();






  $scope.wholeTimeline = true;

     $scope.changeAxis2 = function() {
            if($scope.wholeTimeline) {
                    $scope.thirtyDay = false;
                    generateChartOne();

                } else {
                  generateChartThree();

                }
    };



    $scope.changeAxis1 = function() {
        if ($scope.thirtyDay) {
                    $scope.wholeTimeline = false;
                    generateChartTwo();

                } else {
                  generateChartThree();
                }
    };




      })
      .error(function(data){
        console.log('Cant process data')
          })

  }
})();
