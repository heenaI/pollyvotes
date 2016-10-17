(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .directive('line', line);

  /** @ngInject */
  function line(lineChart, lineChartIndexModel, econometricModels, expert, citizen, prediction, pollagg, indexModelsubcategory, pollssubcomponent, expertsubcategory, subcomponentCitizen, pmsubcomponent, ecosubcomponent) {
    return {
      restrict: 'E',
      templateUrl: function(tElement, tAttrs) {
        if (tAttrs) {
          if (tAttrs.type === 'mainchart') {
            return 'app/lineChartAlloptions/lineChart.html';
          }
          if (tAttrs.type === 'testingChart') {
            return 'app/lineChartAlloptions/testing.html';
          }
        }
      },
      link: link
    };

    function link($scope, element, $document) {
      var colors = ["#e74c3c", "#f4a582", "#92c5de", "#2980b9"];

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



      function cleanupData(data) {
        $scope.convertedData = []
        $scope.convertedData.length = 0;
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].fcdemvs != 0 && data.data[i].fcrepvs != 0) {
            var date = data.data[i]._lastupdate;
            var datee = data.data[i].fcdate;
            var unixDate = moment.unix(date)._d
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
            var update = data.data[i].fcupdate
            $scope.convertedData.push({
              "clinton": ClintonValues.toFixed(1),
              "trump": TrumpValues.toFixed(1),
              "date": Date.parse(anotherDate),
              'lastUpdate': Date.parse(unixDate),
              "update": update
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


      var separteData = function(data, datavar, collector) {
        collector.date = data.lastupdate_iso8601
        collector.data = []
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].forecast == datavar) {
            collector.data.push(data.data[i])
          }
        }
      };
      var splitUpdate = function(data, collector) {
        collector.length = 0;
        collector.date = data.date
        collector.data = []
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].fcupdate === 1) {
            collector.data.push(data.data[i])
          }
        }
      };


      function getNeededValues(EmptyArrayofDataClinton, EmptyArrayofDataTrump, cleanedupData) {
        EmptyArrayofDataClinton.length = 0;
        EmptyArrayofDataTrump.length = 0;
        for (var i = 0; i < cleanedupData.length; i++) {
          EmptyArrayofDataClinton.push([cleanedupData[i].date, parseFloat(cleanedupData[i].clinton)])
          EmptyArrayofDataTrump.push([cleanedupData[i].date, parseFloat(cleanedupData[i].trump)])
        }
        EmptyArrayofDataClinton.sort()
        EmptyArrayofDataTrump.sort()

      };

      




      var subcomponentDataClean = function(rawData, subcomponent, holder) {
        var createJson = {};
        separteData(rawData, subcomponent, createJson)
        var cleanData = cleanupData(createJson)
        return cleanData
      };

      var getClintonForcast = function(cleanedData) {
        return cleanedData[0].clinton
      };

      var getTrumpForcast = function(cleanedData) {
        return cleanedData[0].trump
      };

      


      function showOnlyClintonValues() {
        var chart = $('#container').highcharts()
        for (var i = 0; i < chart.series.length; i++) {
          if (chart.series[i].options.identifier == 'tt' && chart.series[i].visible == true) {
            chart.series[i].hide()

          }

        }


      };

      function showOnlyTrumpValues() {
        var chart = $('#container').highcharts()

        for (var i = 0; i < chart.series.length; i++) {

          if (chart.series[i].options.identifier == 'cc' && chart.series[i].visible == true) {
            chart.series[i].hide()
          }

        }


      };



      $scope.addOnlyTrump = function(key) {
        var chart = $('#container').highcharts()


        if ($scope.trumpValues == true) {
          $scope.clintonValues = false
          $scope.allOnclickFunctions()
          showOnlyTrumpValues();
        } else {
          $scope.allOnclickFunctions();

        };
      }



      $scope.addOnlyClinton = function(key) {
        var chart = $('#container').highcharts()
        if ($scope.clintonValues == true) {
          $scope.trumpValues = false
          $scope.allOnclickFunctions()
          showOnlyClintonValues()

        } else {
          $scope.allOnclickFunctions()


        }



      };

      function clintionTrumpValue() {
        if ($scope.trumpValues == true) {
          showOnlyTrumpValues()

        } else if ($scope.clintonValues == true) {
          showOnlyClintonValues();

        }
      }


      function pushSeries(name, markerEnbled, datavar, identifier) {
        var chart = $('#container').highcharts()

        if (markerEnbled == true && identifier == 'cc') {
          chart.addSeries({
            type: 'spline',
            lineWidth: 0,
            name: name,
            identifier: identifier,
            color: colors[2],
            data: datavar,
            visible: false,
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4

            }

          })

        } else if (markerEnbled == false && identifier == 'cc') {
          chart.addSeries({
            type: 'spline',
            name: name,
            identifier: identifier,
            color: colors[2],
            data: datavar,
            visible: false,
            marker: {
              enabled: false
            }
          })
        } else if (markerEnbled == true && identifier == 'tt') {
          chart.addSeries({
            type: 'spline',
            lineWidth: 0,
            name: name,
            identifier: identifier,
            color: colors[1],
            data: datavar,
            visible: false,
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4

            }

          })

        } else if (markerEnbled == false && identifier == 'tt') {
          chart.addSeries({
            type: 'spline',
            name: name,
            identifier: identifier,
            color: colors[1],
            data: datavar,
            visible: false,
            marker: {
              enabled: false
            }
          })

        }

      };

      $scope.pollyVote = true;

      lineChart.getData()
        .success(function(pollyvotedata) {

          $scope.pollyvoteData = cleanupData(pollyvotedata)
            // console.log($scope.pollyvoteData)
          $scope.lastdate = moment(pollyvotedata.lastupdate_iso8601).format('MMM Do YYYY')
          $scope.lastupDated = moment.utc(pollyvotedata.lastupdate_iso8601).fromNow()

          // console.log($scope.lastdate)
          $scope.pollyvoteClintonForcast = $scope.pollyvoteData[0].clinton
          $scope.pollyvoteTrumpForcast = $scope.pollyvoteData[0].trump
          $scope.clintonValues = [];
          $scope.trumpValues = [];
          getNeededValues($scope.clintonValues, $scope.trumpValues, $scope.pollyvoteData)

          $(function() {
            $('#container').highcharts({

              legend: {
                enabled: false
              },
              tooltip: {

                crosshairs: {
                  width: 2,
                  color: 'gray',
                  dashStyle: 'shortdot'
                },
                formatter: function() {
                  var s = '<b>' + moment(this.x).format('MMM Do') + '</b>';


                  function createColor(series) {
                    if (series.options.identifier == 'cc') {
                      return '#2980b9'
                    } else if (series.options.identifier == 'tt') {
                      return '#e74c3c'
                    }

                  }

                  $.each(this.points, function() {

                    s += '<br/>' +
                      '<tr><td class = "tooltipvalue" style="color: ' + createColor(this.series) + '">' +
                      this.series.name + ': ' +

                      this.y.toFixed(1) +
                      '</td></tr>';
                  });

                  return s;
                },
                shared: true


              },
              xAxis: {
                gridLineWidth: 0,
                type: 'datetime',

                tickPositions: [1454329239000, 1465906839000, 1468844439000, 1469708439000, 1474892439000, 1476879639000, 1478607639000],
                labels: {
                  style: {

                    fontSize: '0.75em'
                  },
                  formatter: function() {
                    return Highcharts.dateFormat('%b %e', this.value);
                  }
                },
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
                labels: {
                  enabled: true,
                  formatter: function() {
                    return this.value + "%";
                  },
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


              series: [{
                  type: 'spline',
                  name: 'PollyVote Combined forecasts Clinton',
                  identifier: 'cc',
                  method: 'PollyVote Combined forecasts',
                  color: colors[3],
                  data: $scope.clintonValues,
                  lineWidth: 3,
                  marker: {
                    enabled: false
                  }
                },

                {
                  type: 'spline',
                  name: 'PollyVote Combined forecasts Trump',
                  identifier: 'tt',
                  method: 'PollyVote Combined forecasts',
                  color: colors[0],
                  data: $scope.trumpValues,
                  lineWidth: 3,
                  marker: {
                    enabled: false
                  }
                }
              ],

              title: {
                text: ' '
              },

              loading: true,
              credits: {
                enabled: false
              }

            });
          });
          var chart = $('#container').highcharts()

          $scope.addpollyVote = function() {
            if ($scope.pollyVote == false) {
              chart.series[0].hide()
              chart.series[1].hide()
            } else if ($scope.pollyVote == true) {
              chart.series[0].show()
              chart.series[1].show()
            }

          }



          lineChartIndexModel.getData()
            .success(function(indexModelData) {

              $scope.indexModelData = cleanupData(indexModelData)
              $scope.indexClintonForcast = $scope.indexModelData[0].clinton
              $scope.indexTrumpForcast = $scope.indexModelData[0].trump
              $scope.indexClinton = [];
              $scope.indexTrump = [];
              getNeededValues($scope.indexClinton, $scope.indexTrump, $scope.indexModelData)
              pushSeries('Index Models Clinton', false, $scope.indexClinton, 'cc')
              pushSeries('Index Models Trump', false, $scope.indexTrump, 'tt')
              $scope.indexOnclick = function() {
                if ($scope.indexModel == true) {
                  console.log('initiated')

                  chart.series[2].show()
                  chart.series[3].show()
                  clintionTrumpValue()


                } else {
                  chart.series[2].hide()
                  chart.series[3].hide()
                }


              }


              econometricModels.getData()
                .success(function(ModelsEconometricData) {

                  $scope.econometricData = cleanupData(ModelsEconometricData)
                  $scope.econometricClintonForcast = $scope.econometricData[0].clinton
                  $scope.econometricTrumpForcast = $scope.econometricData[0].trump

                  $scope.econoClinton = [];
                  $scope.econoTrump = [];
                  getNeededValues($scope.econoClinton, $scope.econoTrump, $scope.econometricData)
                  pushSeries('Econometric Models Clinton', false, $scope.econoClinton, 'cc')
                  pushSeries('Econometric Models Trump', false, $scope.econoTrump, 'tt')
                  $scope.econoOnclick = function() {
                    if ($scope.models == true) {
                      console.log('initiated')
                      chart.series[4].show()
                      chart.series[5].show()
                      clintionTrumpValue()


                    } else {
                      chart.series[4].hide()
                      chart.series[5].hide()
                    }


                  }


                  expert.getData()
                    .success(function(expertModelsData) {
                      $scope.expertData = cleanupData(expertModelsData)
                      $scope.expertClintonForcast = $scope.expertData[0].clinton
                      $scope.expertTrumpForcast = $scope.expertData[0].trump
                      $scope.ModelsExpertClinton = [];
                      $scope.ModelsExpertTrump = [];
                      getNeededValues($scope.ModelsExpertClinton, $scope.ModelsExpertTrump, $scope.expertData)
                      pushSeries('Expert Judgment Clinton', false, $scope.ModelsExpertClinton, 'cc')
                      pushSeries('Expert Judgment Trump', false, $scope.ModelsExpertTrump, 'tt')

                      $scope.expertOnclick = function() {
                        if ($scope.expert == true) {
                          console.log('initiated')
                          chart.series[6].show()
                          chart.series[7].show()
                          clintionTrumpValue()



                        } else {
                          chart.series[6].hide()
                          chart.series[7].hide()
                        }


                      }

                      pollagg.getData()
                        .success(function(pollaggData) {
                          $scope.pollaggr = cleanupData(pollaggData)
                          $scope.pollaggrClintonForcast = $scope.pollaggr[0].clinton
                          $scope.pollaggrTrumpForcast = $scope.pollaggr[0].trump
                          $scope.pollsClintonValues = [];
                          $scope.pollsTrumpValues = [];
                          getNeededValues($scope.pollsClintonValues, $scope.pollsTrumpValues, $scope.pollaggr)
                          pushSeries('Poll aggregators Clinton', false, $scope.pollsClintonValues, 'cc')
                          pushSeries('Poll aggregators Trump', false, $scope.pollsTrumpValues, 'tt')
                          $scope.intenpollsOnclick = function() {
                            if ($scope.aggregators == true) {
                              console.log('initiated')
                              chart.series[8].show()
                              chart.series[9].show()
                              clintionTrumpValue()


                            } else {
                              chart.series[8].hide()
                              chart.series[9].hide()

                            }


                          }



                          prediction.getData()
                            .success(function(predictionData) {
                              $scope.predictionMarketData = cleanupData(predictionData)
                              $scope.predictionMarketClintonForcast = $scope.predictionMarketData[0].clinton
                              $scope.predictionMarketTrumpForcast = $scope.predictionMarketData[0].trump
                              $scope.predictionClintonValues = [];
                              $scope.predictionTrumpValues = [];
                              getNeededValues($scope.predictionClintonValues, $scope.predictionTrumpValues, $scope.predictionMarketData)
                              pushSeries('Prediction markets Clinton', false, $scope.predictionClintonValues, 'cc')
                              pushSeries('Prediction markets Trump', false, $scope.predictionTrumpValues, 'tt')
                              $scope.pmOnclick = function() {
                                if ($scope.markets == true) {
                                  console.log('initiated')
                                  chart.series[10].show()
                                  chart.series[11].show()
                                  clintionTrumpValue()


                                } else {
                                  chart.series[10].hide()
                                  chart.series[11].hide()

                                }


                              }



                              citizen.getData()
                                .success(function(citizenData) {
                                  $scope.citizenData = cleanupData(citizenData)
                                  $scope.citizenClintonForcast = $scope.citizenData[0].clinton
                                  $scope.citizentrumpForcast = $scope.citizenData[0].trump
                                  $scope.citizenClintonValues = [];
                                  $scope.citizenTrumpValues = [];
                                  getNeededValues($scope.citizenClintonValues, $scope.citizenTrumpValues, $scope.citizenData)
                                  pushSeries('Citizen Forecasts Clinton', false, $scope.citizenClintonValues, 'cc')
                                  pushSeries('Citizen Forecasts Trump', false, $scope.citizenTrumpValues, 'tt')

                                  $scope.citizenOnclick = function() {
                                    if ($scope.citizen == true) {
                                      console.log('initiated')
                                      chart.series[12].show()
                                      chart.series[13].show()
                                      clintionTrumpValue()


                                    } else {
                                      chart.series[12].hide()
                                      chart.series[13].hide()
                                    }


                                  }



                                  pollssubcomponent.getData()
                                    .success(function(data) {

                                      $scope.tpmPollTracker = subcomponentDataClean(data, 'TPM Poll Tracker', $scope.tpmPollTracker)
                                      $scope.clintonTPMForcast = getClintonForcast($scope.tpmPollTracker)
                                      $scope.TrumpTPMForcast = getTrumpForcast($scope.tpmPollTracker)
                                      $scope.TPMClintonData = [];
                                      $scope.TPMTrumpData = [];
                                      getNeededValues($scope.TPMClintonData, $scope.TPMTrumpData, $scope.tpmPollTracker)
                                      pushSeries('TPM Poll Tracker Clinton', false, $scope.TPMClintonData, 'cc')
                                      pushSeries('TPM Poll Tracker Trump', false, $scope.TPMTrumpData, 'tt')
                                      $scope.tpmOnclick = function() {
                                        if ($scope.tpmPolls == true) {
                                          console.log('initiated')
                                          chart.series[14].show()
                                          chart.series[15].show()
                                          clintionTrumpValue()



                                        } else {
                                          chart.series[14].hide()
                                          chart.series[15].hide()

                                        }


                                      }

                                      //huffingston polls
                                      $scope.huffingston = subcomponentDataClean(data, 'HuffPost Pollster', $scope.huffingston)
                                      $scope.clintonhuffingstonForcast = getClintonForcast($scope.huffingston)
                                      $scope.TrumphussingstonForcast = getTrumpForcast($scope.huffingston)
                                      $scope.huffingstonClintonData = [];
                                      $scope.huffingstonTrumpData = [];
                                      getNeededValues($scope.huffingstonClintonData, $scope.huffingstonTrumpData, $scope.huffingston)
                                      pushSeries('HuffPost Pollster Clinton', false, $scope.huffingstonClintonData, 'cc')
                                      pushSeries('HuffPost Pollster Trump', false, $scope.huffingstonTrumpData, 'tt')
                                      $scope.huffingstonPollsOnclick = function() {
                                        if ($scope.huffingstonPolls == true) {
                                          console.log('initiated')
                                          chart.series[16].show()
                                          chart.series[17].show()
                                          clintionTrumpValue()


                                        } else {
                                          chart.series[16].hide()
                                          chart.series[17].hide()

                                        }


                                      }

                                      //Election Projection
                                      $scope.electionProjection = subcomponentDataClean(data, 'Election Projection', $scope.electionProjection)
                                      $scope.clintonelectionProjectionForecast = getClintonForcast($scope.electionProjection)
                                      $scope.trumpelectionProjectionForecast = getTrumpForcast($scope.electionProjection)
                                      $scope.ClintionelectionProjection = []
                                      $scope.TrumpelectionProjection = []
                                      getNeededValues($scope.ClintionelectionProjection, $scope.TrumpelectionProjection, $scope.electionProjection)
                                      pushSeries('Election Projection Clinton', false, $scope.ClintionelectionProjection, 'cc')
                                      pushSeries('Election Projection Trump', false, $scope.TrumpelectionProjection, 'tt')
                                      $scope.electionProjectionOnclick = function() {
                                        if ($scope.electionProjection == true) {
                                          console.log('initiated')
                                          chart.series[18].show()
                                          chart.series[19].show()
                                          clintionTrumpValue()



                                        } else {
                                          chart.series[18].hide()
                                          chart.series[19].hide()

                                        }


                                      }

                                      //538 (polls-only)
                                      $scope.pollsOnly = subcomponentDataClean(data, '538 (polls-only)', $scope.pollsOnly)
                                      $scope.clinton538Forcast = getClintonForcast($scope.pollsOnly)
                                      $scope.Trump538Forcast = getTrumpForcast($scope.pollsOnly)
                                      $scope.Clinton538ForecastValues = []
                                      $scope.Trump538ForecastValues = []
                                      getNeededValues($scope.Clinton538ForecastValues, $scope.Trump538ForecastValues, $scope.pollsOnly)
                                      pushSeries('538 (polls-only) Clinton', false, $scope.Clinton538ForecastValues, 'cc')
                                      pushSeries('538 (polls-only) Trump', false, $scope.Trump538ForecastValues, 'tt')
                                      $scope.pluspollsOnclick = function() {
                                        if ($scope.pluspolls == true) {
                                          console.log('initiated')
                                          chart.series[20].show()
                                          chart.series[21].show()
                                          clintionTrumpValue()



                                        } else {
                                          chart.series[20].hide()
                                          chart.series[21].hide()

                                        }


                                      }


                                      //270 to win
                                      $scope.twoSeventy = subcomponentDataClean(data, '270 to win', $scope.twoSeventy)
                                      $scope.clintonTwoSeventyForcast = getClintonForcast($scope.twoSeventy)
                                      $scope.trumpTwoSeventyForcast = getTrumpForcast($scope.twoSeventy)
                                      $scope.twoSeventyClintonValues = []
                                      $scope.twoSeventyTrumpValues = []
                                      getNeededValues($scope.twoSeventyClintonValues, $scope.twoSeventyTrumpValues, $scope.twoSeventy)
                                      pushSeries('270 to win Clinton', false, $scope.twoSeventyClintonValues, 'cc')
                                      pushSeries('270 to win Trump', false, $scope.twoSeventyTrumpValues, 'tt')
                                      $scope.twoSeventytoWinOnclick = function() {
                                        if ($scope.twoSeventytoWin == true) {
                                          console.log('initiated')
                                          chart.series[22].show()
                                          chart.series[23].show()
                                          clintionTrumpValue()


                                        } else {
                                          chart.series[22].hide()
                                          chart.series[23].hide()

                                        }


                                      };


                                      //RealClearPolitics
                                      $scope.RealClearPolitics = subcomponentDataClean(data, 'RealClearPolitics', $scope.RealClearPolitics)
                                      $scope.clintonRealClearPoliticsForcast = getClintonForcast($scope.RealClearPolitics)
                                      $scope.TrumpRealClearPoliticsForcast = getTrumpForcast($scope.RealClearPolitics)
                                      $scope.RealClearPoliticsClintonValues = []
                                      $scope.RealClearPoliticstrumpValues = []
                                      getNeededValues($scope.RealClearPoliticsClintonValues, $scope.RealClearPoliticstrumpValues, $scope.RealClearPolitics)
                                      pushSeries('RealClearPolitics Clinton', false, $scope.RealClearPoliticsClintonValues, 'cc')
                                      pushSeries('RealClearPolitics Trump', false, $scope.RealClearPoliticstrumpValues, 'tt')
                                      $scope.RealOnclick = function() {
                                        if ($scope.Real == true) {
                                          console.log('initiated')
                                          chart.series[24].show()
                                          chart.series[25].show()
                                          clintionTrumpValue()


                                        } else {
                                          chart.series[24].hide()
                                          chart.series[25].hide()

                                        }


                                      };


                                      //PEC
                                      $scope.pec = subcomponentDataClean(data, 'PEC', $scope.pec)
                                      $scope.pecclintonForecast = getClintonForcast($scope.pec)
                                      $scope.pecTrumpForecast = getTrumpForcast($scope.pec)
                                      $scope.pecClintonValues = []
                                      $scope.pecTrumpValues = []
                                      getNeededValues($scope.pecClintonValues, $scope.pecTrumpValues, $scope.pec)
                                      pushSeries('PEC Clinton', false, $scope.pecClintonValues, 'cc')
                                      pushSeries('PEC Trump', false, $scope.pecTrumpValues, 'tt')
                                      $scope.pecOnclick = function() {
                                        if ($scope.pec == true) {
                                          console.log('initiated')
                                          chart.series[26].show()
                                          chart.series[27].show()
                                          clintionTrumpValue()


                                        } else {
                                          chart.series[26].hide()
                                          chart.series[27].hide()

                                        }


                                      };



                                      indexModelsubcategory.getData()
                                        .success(function(data) {
                                          $scope.KeystotheWhiteHouse = {}
                                          separteData(data, 'Keys to the White House', $scope.KeystotheWhiteHouse)
                                          $scope.keystowhitehouseCleanedData = cleanupData($scope.KeystotheWhiteHouse)
                                          $scope.keystowhiteHouseClintonForcast = $scope.keystowhitehouseCleanedData[0].clinton
                                          $scope.keystowhiteHousetrumpForcast = $scope.keystowhitehouseCleanedData[0].trump
                                          $scope.keystowhiteHouseClintonValues = [];
                                          $scope.keystowhiteHouseTrumpValues = [];
                                          getNeededValues($scope.keystowhiteHouseClintonValues, $scope.keystowhiteHouseTrumpValues, $scope.keystowhitehouseCleanedData)
                                          pushSeries('Keys to the White House Clinton', false, $scope.keystowhiteHouseClintonValues, 'cc')
                                          pushSeries('Keys to the White House Trump', false, $scope.keystowhiteHouseTrumpValues, 'tt')
                                          $scope.keysOnclick = function() {
                                            if ($scope.keysWhiteHouse == true) {
                                              console.log('initiated')
                                              chart.series[28].show()
                                              chart.series[29].show()
                                              clintionTrumpValue()

                                            } else {
                                              chart.series[28].hide()
                                              chart.series[29].hide()
                                            }


                                          }



                                          $scope.IssuesandLeaders = {}
                                          separteData(data, 'Issues and Leaders', $scope.IssuesandLeaders)
                                          $scope.issuesandLeadersCleanedData = cleanupData($scope.IssuesandLeaders)
                                          $scope.IssuesandLeadersClintonForcast = $scope.issuesandLeadersCleanedData[0].clinton
                                          $scope.issuesandLeadersTrumpForecast = $scope.issuesandLeadersCleanedData[0].trump
                                          $scope.issuesandleadersClintonValues = [];
                                          $scope.issuesandleadersTrumpValues = [];
                                          getNeededValues($scope.issuesandleadersClintonValues, $scope.issuesandleadersTrumpValues, $scope.issuesandLeadersCleanedData)
                                          pushSeries('Issues and Leaders Clinton', false, $scope.issuesandleadersClintonValues, 'cc')
                                          pushSeries('Issues and Leaders Trump', false, $scope.issuesandleadersTrumpValues, 'tt')
                                          $scope.issuesOnclick = function() {
                                            if ($scope.issuesAndLeaders == true) {
                                              console.log('initiated')
                                              chart.series[30].show()
                                              chart.series[31].show()
                                              clintionTrumpValue()

                                            } else {
                                              chart.series[30].hide()
                                              chart.series[31].hide()

                                            }


                                          }


                                          $scope.bioIndex = {}
                                          separteData(data, 'Bio-index', $scope.bioIndex)
                                          $scope.bioindexCleanedData = cleanupData($scope.bioIndex)
                                          $scope.bioindexClintonForecast = $scope.bioindexCleanedData[0].clinton
                                          $scope.bioindexTrumpForecast = $scope.bioindexCleanedData[0].trump
                                          $scope.bioindexClintonValues = [];
                                          $scope.bioindexTrumpValues = [];
                                          getNeededValues($scope.bioindexClintonValues, $scope.bioindexTrumpValues, $scope.bioindexCleanedData)
                                          pushSeries('Bio-index Clinton', false, $scope.bioindexClintonValues, 'cc')
                                          pushSeries('Bio-index Trump', false, $scope.bioindexTrumpValues, 'tt')
                                          $scope.bioIndexOnclick = function() {
                                            if ($scope.bioIndex == true) {
                                              console.log('initiated')
                                              chart.series[32].show()
                                              chart.series[33].show()
                                              clintionTrumpValue()

                                            } else {
                                              chart.series[32].hide()
                                              chart.series[33].hide()


                                            }


                                          }

                                          $scope.bigIssue = {}
                                          separteData(data, 'Big-issue', $scope.bigIssue)
                                          $scope.bigIssue = cleanupData($scope.bigIssue)
                                          $scope.bigIssueClintonForecast = $scope.bigIssue[0].clinton
                                          $scope.bigIssueTrumpForecast = $scope.bigIssue[0].trump
                                          $scope.bigIssueClintonValues = [];
                                          $scope.bigIssueTrumpValues = [];
                                          getNeededValues($scope.bigIssueClintonValues, $scope.bigIssueTrumpValues, $scope.bigIssue)
                                          pushSeries('Big-issue Clinton', false, $scope.bigIssueClintonValues, 'cc')
                                          pushSeries('Big-issue Trump', false, $scope.bigIssueTrumpValues, 'tt')
                                          $scope.bigIssueOnclick = function() {
                                            if ($scope.bigIssue == true) {
                                              console.log('initiated')
                                              chart.series[34].show()
                                              chart.series[35].show()
                                              clintionTrumpValue()

                                            } else {
                                              chart.series[34].hide()
                                              chart.series[35].hide()

                                            }
                                          };



                                          $scope.issueIndex = {}
                                          separteData(data, 'Issue-index', $scope.issueIndex)
                                          $scope.issueIndexCleanedData = cleanupData($scope.issueIndex)
                                          $scope.issueIndexClintonForecast = $scope.issueIndexCleanedData[0].clinton
                                          $scope.issueIndexTrumpForecast = $scope.issueIndexCleanedData[0].trump
                                          $scope.issueIndexClintonValues = [];
                                          $scope.issueIndextrumpValues = [];
                                          getNeededValues($scope.issueIndexClintonValues, $scope.issueIndextrumpValues, $scope.issueIndexCleanedData)
                                          pushSeries('Issue-index Clinton', false, $scope.issueIndexClintonValues, 'cc')
                                          pushSeries('Issue-index Trump', false, $scope.issueIndextrumpValues, 'tt')
                                          $scope.issueIndexOnclick = function() {
                                            if ($scope.issueIndex == true) {
                                              console.log('initiated')
                                              chart.series[36].show()
                                              chart.series[37].show()
                                              clintionTrumpValue()

                                            } else {
                                              chart.series[36].hide()
                                              chart.series[37].hide()


                                            }


                                          }



                                          expertsubcategory.getData()
                                            .success(function(data) {
                                              $scope.pollyVoteExperts = {}
                                              $scope.splitedData = {}
                                              separteData(data, 'PollyVote.com Expert Panel', $scope.pollyVoteExperts)

                                              splitUpdate($scope.pollyVoteExperts, $scope.splitedData)


                                              $scope.expertPollyvoteData = cleanupData($scope.splitedData)

                                              $scope.expertPollyvoteClintonForecast = $scope.expertPollyvoteData[0].clinton
                                              $scope.expertPollyvoteTrumoForecast = $scope.expertPollyvoteData[0].trump

                                              $scope.exPollyvoteClintonValues = [];
                                              $scope.exPollyvoteTrumpValues = [];


                                              getNeededValues($scope.exPollyvoteClintonValues, $scope.exPollyvoteTrumpValues, $scope.expertPollyvoteData)
                                              pushSeries('PollyVote.com Expert Panel Clinton', true, $scope.exPollyvoteClintonValues, 'cc')
                                              pushSeries('PollyVote.com Expert Panel Trump', true, $scope.exPollyvoteTrumpValues, 'tt')



                                              $scope.esubcom = function() {
                                                if ($scope.subcomponent == true) {
                                                  console.log('initiated')
                                                  chart.series[38].show()
                                                  chart.series[39].show()
                                                  clintionTrumpValue()

                                                } else {
                                                  chart.series[38].hide()
                                                  chart.series[39].hide()

                                                }


                                              };

                                              subcomponentCitizen.getData()
                                                .success(function(data) {
                                                  //Quinnipiac University
                                                  var Quinnipiac = {}
                                                  var QuinnipiacSplited = {}

                                                  separteData(data, 'Quinnipiac University', Quinnipiac)
                                                  splitUpdate(Quinnipiac, QuinnipiacSplited)
                                                  var QuinnipiacData = cleanupData(QuinnipiacSplited)
                                                  $scope.QuinnipiacDataClintonForecast = QuinnipiacData[0].clinton
                                                  $scope.QuinnipiacDataTrumoForecast = QuinnipiacData[0].trump

                                                  var QuinnipiacDataClintonValues = [];
                                                  var QuinnipiacDataTrumpValues = [];
                                                  getNeededValues(QuinnipiacDataClintonValues, QuinnipiacDataTrumpValues, QuinnipiacData)
                                                  pushSeries('Quinnipiac University Clinton', true, QuinnipiacDataClintonValues, 'cc')
                                                  pushSeries('Quinnipiac University Trump', true, QuinnipiacDataTrumpValues, 'tt')

                                                  $scope.QuinnipiacOnclick = function() {
                                                    if ($scope.Quinnipiac == true) {
                                                      console.log('initiated')
                                                      chart.series[40].show()
                                                      chart.series[41].show()
                                                      clintionTrumpValue()

                                                    } else {
                                                      chart.series[40].hide()
                                                      chart.series[41].hide()

                                                    }


                                                  };

                                                  //Economist / YouGov
                                                  var economist = {}
                                                  var economistSplitedData = {}
                                                  separteData(data, 'Economist / YouGov', economist)
                                                  splitUpdate(economist, economistSplitedData)
                                                  var enomistCleanedData = cleanupData(economistSplitedData)
                                                  $scope.economistClintonForecast = enomistCleanedData[0].clinton
                                                  $scope.economistTrumoForecast = enomistCleanedData[0].trump
                                                  var economistClintonValues = [];
                                                  var economistTrumpValues = [];
                                                  getNeededValues(economistClintonValues, economistTrumpValues, enomistCleanedData)
                                                  pushSeries('Economist / YouGov Clinton', true, economistClintonValues, 'cc')
                                                  pushSeries('Economist / YouGov Trump', true, economistTrumpValues, 'tt')

                                                  $scope.economistOnclick = function() {
                                                    if ($scope.economist == true) {
                                                      console.log('initiated')
                                                      chart.series[42].show()
                                                      chart.series[43].show()
                                                      clintionTrumpValue()

                                                    } else {
                                                      chart.series[42].hide()
                                                      chart.series[43].hide()

                                                    }


                                                  };

                                                  //Suffolk University/USA Today
                                                  var usaToday = {}
                                                  var usaTodaySplited = {}
                                                  separteData(data, 'Suffolk University/USA Today', usaToday)
                                                  splitUpdate(usaToday, usaTodaySplited)
                                                  var usaTodayCleanedData = cleanupData(usaTodaySplited)
                                                  $scope.usatodayClintonForecast = usaTodayCleanedData[0].clinton
                                                  $scope.usaTodayTrumoForecast = usaTodayCleanedData[0].trump
                                                  var usaTodayClintonValues = []
                                                  var usaTodayTrumpValues = []
                                                  getNeededValues(usaTodayClintonValues, usaTodayTrumpValues, usaTodayCleanedData)
                                                  pushSeries('Suffolk University/USA Today Clinton', true, usaTodayClintonValues, 'cc')
                                                  pushSeries('Suffolk University/USA Today Trump', true, usaTodayTrumpValues, 'tt')

                                                  $scope.usaTodayOnclick = function() {
                                                    if ($scope.usaToday == true) {
                                                      console.log('initiated')
                                                      chart.series[44].show()
                                                      chart.series[45].show()
                                                      clintionTrumpValue()

                                                    } else {
                                                      chart.series[44].hide()
                                                      chart.series[45].hide()

                                                    }


                                                  };


                                                  pmsubcomponent.getData()
                                                    .success(function(data) {
                                                      //IEM (vote-share)

                                                      var iem = {}
                                                      separteData(data, 'IEM (vote-share)', iem)
                                                      var iemCleanData = cleanupData(iem)
                                                      console.log(data)
                                                      $scope.iemClintonForecast = iemCleanData[0].clinton
                                                      $scope.iemTrumpForecast = iemCleanData[0].trump
                                                      var iemClintonValues = [];
                                                      var iemTrumpValues = [];
                                                      getNeededValues(iemClintonValues, iemTrumpValues, iemCleanData)
                                                      pushSeries('IEM (vote-share) Clinton', false, iemClintonValues, 'cc')
                                                      pushSeries('IEM (vote-share) Trump', false, iemTrumpValues, 'tt')
                                                      $scope.iemOnclick = function() {
                                                        if ($scope.iem == true) {
                                                          console.log('initiated')
                                                          chart.series[46].show()
                                                          chart.series[47].show()
                                                          clintionTrumpValue()

                                                        } else {
                                                          chart.series[46].hide()
                                                          chart.series[47].hide()

                                                        }


                                                      };

                                                      ecosubcomponent.getData()
                                                        .success(function(data) {
                                                          //Vox.com
                                                          var vox = {}
                                                          separteData(data, 'Vox.com', vox)
                                                          var voxCleanData = cleanupData(vox)
                                                          $scope.voxClintonForecast = voxCleanData[0].clinton
                                                          $scope.voxTrumpForecast = voxCleanData[0].trump
                                                          var voxClintonValues = [];
                                                          var voxTrumpValues = [];
                                                          getNeededValues(voxClintonValues, voxTrumpValues, voxCleanData)
                                                          pushSeries('Vox.com Clinton', false, voxClintonValues, 'cc')
                                                          pushSeries('Vox.com Trump', false, voxTrumpValues, 'tt')
                                                          $scope.voxOnclick = function() {
                                                            if ($scope.vox == true) {
                                                              console.log('initiated')
                                                              chart.series[48].show()
                                                              chart.series[49].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[48].hide()
                                                              chart.series[49].hide()

                                                            }


                                                          };

                                                          //Time-for-change
                                                          var tfc = {}
                                                          separteData(data, 'Time-for-change', tfc)
                                                          var tfcCleanData = cleanupData(tfc)
                                                          $scope.tfcClintonForecast = tfcCleanData[0].clinton
                                                          $scope.tfcTrumpForecast = tfcCleanData[0].trump
                                                          var tfcClintonValues = [];
                                                          var tfcTrumpValues = [];
                                                          getNeededValues(tfcClintonValues, tfcTrumpValues, tfcCleanData)
                                                          pushSeries('Time-for-change Clinton', false, tfcClintonValues, 'cc')
                                                          pushSeries('Time-for-change Trump', false, tfcTrumpValues, 'tt')

                                                          $scope.tfcOnclick = function() {
                                                            if ($scope.tfc == true) {
                                                              console.log('initiated')
                                                              chart.series[50].show()
                                                              chart.series[51].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[50].hide()
                                                              chart.series[51].hide()

                                                            }


                                                          };

                                                          //Primary
                                                          var primary = {}
                                                          separteData(data, 'Primary', primary)
                                                          var primaryCleanData = cleanupData(primary)
                                                          $scope.primaryClintonForecast = primaryCleanData[0].clinton
                                                          $scope.primaryTrumpForecast = primaryCleanData[0].trump
                                                          var primaryClintonValues = [];
                                                          var primaryTrumpValues = [];
                                                          getNeededValues(primaryClintonValues, primaryTrumpValues, primaryCleanData)
                                                          pushSeries('Primary Clinton', false, primaryClintonValues, 'cc')
                                                          pushSeries('Primary Trump', false, primaryTrumpValues, 'tt')

                                                          $scope.primaryOnclick = function() {
                                                            if ($scope.primary == true) {
                                                              console.log('initiated')
                                                              chart.series[52].show()
                                                              chart.series[53].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[52].hide()
                                                              chart.series[53].hide()

                                                            }


                                                          };

                                                          // Lockerbie

                                                          var lockerbie = {}
                                                          separteData(data, 'Lockerbie', lockerbie)
                                                          var lockerbieCleanData = cleanupData(lockerbie)
                                                          $scope.lockerbieClintonForecast = lockerbieCleanData[0].clinton
                                                          $scope.lockerbieTrumpForecast = lockerbieCleanData[0].trump
                                                          var lockerbieClintonValues = [];
                                                          var lockerbieTrumpValues = [];
                                                          getNeededValues(lockerbieClintonValues, lockerbieTrumpValues, lockerbieCleanData)
                                                          pushSeries('Lockerbie Clinton', false, lockerbieClintonValues, 'cc')
                                                          pushSeries('Lockerbie Trump', false, lockerbieTrumpValues, 'tt')

                                                          $scope.lockerbieOnclick = function() {
                                                            if ($scope.lockerbie == true) {
                                                              console.log('initiated')
                                                              chart.series[54].show()
                                                              chart.series[55].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[54].hide()
                                                              chart.series[55].hide()

                                                            }


                                                          };

                                                          //Lewis-Beck & Tien
                                                          var tien = {}
                                                          separteData(data, 'Lewis-Beck & Tien', tien)
                                                          var tienCleanData = cleanupData(tien)
                                                          $scope.tienClintonForecast = tienCleanData[0].clinton
                                                          $scope.tienTrumpForecast = tienCleanData[0].trump
                                                          var tienClintonValues = [];
                                                          var tienTrumpValues = [];
                                                          getNeededValues(tienClintonValues, tienTrumpValues, tienCleanData)
                                                          pushSeries('Lewis-Beck & Tien Clinton', false, tienClintonValues, 'cc')
                                                          pushSeries('Lewis-Beck & Tien Trump', false, tienTrumpValues, 'tt')

                                                          $scope.tienOnclick = function() {
                                                            if ($scope.tien == true) {
                                                              console.log('initiated')
                                                              chart.series[56].show()
                                                              chart.series[57].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[56].hide()
                                                              chart.series[57].hide()

                                                            }


                                                          };



                                                          //Leading indicators
                                                          var indicators = {}
                                                          separteData(data, 'Leading indicators', indicators)
                                                          var indicatorsCleanData = cleanupData(indicators)
                                                          $scope.indicatorsClintonForecast = indicatorsCleanData[0].clinton
                                                          $scope.indicatorsTrumpForecast = indicatorsCleanData[0].trump
                                                          var indicatorsClintonValues = [];
                                                          var indicatorsTrumpValues = [];
                                                          getNeededValues(indicatorsClintonValues, indicatorsTrumpValues, indicatorsCleanData)
                                                          pushSeries('Leading indicators Clinton', false, indicatorsClintonValues, 'cc')
                                                          pushSeries('Leading indicators Trump', false, indicatorsTrumpValues, 'tt')

                                                          $scope.indicatorsOnclick = function() {
                                                            if ($scope.indicators == true) {
                                                              console.log('initiated')
                                                              chart.series[58].show()
                                                              chart.series[59].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[58].hide()
                                                              chart.series[59].hide()

                                                            }


                                                          };

                                                          //Jérôme & Jérôme
                                                          var jerome = {}
                                                          separteData(data, 'Jérôme & Jérôme', jerome)
                                                          var jeromeCleanData = cleanupData(jerome)
                                                          $scope.jeromeClintonForecast = jeromeCleanData[0].clinton
                                                          $scope.jeromeTrumpForecast = jeromeCleanData[0].trump
                                                          var jeromeClintonValues = [];
                                                          var jeromeTrumpValues = [];
                                                          getNeededValues(jeromeClintonValues, jeromeTrumpValues, jeromeCleanData)
                                                          pushSeries('Jérôme & Jérôme Clinton', false, jeromeClintonValues, 'cc')
                                                          pushSeries('Jérôme & Jérôme Trump', false, jeromeTrumpValues, 'tt')

                                                          $scope.jeromeOnclick = function() {
                                                            if ($scope.jerome == true) {
                                                              console.log('initiated')
                                                              chart.series[60].show()
                                                              chart.series[61].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[60].hide()
                                                              chart.series[61].hide()

                                                            }


                                                          };

                                                          //Trial-heat
                                                          var heat = {}
                                                          separteData(data, 'Trial-heat', heat)
                                                          var heatCleanData = cleanupData(heat)
                                                          $scope.heatClintonForecast = heatCleanData[0].clinton
                                                          $scope.heatTrumpForecast = heatCleanData[0].trump
                                                          var heatClintonValues = [];
                                                          var heatTrumpValues = [];
                                                          getNeededValues(heatClintonValues, heatTrumpValues, heatCleanData)
                                                          pushSeries('Trial-heat Clinton', false, heatClintonValues, 'cc')
                                                          pushSeries('Trial-heat Trump', false, heatTrumpValues, 'tt')

                                                          $scope.heatOnclick = function() {
                                                            if ($scope.heat == true) {
                                                              console.log('initiated')
                                                              chart.series[62].show()
                                                              chart.series[63].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[62].hide()
                                                              chart.series[63].hide()

                                                            }


                                                          };

                                                          //Holbrook & DeSar
                                                          var desar = {}
                                                          separteData(data, 'Holbrook & DeSart', desar)
                                                          var desarCleanData = cleanupData(desar)
                                                          $scope.desarClintonForecast = desarCleanData[0].clinton
                                                          $scope.desarTrumpForecast = desarCleanData[0].trump
                                                          var desarClintonValues = [];
                                                          var desarTrumpValues = [];
                                                          getNeededValues(desarClintonValues, desarTrumpValues, desarCleanData)
                                                          pushSeries('Holbrook & DeSart Clinton', false, desarClintonValues, 'cc')
                                                          pushSeries('Holbrook & DeSart Trump', false, desarTrumpValues, 'tt')

                                                          $scope.desarOnclick = function() {
                                                            if ($scope.desar == true) {
                                                              console.log('initiated')
                                                              chart.series[64].show()
                                                              chart.series[65].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[64].hide()
                                                              chart.series[65].hide()

                                                            }


                                                          };

                                                          // Fair
                                                          var fair = {}
                                                          separteData(data, 'Fair', fair)
                                                          var fairCleanData = cleanupData(fair)
                                                          $scope.fairClintonForecast = fairCleanData[0].clinton
                                                          $scope.fairTrumpForecast = fairCleanData[0].trump
                                                          var fairClintonValues = [];
                                                          var fairTrumpValues = [];
                                                          getNeededValues(fairClintonValues, fairTrumpValues, fairCleanData)
                                                          pushSeries('Fair Clinton', false, fairClintonValues, 'cc')
                                                          pushSeries('Fair Trump', false, fairTrumpValues, 'tt')

                                                          $scope.fairOnclick = function() {
                                                            if ($scope.fair == true) {
                                                              console.log('initiated')
                                                              chart.series[66].show()
                                                              chart.series[67].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[66].hide()
                                                              chart.series[67].hide()

                                                            }


                                                          };

                                                          //Electoral-cycle
                                                          var electoralcycle = {}
                                                          separteData(data, 'Electoral-cycle', electoralcycle)
                                                          var electoralcycleCleanData = cleanupData(electoralcycle)
                                                          $scope.electoralcycleClintonForecast = electoralcycleCleanData[0].clinton
                                                          $scope.electoralcycleTrumpForecast = electoralcycleCleanData[0].trump
                                                          var electoralcycleClintonValues = [];
                                                          var electoralcycleTrumpValues = [];
                                                          getNeededValues(electoralcycleClintonValues, electoralcycleTrumpValues, electoralcycleCleanData)
                                                          pushSeries('Electoral-cycle Clinton', false, electoralcycleClintonValues, 'cc')
                                                          pushSeries('Electoral-cycle Trump', false, electoralcycleTrumpValues, 'tt')

                                                          $scope.electoralcycleOnclick = function() {
                                                            if ($scope.electoralcycle == true) {
                                                              console.log('initiated')
                                                              chart.series[68].show()
                                                              chart.series[69].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[68].hide()
                                                              chart.series[69].hide()

                                                            }


                                                          };
                                                          //DeSart
                                                          var desart = {}
                                                          separteData(data, 'DeSart', desart)
                                                          var desartCleanData = cleanupData(desart)
                                                          $scope.desartClintonForecast = desartCleanData[0].clinton
                                                          $scope.desartTrumpForecast = desartCleanData[0].trump
                                                          var desartClintonValues = [];
                                                          var desartTrumpValues = [];
                                                          getNeededValues(desartClintonValues, desartTrumpValues, desartCleanData)
                                                          pushSeries('DeSart Clinton', false, desartClintonValues, 'cc')
                                                          pushSeries('DeSart Trump', false, desartTrumpValues, 'tt')

                                                          $scope.desartOnclick = function() {
                                                            if ($scope.desart == true) {
                                                              console.log('initiated')
                                                              chart.series[70].show()
                                                              chart.series[71].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[70].hide()
                                                              chart.series[71].hide()

                                                            }


                                                          };

                                                          //Convention bump
                                                          var bump = {}
                                                          separteData(data, 'Convention bump', bump)
                                                          var bumpCleanData = cleanupData(bump)
                                                          $scope.bumpClintonForecast = bumpCleanData[0].clinton
                                                          $scope.bumpTrumpForecast = bumpCleanData[0].trump
                                                          var bumpClintonValues = [];
                                                          var bumpTrumpValues = [];
                                                          getNeededValues(bumpClintonValues, bumpTrumpValues, bumpCleanData)
                                                          pushSeries('Convention bump Clinton', false, bumpClintonValues, 'cc')
                                                          pushSeries('Convention bump Trump', false, bumpTrumpValues, 'tt')

                                                          $scope.bumpOnclick = function() {
                                                            if ($scope.bump == true) {
                                                              console.log('initiated')
                                                              chart.series[72].show()
                                                              chart.series[73].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[72].hide()
                                                              chart.series[73].hide()

                                                            }


                                                          };
                                                          //538 (polls-plus)
                                                          var pollsPlus = {}
                                                          separteData(data, '538 (polls-plus)', pollsPlus)
                                                          var pollsPlusCleanData = cleanupData(pollsPlus)
                                                          $scope.pollsPlusClintonForecast = pollsPlusCleanData[0].clinton
                                                          $scope.pollsPlusTrumpForecast = pollsPlusCleanData[0].trump
                                                          var pollsPlusClintonValues = [];
                                                          var pollsPlusTrumpValues = [];
                                                          getNeededValues(pollsPlusClintonValues, pollsPlusTrumpValues, pollsPlusCleanData)
                                                          pushSeries('538 (polls-plus) Clinton', false, pollsPlusClintonValues, 'cc')
                                                          pushSeries('538 (polls-plus) Trump', false, pollsPlusTrumpValues, 'tt')

                                                          $scope.pollsPlusOnclick = function() {
                                                            if ($scope.pollsPlus == true) {
                                                              console.log('initiated')
                                                              chart.series[74].show()
                                                              chart.series[75].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[74].hide()
                                                              chart.series[75].hide()

                                                            }


                                                          };

                                                          //Fiscal model
                                                          var fiscalModel = {}
                                                          separteData(data, 'Fiscal model', fiscalModel)
                                                          var fiscalModelCleanData = cleanupData(fiscalModel)
                                                          $scope.fiscalModelClintonForecast = fiscalModelCleanData[0].clinton
                                                          $scope.fiscalModelTrumpForecast = fiscalModelCleanData[0].trump
                                                          var fiscalModelClintonValues = [];
                                                          var fiscalModelTrumpValues = [];
                                                          getNeededValues(fiscalModelClintonValues, fiscalModelTrumpValues, fiscalModelCleanData)
                                                          pushSeries('Fiscal model Clinton', false, fiscalModelClintonValues, 'cc')
                                                          pushSeries('Fiscal model Trump', false, fiscalModelTrumpValues, 'tt')

                                                          $scope.fiscalModelOnclick = function() {
                                                            if ($scope.fiscalModel == true) {
                                                              console.log('initiated')
                                                              chart.series[76].show()
                                                              chart.series[77].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[76].hide()
                                                              chart.series[77].hide()

                                                            }


                                                          };

                                                          //Holbrook
                                                          var holbrook = {}
                                                          separteData(data, 'Holbrook', holbrook)
                                                          var holbrookCleanData = cleanupData(holbrook)
                                                          $scope.holbrookClintonForecast = holbrookCleanData[0].clinton
                                                          $scope.holbrookTrumpForecast = holbrookCleanData[0].trump
                                                          var holbrookClintonValues = [];
                                                          var holbrookTrumpValues = [];
                                                          getNeededValues(holbrookClintonValues, holbrookTrumpValues, holbrookCleanData)
                                                          pushSeries('Holbrook Clinton', false, holbrookClintonValues, 'cc')
                                                          pushSeries('Holbrook Trump', false, holbrookTrumpValues, 'tt')

                                                          $scope.holbrookOnclick = function() {
                                                            if ($scope.holbrook == true) {
                                                              console.log('initiated')
                                                              chart.series[78].show()
                                                              chart.series[79].show()
                                                              clintionTrumpValue()

                                                            } else {

                                                              chart.series[78].hide()
                                                              chart.series[79].hide()

                                                            }


                                                          };



                                                          $scope.completeTimeLine = function(key) {

                                                            if ($scope.timeline == true) {
                                                              $scope.thirtyDay = false
                                                              chart.xAxis[0].update({
                                                                max: $scope.pollyvoteData[0].date,
                                                                min: new Date('2016/01/04').getTime()
                                                              })

                                                            } else {
                                                              chart.xAxis[0].update({
                                                                max: new Date('2016/11/08').getTime(),
                                                                min: new Date('2016/01/04').getTime()
                                                              })

                                                            }

                                                          };



                                                          $scope.lastThiry = function(key) {
                                                            if ($scope.thirtyDay == true) {
                                                              $scope.timeline = false
                                                              var pastDay = moment().subtract(30, 'days')
                                                              var today = moment()
                                                              console.log(chart.xAxis)


                                                              chart.xAxis[0].update({
                                                                max: Date.parse(today._d),
                                                                min: Date.parse(pastDay._d)
                                                              })

                                                            } else {
                                                              chart.xAxis[0].update({
                                                                max: new Date('2016/11/08').getTime(),
                                                                min: new Date('2016/01/04').getTime()
                                                              })

                                                            }



                                                          };

                                                        });
                                                    });

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
  }
})();