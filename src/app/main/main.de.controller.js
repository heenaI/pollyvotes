(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .controller('MainDeController', MainDeController);

  /** @ngInject */
  function MainDeController($scope, $timeout, lineChart, $translate, tmhDynamicLocale, $filter) {
    $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
  tmhDynamicLocale.set('de');
  moment.locale('de');


    $scope.photos = [   {id: 'chart-1',
                         name: "Welche Partei wird gewinnen?",
                         src: "assets/images/Image_Mirrored_Graph_3.png",
                         href: "https://www.google.de/?gws_rd=ssl",
                         discription: " "},
                        {id: 'chart-3',
                        name: 'Prognose des Wahlsiegers je Staat',
                        src: "assets/images/Image_Map_new size.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "},
                        {id: 'chart-2',
                        name: 'Frühere Prognosen: 2004, 2008 & 2012',
                        src: "assets/images/Image_PollyVoteinAction_new size.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "},
                         {id: 'chart-4',
                        name: 'Wahlanalysen als Newsletter',
                        src: "assets/images/Image_RobotText.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "},
                        {id: 'chart-5',
                        name: 'Was ist PollyVote? Wer steckt dahinter?',
                        src: "assets/images/Image_About us.png",
                        href: "https://www.google.de/?gws_rd=ssl",
                        discription: " "}
                    ];


   lineChart.getData()
         .success(function(data){
          var Demokraten_unordered = [];
          var Republikaner_unordered  = [];
          var ForecastsDateWhole_unordered  = [];
          for (var i = 0; i<data.data.length; i++){
          Demokraten_unordered.push(data.data[i].fcdemvs);
          Republikaner_unordered.push(data.data[i].fcrepvs);
          var date = data.data[i].fcdate;
          var dateSplit = date.split('.')
          var reserveDate = dateSplit.reverse();
          var joinDate = reserveDate.join('-');
          ForecastsDateWhole_unordered.push(joinDate);
        }
        moment.locale('de');
        var deLocale = d3.locale({
          decimal: ",",
          thousands: ".",
          grouping: [3],
          currency: ["", " €"],
          dateTime: "%A, der %e. %B %Y, %X",
          date: "%d.%m.%Y",
          time: "%H:%M:%S",
          periods: ["AM", "PM"], // unused
          days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
          shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
          shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
        });

          function computeLastThirtyItems(items){
          var lastThirtyItems = items.slice(Math.max(items.length - 30, 0))
          return lastThirtyItems

        }

        var Demokraten_ordered = Demokraten_unordered.reverse();
        var demoChart = ['Demokraten', ]
        var DemokratenWhole = demoChart.concat(Demokraten_ordered);
        var DemokratenLastThirtyData = computeLastThirtyItems(Demokraten_ordered);
        var DemokratenLastThirty = demoChart.concat(DemokratenLastThirtyData);

        var Republikaner_ordered = Republikaner_unordered.reverse();
        var repChart = ['Republikaner', ]
        var RepublikanerWhole = repChart.concat(Republikaner_ordered);
        var RepublikanerLastThirtyData = computeLastThirtyItems(Republikaner_ordered);
        var RepublikanerLastThirty = repChart.concat(RepublikanerLastThirtyData);


        var ForecastsDateWhole_ordered = ForecastsDateWhole_unordered.reverse();
        var dateChart = ['x', ]
        var ForecastsDateWhole = dateChart.concat(ForecastsDateWhole_ordered);
        var ForecastsDateLastThirtyData = computeLastThirtyItems(ForecastsDateWhole_ordered);
        var ForecastsDateLastThirty = dateChart.concat(ForecastsDateLastThirtyData);
        $scope.lastitemDate = _.last(ForecastsDateWhole);

        $scope.latestDate = moment($scope.lastitemDate).format('Do MMMM YYYY')

        var dateLast = $scope.lastitemDate;
         var date = Date.parse(dateLast.replace(/-/g,"/"))
         var format = deLocale.timeFormat("%B %d");
         $scope.dateConvert = format(new Date(date));

        var democreatesLast = _.last(DemokratenWhole);
        var RepublikanerLast = _.last(RepublikanerWhole);
        var DemokratenSecondlast = DemokratenWhole[DemokratenWhole.length - 2]
        var RepublikanerSecondlast = RepublikanerWhole[RepublikanerWhole.length - 2]



        function oneDeci(variable){
          var number = parseFloat(variable)
          var returnOneDeci = number.toFixed(1)
          return returnOneDeci

        }

        $scope.inidemocrates = oneDeci(democreatesLast)

        $scope.democrats = deLocale.numberFormat(",.")($scope.inidemocrates)

        $scope.republicans = deLocale.numberFormat(",.")(oneDeci(RepublikanerLast))


        function createConcatLastThirty(concatData, concatVari){
        var last = computeLastThirtyItems(concatData)
        var concatVar = [concatVari, ]
        var concatArray = concatVar.concat(last);
        return concatArray

        }

        function computepercentageChange(democreatesLast, DemokratenSecondlast){
          var x = democreatesLast-DemokratenSecondlast;
          return x.toFixed(2)

        }

        function computeDiffrence(democreatesLast, RepublikanerLast){
          var x = Math.abs(democreatesLast - RepublikanerLast);
          return x.toFixed(1)

        }

        $scope.DemokratenDiffrence = computepercentageChange(democreatesLast, DemokratenSecondlast);
        $scope.RepublikanerDiffrence = computepercentageChange(RepublikanerLast, RepublikanerSecondlast);
        $scope.diffrenceParties = computeDiffrence(democreatesLast, RepublikanerLast);


        function computeCandidates(){
           if(democreatesLast>RepublikanerLast){
           return 'Stand heute, den'+ ' ' +  $scope.dateConvert + ',' + ' '+ 'werden die Demokraten als Wahlsieger prognostiziert. Aktuell liegen sie mit einem Stimmenanteil von'+ ' '  + $scope.democrats   +  ' ' + 'Prozent oben auf, während die Republikaner auf' + ' ' + $scope.republicans +  ' ' + 'Prozent kommen.'
           } else {
           return 'Seit dem'+ ' ' +  $scope.dateConvert + ' '+ 'werden die Demokraten als Wahlsieger prognostiziert. Aktuell liegen sie mit einem Stimmenanteil von'+ ' '  + $scope.Republikaner +  ' ' + 'Prozent oben auf, während die Republikaner auf' + ' ' + $scope.Demokraten +  ' ' + 'Prozent kommen.'

           }

        }

        function computeHeading(){
           if(democreatesLast>RepublikanerLast){
            return 'Prognose: Demokraten werden gewinnen'
           } else {
             return 'Prognose: Republikaner werden gewinnen'

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
            DemokratenWhole,
            RepublikanerWhole
        ],
         colors: {
            Demokraten: '#2980b9',
            Republikaner: '#e74c3c'
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
                format: deLocale.timeFormat("%b-%d")
                },
            label: {
              text: 'Wahlchronik',
              position: 'inner-right'
            }
        },
         y : {
            tick: {
                        values: ["46", "48", "50", "52", "54"],
                        format: function (d) { return parseInt(d)+ "%"; }
                    },
             label: {
                text: 'Stimmenanteil',
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
                           var format=  deLocale.timeFormat("%B %d");
                                var date = moment(d).format('Do MMMM')
                                return date},
            value: function (value, color) {

                var number = value.toFixed(1)

                return deLocale.numberFormat(",.")(number) + '%'

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
            DemokratenLastThirty,
            RepublikanerLastThirty
        ],
         colors: {
            Demokraten: '#2980b9',
            Republikaner: '#e74c3c'
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
                format: deLocale.timeFormat("%b-%d"),
                 count: 7
            },
            label: {
              text: 'Wahlchronik',
              position: 'inner-right'
            }
        },
        y : {
            tick: {
                        values: ["46", "48", "50", "52", "54"],
                        format: function (d) { return parseInt(d)+ "%"; }
                    },
             label: {
                text: 'Stimmenanteil',
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
          title: function (d) {  var format=  deLocale.timeFormat("%B %d");
                                var date = format(d)
                                return date},
            value: function (value, color) {

               var number = value.toFixed(1)

                return deLocale.numberFormat(",.")(number) + '%'

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
            DemokratenWhole,
            RepublikanerWhole
        ],
        colors: {
            Demokraten: '#2980b9',
            Republikaner: '#e74c3c'
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
                format: deLocale.timeFormat("%b %d"),
                count: 7
            },
            label: {
              text: 'Wahlchronik',
              position: 'inner-right'
            }
        },
        y : {
            tick: {
                        values: ["46", "48", "50", "52", "54"],
                        format: function (d) { return parseInt(d)+ "%"; }
                    },
             label: {
                text: 'Stimmenanteil',
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
          title: function (d) {  var format=  deLocale.timeFormat("%B %d");
                                var date = format(d)
                                return date},
            value: function (value, color) {

                 var number = value.toFixed(1)

                return deLocale.numberFormat(",.")(number) + '%'

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
