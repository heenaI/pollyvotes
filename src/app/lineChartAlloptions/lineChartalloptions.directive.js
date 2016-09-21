(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .directive('line', line);

  /** @ngInject */
  function line(lineChart, lineChartIndexModel, econometricModels, expert, citizen, prediction, pollagg) {
    return {
      restrict: 'E',
      templateUrl: "app/lineChartAlloptions/lineChart.html",
      link: link
    };

    function link($scope, element, $document) {

      function cleanNumber(number) {

      }



      function parseValues(data) {
        if (typeof(data) != 'number') {
          var cleanedNumber = data.replace(/[^0-9.]/g, "")
          var value = parseFloat(cleanedNumber)
          var float = value.toFixed(1)
          return parseFloat(float)
        } else {
          var float = data
          return parseFloat(data.toFixed(1))
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
                      pollagg.getData()
                        .success(function(pollaggData) {
                          console.log(pollaggData)
                          $scope.pollaggr = cleanupData(pollaggData)
                          $scope.pollaggrClintonForcast = $scope.pollaggr[0].clinton
                          $scope.pollaggrTrumpForcast = $scope.pollaggr[0].trump
                          $scope.pollsClintonValues = [];
                          $scope.pollsTrumpValues = [];
                          getNeededValues($scope.pollsClintonValues, $scope.pollsTrumpValues, $scope.pollaggr)

                          function addpollagg() {
                            $scope.index = $scope.chartConfig.series.length
                            $scope.chartConfig.series.push({
                                type: 'spline',
                                name: 'Clinton intention polls',
                                identifier: 'cc',
                                color: colors[2],
                                data: $scope.pollsClintonValues,
                                lineWidth: 2,
                                marker: {
                                  symbol: 'circle'
                                }
                              },

                              {
                                type: 'spline',
                                name: 'Trump Intention polls',
                                identifier: 'tt',
                                color: colors[1],
                                data: $scope.pollsTrumpValues,
                                lineWidth: 2,
                                marker: {
                                  symbol: 'circle'
                                }
                              })
                            $scope.chartConfig.options.tooltip.shared = true

                          }



                          $scope.intenpollsOnclick = function() {
                            if ($scope.aggregators) {
                              console.log('initiated')

                              addpollagg()
                              $scope.addOnlyClinton($scope.clintonValues)
                              $scope.addOnlyTrump($scope.trumpValues)

                              $scope.completeTimeLine()
                              $scope.lastThiry()

                            } else {
                              removeByAttr($scope.chartConfig.series, 'name', 'Clinton intention polls');
                              removeByAttr($scope.chartConfig.series, 'name', 'Trump Intention polls');
                            }


                          }

                        });

                      prediction.getData()
                        .success(function(predictionData) {
                          console.log(predictionData)
                          $scope.predictionMarketData = cleanupData(predictionData)
                          $scope.predictionMarketClintonForcast = $scope.predictionMarketData[0].clinton
                          $scope.predictionMarketTrumpForcast = $scope.predictionMarketData[0].trump
                          $scope.predictionClintonValues = [];
                          $scope.predictionTrumpValues = [];
                          getNeededValues($scope.predictionClintonValues, $scope.predictionTrumpValues, $scope.predictionMarketData)

                          function addprediction() {
                            $scope.index = $scope.chartConfig.series.length
                            $scope.chartConfig.series.push({
                                type: 'spline',
                                name: 'Clinton Prediction Markets',
                                identifier: 'cc',
                                color: colors[2],
                                data: $scope.predictionClintonValues,
                                lineWidth: 2,
                                marker: {
                                  symbol: 'circle'
                                }
                              },

                              {
                                type: 'spline',
                                name: 'Trump Prediction Markets',
                                identifier: 'tt',
                                color: colors[1],
                                data: $scope.predictionTrumpValues,
                                lineWidth: 2,
                                marker: {
                                  symbol: 'circle'
                                }
                              })
                            $scope.chartConfig.options.tooltip.shared = true

                          }



                          $scope.pmOnclick = function() {
                            if ($scope.markets) {
                              console.log('initiated')
                              addprediction()
                              $scope.addOnlyClinton($scope.clintonValues)
                              $scope.addOnlyTrump($scope.trumpValues)
                              $scope.completeTimeLine()
                              $scope.lastThiry()

                            } else {
                              removeByAttr($scope.chartConfig.series, 'name', 'Clinton Prediction Markets');
                              removeByAttr($scope.chartConfig.series, 'name', 'Trump Prediction Markets');
                            }


                          }

                        });

                      citizen.getData()
                        .success(function(citizenData) {
                          console.log(citizenData)
                          $scope.citizenData = cleanupData(citizenData)
                          $scope.citizenClintonForcast = $scope.citizenData[0].clinton
                          $scope.citizentrumpForcast = $scope.citizenData[0].trump
                          $scope.citizenClintonValues = [];
                          $scope.citizenTrumpValues = [];
                          getNeededValues($scope.citizenClintonValues, $scope.citizenTrumpValues, $scope.citizenData)

                          function addcitizen() {
                            $scope.index = $scope.chartConfig.series.length
                            $scope.chartConfig.series.push({
                                type: 'spline',
                                name: 'Citizen Forecast for Clinton',
                                identifier: 'cc',
                                color: colors[2],
                                data: $scope.citizenClintonValues,
                                lineWidth: 2,
                                marker: {
                                  symbol: 'circle'
                                }
                              },

                              {
                                type: 'spline',
                                name: 'Citizen Forecast for Trump',
                                identifier: 'tt',
                                color: colors[1],
                                data: $scope.citizenTrumpValues,
                                lineWidth: 2,
                                marker: {
                                  symbol: 'circle'
                                }
                              })
                            $scope.chartConfig.options.tooltip.shared = true

                          }



                          $scope.citizenOnclick = function() {
                            if ($scope.citizen) {
                              console.log('initiated')
                              addcitizen()
                              $scope.addOnlyTrump($scope.trumpValues)
                              $scope.addOnlyClinton($scope.clintonValues)
                              $scope.completeTimeLine()
                              $scope.lastThiry()
                            } else {
                              removeByAttr($scope.chartConfig.series, 'name', 'Citizen Forecast for Clinton');
                              removeByAttr($scope.chartConfig.series, 'name', 'Citizen Forecast for Trump');
                            }


                          }

                        });
                      // console.log(pollyvotedata)
                      // console.log(indexModelData)
                      // console.log(ModelsEconometricData)
                      // console.log(expertModelsData)
                      var colors = ["#e74c3c", "#f4a582", "#92c5de", "#2980b9"];


                      function cleanupData(data) {
                        $scope.convertedData = []
                        $scope.convertedData.length = 0;
                        for (var i = 0; i < data.data.length; i++) {
                          if (data.data[i].fcdemvs != 0 && data.data[i].fcrepvs != 0) {
                            var date = data.data[i]._lastupdate;
                            var datee = data.data[i].fcdate;

                            var dateSplit = datee.split('.')
                            var reserveDate = dateSplit.reverse();
                            var joinDate = reserveDate.join('/');
                            // console.log(joinDate)
                            var anotherDate = new Date(joinDate)
                              // console.log(anotherDate)
                              // var utcSeconds = date;
                              // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                              // var newDate = new Date(d.setUTCSeconds(utcSeconds));
                              // console.log(newDate)

                            var ClintonValues = parseValues(data.data[i].fcdemvs)
                            var TrumpValues = parseValues(data.data[i].fcrepvs)
                            $scope.convertedData.push({
                              "clinton": ClintonValues,
                              "trump": TrumpValues,
                              "date": anotherDate
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
                        // console.log($scope.pollyvoteData)
                      $scope.lastdate = moment(pollyvotedata.lastupdate_iso8601).format('MMM Do YYYY')
                      $scope.lastupDated = moment.utc(pollyvotedata.lastupdate_iso8601).fromNow()

                      // console.log($scope.lastdate)
                      $scope.pollyvoteClintonForcast = $scope.pollyvoteData[0].clinton
                      $scope.pollyvoteTrumpForcast = $scope.pollyvoteData[0].trump
                      $scope.indexModelData = cleanupData(indexModelData)
                      $scope.indexClintonForcast = $scope.indexModelData[0].clinton
                      $scope.indexTrumpForcast = $scope.indexModelData[0].trump
                      $scope.econometricData = cleanupData(ModelsEconometricData)
                      $scope.econometricClintonForcast = $scope.econometricData[0].clinton
                      $scope.econometricTrumpForcast = $scope.econometricData[0].trump
                      $scope.expertData = cleanupData(expertModelsData)
                      $scope.expertClintonForcast = $scope.expertData[0].clinton
                      $scope.expertTrumpForcast = $scope.expertData[0].trump

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
                            }
                          },
                          exporting: {
                            enabled: false

                          },
                          legend: {
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
                            enabled: true,
                            useHTML: true,
                            formatter: function() {
                              var method = ''

                              var s = '<h5><b>' + moment(this.x, 'x').format('MMM Do') + '</b><h5>' +

                                '<table>' +
                                '<tr>' +
                                '<th>' + 'Method' + '</th>' +
                                '<th>' + 'Clinton' + '</th>' +
                                '<th>' + 'Trump' + '</th>' +
                                '</tr>'

                              $.each(this.points, function() {
                                var id = this.series.options.identifier
                                var clinton = ''
                                var trump = ''
                                if (id == 'cc') {
                                  clinton = this.y.toFixed(1)

                                } else if (id == 'tt') {
                                  trump = this.y.toFixed(1)
                                }

                                s += '<tr>' +
                                  '<td>' + this.series.options.method + '</td>' +
                                  '<td>' + clinton + '</td>' +
                                  '<td>' + trump + '</td>' +
                                  '</tr>'


                              });

                              var footer = '<tbody>' + '</table>';



                              return s + footer;

                            }

                          }
                        },
                        xAxis: {
                          gridLineWidth: 0,
                          type: 'datetime',
                          tickInterval: 480 * 3600 * 1000,
                          min: new Date('2016/01/04').getTime(),
                          max: new Date('2016/11/08').getTime(),
                          title: {
                            text: 'Election Timeline',
                            align: 'high',
                            offset: 0,
                            rotation: 0,
                            y: -14

                          },
                          plotBands: [{
                            from: new Date('2016/02/01').getTime(),
                            to: new Date('2016/06/14').getTime(),
                            color: 'rgb(243, 243, 243)',
                            zindex: 0,
                            label: {
                              text: 'Primaries',
                              style: {
                                color: '#606060'
                              }
                            }
                          }, { // Light air

                            from: new Date('2016/07/18').getTime(),
                            to: new Date('2016/07/28').getTime(),
                            color: 'rgb(243, 243, 243)',
                            zindex: 0,
                            label: {
                              text: 'Conventions',
                              style: {
                                color: '#606060'
                              }
                            }
                          }, { // Light air

                            from: new Date('2016/09/26').getTime(),
                            to: new Date('2016/10/19').getTime(),
                            color: 'rgb(243, 243, 243)',
                            zindex: 0,
                            label: {
                              text: 'Debates',
                              style: {
                                color: '#606060'
                              }
                            }
                          }],

                        },
                        yAxis: {
                          gridLineWidth: 0,
                          allowDecimals: false,
                          //     tickColor: 'black',
                          // tickLength: 5,
                          // tickWidth: 1,
                          // tickPosition: 'outside',
                          labels: {
                            enabled: true,
                            formatter: function() {
                              return this.value + "%";
                            },
                            // align: 'right',
                            // x: -10,
                            // y: 5,

                          },
                          lineWidth: 1,
                          //  lineColor:'black'
                          title: {
                            text: 'Two-party vote',
                            align: 'middle'

                          },
                          plotLines: [{
                            color: 'silver',
                            width: 0.7,
                            value: 50,
                            zIndex: 4
                          }]

                        },


                        series: [],

                        title: {
                          text: ' '
                        },

                        loading: false,
                        credits: {
                          enabled: false
                        }
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



                      $scope.addOnlyTrump = function(key) {

                        if ($scope.trumpValues == true) {
                          $scope.chartConfig.yAxis.plotLines[0].zindex = 4
                          $scope.clintonValues = false
                          if ($scope.trumpValues == true && $scope.clintonValues == false) {
                            for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                              console.log($scope.chartConfig.series[i].identifier)

                              if ($scope.chartConfig.series[i].identifier == 'cc') {
                                $scope.chartConfig.series[i].visible = false

                              } else {
                                $scope.chartConfig.series[i].visible = true
                              }

                            }

                          } else if ($scope.trumpValues == true && $scope.clintonValues == true) {

                            for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                              $scope.chartConfig.series[i].visible = true
                            }

                          }

                        } else if ($scope.trumpValues == false && $scope.clintonValues == false) {
                          $scope.chartConfig.yAxis.plotLines[0].zindex = 4

                          for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                            $scope.chartConfig.series[i].visible = true
                          }

                        }



                      };


                      $scope.addOnlyClinton = function(key) {

                        if ($scope.clintonValues == true) {
                          $scope.trumpValues = false
                          $scope.chartConfig.yAxis.plotLines[0].zindex = 4
                          if ($scope.clintonValues == true && $scope.trumpValues == false) {
                            for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                              console.log($scope.chartConfig.series[i].identifier)

                              if ($scope.chartConfig.series[i].identifier == 'tt') {
                                $scope.chartConfig.series[i].visible = false

                              } else {
                                $scope.chartConfig.series[i].visible = true
                              }

                            }

                          } else if ($scope.trumpValues == true && $scope.clintonValues == true) {
                            $scope.chartConfig.yAxis.plotLines[0].zindex = 4

                            for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                              $scope.chartConfig.series[i].visible = true
                            }

                          }

                        } else if ($scope.trumpValues == false && $scope.clintonValues == false) {

                          for (var i = 0; i < $scope.chartConfig.series.length; i++) {
                            $scope.chartConfig.series[i].visible = true
                          }

                        }

                      };



                      $scope.completeTimeLine = function(key) {

                        if ($scope.timeline == true) {
                          $scope.thirtyDay = false
                          $scope.chartConfig.xAxis.min = new Date('2016/01/04').getTime()
                          $scope.chartConfig.xAxis.max = Date.parse($scope.pollyvoteData[0].date)
                         



                        } else if ($scope.timeline == false && $scope.thirtyDay == false) {
                          $scope.chartConfig.xAxis.max = new Date('2016/11/08').getTime()
                          $scope.chartConfig.xAxis.min = new Date('2016/01/04').getTime()
                        



                        }

                      }



                      $scope.lastThiry = function(key) {
                        if ($scope.thirtyDay == true) {
                          $scope.timeline = false
                          $scope.savedState = JSON.parse(JSON.stringify($scope.chartConfig));

                          $scope.chartConfig.xAxis.max = Date.parse($scope.pollyvoteData[0].date)
                          $scope.chartConfig.xAxis.min = Date.parse($scope.pollyvoteData[29].date)
                 


                        } else if ($scope.thirtyDay == false && $scope.timeline == false) {
                          $scope.chartConfig.xAxis.max = new Date('2016/11/08').getTime()
                          $scope.chartConfig.xAxis.min = new Date('2016/01/04').getTime()
                         

                        }



                      }



                      $scope.addpollyVote = function() {
                        $scope.chartConfig.series.push({
                            type: 'spline',
                            name: 'Clinton',
                            identifier: 'cc',
                            method: 'PollyVote',
                            color: colors[3],
                            data: $scope.clintonValues,
                            lineWidth: 3,
                            marker: {
                              symbol: 'circle'
                            }
                          },

                          {
                            type: 'spline',
                            name: 'Trump',
                            identifier: 'tt',
                            method: 'PollyVote',
                            color: colors[0],
                            data: $scope.trumpValues,
                            lineWidth: 3,
                            marker: {
                              symbol: 'circle'
                            }
                          })

                      };



                      $(document).ready(function() {
                        $scope.addpollyVote();
                      });



                      function addIndex() {

                        $scope.index = $scope.chartConfig.series.length
                        $scope.chartConfig.series.push({
                            type: 'spline',
                            name: 'Clinton Index Models',
                            identifier: 'cc',
                            color: colors[2],
                            data: $scope.indexClinton,
                            lineWidth: 2,
                            marker: {
                              symbol: 'circle'
                            }
                          },

                          {
                            type: 'spline',
                            name: 'Trump Index Models',
                            identifier: 'tt',
                            color: colors[1],
                            data: $scope.indexTrump,
                            lineWidth: 2,
                            marker: {
                              symbol: 'circle'
                            }
                          })
                        $scope.chartConfig.options.tooltip.shared = true



                      };



                      $scope.indexOnclick = function() {
                        if ($scope.indexModel) {
                          console.log('initiated')
                          addIndex()

                          $scope.addOnlyTrump($scope.trumpValues)
                          $scope.addOnlyClinton($scope.clintonValues)
                          $scope.completeTimeLine()
                          $scope.lastThiry()



                        } else {
                          removeByAttr($scope.chartConfig.series, 'name', 'Clinton Index Models');
                          removeByAttr($scope.chartConfig.series, 'name', 'Trump Index Models');
                        }


                      }


                      function addEcono() {
                        $scope.index = $scope.chartConfig.series.length
                        $scope.chartConfig.series.push({
                            type: 'spline',
                            name: 'Clinton Econometric Models',
                            identifier: 'cc',
                            color: colors[2],
                            data: $scope.econoClinton,
                            lineWidth: 2,
                            marker: {
                              symbol: 'circle'
                            }
                          },

                          {
                            type: 'spline',
                            name: 'Trump Econometric Models',
                            identifier: 'tt',
                            color: colors[1],
                            data: $scope.econoTrump,
                            lineWidth: 2,
                            marker: {
                              symbol: 'circle'
                            }
                          })
                        $scope.chartConfig.options.tooltip.shared = true

                      }



                      $scope.econoOnclick = function() {
                        if ($scope.models) {
                          console.log('initiated')
                          addEcono()
                          $scope.addOnlyClinton($scope.clintonValues)
                          $scope.addOnlyTrump($scope.trumpValues)
                          $scope.completeTimeLine()
                          $scope.lastThiry()

                        } else {
                          removeByAttr($scope.chartConfig.series, 'name', 'Clinton Econometric Models');
                          removeByAttr($scope.chartConfig.series, 'name', 'Trump Econometric Models');
                        }


                      }


                      function addExpert() {
                        $scope.index = $scope.chartConfig.series.length
                        $scope.chartConfig.series.push({
                            type: 'spline',
                            name: 'Clinton Expert judgment',
                            identifier: 'cc',
                            color: colors[2],
                            data: $scope.ModelsExpertClinton,
                            lineWidth: 2,
                            marker: {
                              symbol: 'circle'
                            }
                          },

                          {
                            type: 'spline',
                            name: 'Trump Expert Judgment',
                            identifier: 'tt',
                            color: colors[1],
                            data: $scope.ModelsExpertTrump,
                            lineWidth: 2,
                            marker: {
                              symbol: 'circle'
                            }
                          })
                        $scope.chartConfig.options.tooltip.shared = true

                      }



                      $scope.expertOnclick = function() {
                        if ($scope.expert) {
                          console.log('initiated')
                          addExpert()
                          $scope.addOnlyClinton($scope.clintonValues)
                          $scope.addOnlyTrump($scope.trumpValues)
                          $scope.completeTimeLine()
                          $scope.lastThiry()

                        } else {
                          removeByAttr($scope.chartConfig.series, 'name', 'Clinton Expert judgment');
                          removeByAttr($scope.chartConfig.series, 'name', 'Trump Expert Judgment');
                        }


                      }



                    });
                });
            });
        });



    }
  }
})();