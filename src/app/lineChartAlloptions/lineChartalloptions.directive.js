(function() {
    'use strict';

    angular
      .module('pollyvotes')
      .directive('line', line);

    /** @ngInject */
    function line(lineChart, lineChartIndexModel, econometricModels, expert) {
      return {
        restrict: 'E',
        templateUrl: "app/lineChartAlloptions/lineChart.html",
        link: link
      };

      function link($scope, element) {



        function parseValues(data) {
          if (typeof(data) == 'string') {
            var value = parseFloat(data)
            return value.toFixed(1)
          } else {
            return data.toFixed(1)
          }
        }


        lineChart.getData()
          .success(function(pollyvotedata) {
              lineChartIndexModel.getData()
                .success(function(indexModelData) {
                  econometricModels.getData()
                    .success(function(ModelsEconometricData) {
                      expert.getData()
                    .success(function(expertModelsData) {
                      console.log(pollyvotedata)
                      console.log(indexModelData)
                      console.log(ModelsEconometricData)
                      console.log(expertModelsData)
                      var colors = ["#e74c3c", "#f4a582", "#92c5de", "#2980b9"];


                      function cleanupData(data) {
                        $scope.convertedData = []
                        $scope.convertedData.length = 0;
                        for (var i = 0; i < data.data.length; i++) {
                          if (data.data[i].fcdemvs != 0 && data.data[i].fcrepvs != 0) {
                            var date = data.data[i]._lastupdate;
                            var utcSeconds = date;
                            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                            var newDate = new Date(d.setUTCSeconds(utcSeconds));

                            var ClintonValues = parseValues(data.data[i].fcdemvs)
                            var TrumpValues = parseValues(data.data[i].fcrepvs)
                            $scope.convertedData.push({
                              "clinton": ClintonValues,
                              "trump": TrumpValues,
                              "date": newDate
                            })


                          }
                        }

                        //rearrange if dates are mixed up 

                        var rearrangedData = $scope.convertedData.sort(function(a, b) {
                          a = new Date(a.date);
                          b = new Date(b.date);
                          return a > b ? -1 : a < b ? 1 : 0;
                        });

                        return rearrangedData
                      };

                      function getNeededValues(EmptyArrayofDataClinton, EmptyArrayofDataTrump, cleanedupData) {
                        EmptyArrayofDataClinton.length = 0;
                        EmptyArrayofDataTrump.length = 0;
                        for (var i = 0; i < cleanedupData.length; i++) {
                          EmptyArrayofDataClinton.push([Date.parse(cleanedupData[i].date), parseFloat(cleanedupData[i].clinton)])
                          EmptyArrayofDataTrump.push([Date.parse(cleanedupData[i].date), parseFloat(cleanedupData[i].trump)])
                        }

                      };



                      $scope.pollyvoteData = cleanupData(pollyvotedata)
                      $scope.indexModelData = cleanupData(indexModelData)
                      $scope.econometricData = cleanupData(ModelsEconometricData)
                      $scope.expertData = cleanupData(expertModelsData)
                      $scope.clintonValues = [];
                      $scope.trumpValues = [];
                      $scope.indexClinton = [];
                      $scope.indexTrump = [];
                      $scope.econoClinton = [];
                      $scope.econoTrump = [];
                      $scope.ModelsExpertClinton = [];
                      $scope.ModelsExpertTrump = [];
                      getNeededValues($scope.clintonValues, $scope.trumpValues, $scope.pollyvoteData)
                      getNeededValues($scope.indexClinton, $scope.indexTrump, $scope.indexModelData)
                      getNeededValues($scope.econoClinton, $scope.econoTrump, $scope.econometricData)
                      getNeededValues($scope.ModelsExpertClinton, $scope.ModelsExpertTrump, $scope.expertData)



                      //highcharts charts

                      $scope.chartConfig = {
                        options: {
                          chart: {
                            type: 'spline'

                          },
                          plotOptions: {
                            spline: {
                              lineWidth: 3
                            },
                            series: {
                              marker: {
                                enabled: false
                              }
                            },
                            tooltip: {
                              crosshairs: true
                            }
                          },
                          exporting: {
                            enabled: false

                          },
                          tooltip: {
                            animation: true,
                            crosshairs: {
                              width: 2,
                              color: 'gray',
                              dashStyle: 'shortdot'
                            },
                            shared: true,
                            enabled: true
                          }
                        },
                        xAxis: {

                          gridLineWidth: 0,
                          type: 'datetime',
                          max: Date.UTC(2016, 10, 8),
                          title: {
                            text: 'Election Timeline',
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            y: -14

                          },
                          plotBands: [{ // Light air
                            from: Date.UTC(2016, 2, 1),
                            to: Date.UTC(2016, 6, 14),
                            color: 'rgb(243, 243, 243)',
                            label: {
                              text: 'Primaries',
                              style: {
                                color: '#606060'
                              }
                            }
                          }, { // Light air
                            from: Date.UTC(2016, 7, 18),
                            to: Date.UTC(2016, 7, 28),
                            color: 'rgb(243, 243, 243)',
                            label: {
                              text: 'Conventions',
                              style: {
                                color: '#606060'
                              }
                            }
                          }, { // Light air
                            from: Date.UTC(2016, 9, 26),
                            to: Date.UTC(2016, 10, 19),
                            color: 'rgb(243, 243, 243)',
                            label: {
                              text: 'Debates',
                              style: {
                                color: '#606060'
                              }
                            }
                          }],
                          plotLines: [{
                            color: 'grey',
                            width: 5,
                            value: Date.UTC(2016, 10, 8)
                          }]
                        },
                        yAxis: {
                          gridLineWidth: 0,
                          //     tickColor: 'black',
                          // tickLength: 5,
                          // tickWidth: 1,
                          // tickPosition: 'outside',
                          labels: {
                            enabled: true,
                            formatter: function() {
                                return this.value + "%";
                              }
                              // align: 'right',
                              // x: -10,
                              // y: 5,

                          },
                          lineWidth: 1,
                          //  lineColor:'black'
                          title: {
                            text: 'Two-party vote',
                            align: 'middle'

                          }
                        },

                        legend: {
                          enabled: false,
                        },
                        series: [{
                          name: 'Clinton',
                          identifier: 'cc',
                          color: colors[3],
                          data: $scope.clintonValues,
                          marker: {
                            symbol: 'circle'
                          }
                        }, {
                          name: 'Trump',
                          identifier: 'tt',
                          color: colors[0],
                          data: $scope.trumpValues,
                          marker: {
                            symbol: 'circle'
                          }
                        }],

                        title: {
                          text: ' '
                        },

                        loading: false
                      };

                      var removeByAttr = function(arr, attr, value) {
                        var i = arr.length;
                        while (i--) {
                          if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {

                            arr.splice(i, 1);

                          }
                        }
                        return arr;
                      }


                      console.log($scope.chartConfig.options.chart.type)
                      console.log($scope.chartConfig.series[0])
                      console.log($scope.indexClinton.length)
                      console.log(indexModelData.data.length)
                      console.log(pollyvotedata.data.length)

                      console.log($scope.chartConfig.series.length)

                      function addIndex() {

                        $scope.index = $scope.chartConfig.series.length
                        $scope.chartConfig.series[$scope.index + 0] = {
                          type: 'spline',
                          name: 'ClintonIndex',
                          identifier: 'cc',
                          color: colors[2],
                          data: $scope.indexClinton,
                          lineWidth: 2,
                          marker: {
                            symbol: 'circle'
                          }
                        }

                        $scope.chartConfig.series[$scope.index + 1] = {
                          type: 'spline',
                          name: 'TrumpIndex',
                          identifier: 'tt',
                          color: colors[1],
                          data: $scope.indexTrump,
                          lineWidth: 2,
                          marker: {
                            symbol: 'circle'
                          }
                        }
                        $scope.chartConfig.options.tooltip.shared = true

                      };

                      


                      $scope.indexOnclick = function() {
                        if ($scope.indexModel) {
                          console.log('initiated')
                          addIndex();
                        } else {
                          removeByAttr($scope.chartConfig.series, 'name', 'ClintonIndex');
                          removeByAttr($scope.chartConfig.series, 'name', 'TrumpIndex');
                        }


                      }


                      function addEcono(){
                        $scope.index = $scope.chartConfig.series.length
                        $scope.chartConfig.series[$scope.index + 0] = {
                          type: 'spline',
                          name: 'ClintonEconometric',
                          identifier: 'cc',
                          color: colors[2],
                          data: $scope.econoClinton,
                          lineWidth: 2,
                          marker: {
                            symbol: 'circle'
                          }
                        }

                        $scope.chartConfig.series[$scope.index + 1] = {
                          type: 'spline',
                          name: 'TrumpEconometric',
                          identifier: 'tt',
                          color: colors[1],
                          data: $scope.econoTrump,
                          lineWidth: 2,
                          marker: {
                            symbol: 'circle'
                          }
                        }
                        $scope.chartConfig.options.tooltip.shared = true

                      }



                      $scope.econoOnclick = function() {
                        if ($scope.models) {
                          console.log('initiated')
                          addEcono();
                        } else {
                          removeByAttr($scope.chartConfig.series, 'name', 'ClintonEconometric');
                          removeByAttr($scope.chartConfig.series, 'name', 'TrumpEconometric');
                        }


                      }


                        function addExpert(){
                        $scope.index = $scope.chartConfig.series.length
                        $scope.chartConfig.series[$scope.index + 0] = {
                          type: 'spline',
                          name: 'ClintonExpert',
                          identifier: 'cc',
                          color: colors[2],
                          data: $scope.ModelsExpertClinton,
                          lineWidth: 2,
                          marker: {
                            symbol: 'circle'
                          }
                        }

                        $scope.chartConfig.series[$scope.index + 1] = {
                          type: 'spline',
                          name: 'TrumpExpert',
                          identifier: 'tt',
                          color: colors[1],
                          data: $scope.ModelsExpertTrump,
                          lineWidth: 2,
                          marker: {
                            symbol: 'circle'
                          }
                        }
                        $scope.chartConfig.options.tooltip.shared = true

                      }



                      $scope.expertOnclick = function() {
                        if ($scope.expert) {
                          console.log('initiated')
                          addExpert();
                        } else {
                          removeByAttr($scope.chartConfig.series, 'name', 'ClintonExpert');
                          removeByAttr($scope.chartConfig.series, 'name', 'TrumpExpert');
                        }


                      }



});
});
});
});



            }
          }
      })();