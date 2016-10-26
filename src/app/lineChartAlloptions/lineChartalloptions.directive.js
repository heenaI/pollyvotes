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
          $scope.addpollyVote();
          $scope.onChnage()
          showOnlyTrumpValues();

        } else {
          $scope.addpollyVote();
          $scope.onChnage();

        };
      }



      $scope.addOnlyClinton = function(key) {
        var chart = $('#container').highcharts()
        if ($scope.clintonValues == true) {
          $scope.trumpValues = false
          $scope.addpollyVote();
          $scope.onChnage()
          showOnlyClintonValues()


        } else {
          $scope.addpollyVote();
          $scope.onChnage();


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

              plotOptions: {
                series: {
                  marker: {
                    symbol: 'circle'
                  }
                }
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
                      color: '#606060',
                      fontSize: '0.9em'
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
                      color: '#606060',
                      fontSize: '0.9em'
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
                      color: '#606060',
                      fontSize: '0.9em'
                    }
                  }
                }],

              },
              yAxis: {
                gridLineWidth: 0,
                id: 'y-axis',
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
          $scope.chart = $('#container').highcharts()






          $scope.lastThiry = function(key) {
            if ($scope.thirtyDay == true) {
              $scope.timeline = false
              var pastDay = moment().subtract(30, 'days')
              var today = moment()

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

          function seriesShow(a, b) {
            chart.series[a].show()
            chart.series[b].show()
          }

          function seriesHide(a, b) {
            chart.series[a].hide()
            chart.series[b].hide()
          }

          $scope.addpollyVote = function(){
            if($scope.pollyVote==true){
              seriesShow(0, 1)
              
            } else if($scope.pollyVote==false){
              seriesHide(0, 1)
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
              pushSeries('Index models Clinton', false, $scope.indexClinton, 'cc')
              pushSeries('Index models Trump', false, $scope.indexTrump, 'tt')
       


              econometricModels.getData()
                .success(function(ModelsEconometricData) {

                  $scope.econometricData = cleanupData(ModelsEconometricData)
                  $scope.econometricClintonForcast = $scope.econometricData[0].clinton
                  $scope.econometricTrumpForcast = $scope.econometricData[0].trump

                  $scope.econoClinton = [];
                  $scope.econoTrump = [];
                  getNeededValues($scope.econoClinton, $scope.econoTrump, $scope.econometricData)
                  pushSeries('Econometric models Clinton', false, $scope.econoClinton, 'cc')
                  pushSeries('Econometric models Trump', false, $scope.econoTrump, 'tt')
                


                  expert.getData()
                    .success(function(expertModelsData) {
                      $scope.expertData = cleanupData(expertModelsData)
                      $scope.expertClintonForcast = $scope.expertData[0].clinton
                      $scope.expertTrumpForcast = $scope.expertData[0].trump
                      $scope.ModelsExpertClinton = [];
                      $scope.ModelsExpertTrump = [];
                      getNeededValues($scope.ModelsExpertClinton, $scope.ModelsExpertTrump, $scope.expertData)
                      pushSeries('Expert judgment Clinton', false, $scope.ModelsExpertClinton, 'cc')
                      pushSeries('Expert judgment Trump', false, $scope.ModelsExpertTrump, 'tt')

                   

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
                             



                              citizen.getData()
                                .success(function(citizenData) {
                                  $scope.citizenData = cleanupData(citizenData)
                                  $scope.citizenClintonForcast = $scope.citizenData[0].clinton
                                  $scope.citizentrumpForcast = $scope.citizenData[0].trump
                                  $scope.citizenClintonValues = [];
                                  $scope.citizenTrumpValues = [];
                                  getNeededValues($scope.citizenClintonValues, $scope.citizenTrumpValues, $scope.citizenData)
                                  pushSeries('Citizen forecasts Clinton', false, $scope.citizenClintonValues, 'cc')
                                  pushSeries('Citizen forecasts Trump', false, $scope.citizenTrumpValues, 'tt')

                                  

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
                                     

                                      //huffingston polls
                                      $scope.huffingston = subcomponentDataClean(data, 'HuffPost Pollster', $scope.huffingston)
                                      $scope.clintonhuffingstonForcast = getClintonForcast($scope.huffingston)
                                      $scope.TrumphussingstonForcast = getTrumpForcast($scope.huffingston)
                                      $scope.huffingstonClintonData = [];
                                      $scope.huffingstonTrumpData = [];
                                      getNeededValues($scope.huffingstonClintonData, $scope.huffingstonTrumpData, $scope.huffingston)
                                      pushSeries('HuffPost Pollster Clinton', false, $scope.huffingstonClintonData, 'cc')
                                      pushSeries('HuffPost Pollster Trump', false, $scope.huffingstonTrumpData, 'tt')

                                      //YouGov
                                      $scope.youGov = subcomponentDataClean(data, 'YouGov', $scope.youGov)
                                      $scope.clintonyouGovForcast = getClintonForcast($scope.youGov)
                                      $scope.TrumpyouGovForcast = getTrumpForcast($scope.youGov)
                                      $scope.youGovClintonData = [];
                                      $scope.youGovTrumpData = [];
                                      getNeededValues($scope.youGovClintonData, $scope.youGovTrumpData, $scope.youGov)
                                      pushSeries('YouGov Clinton', false, $scope.huffingstonClintonData, 'cc')
                                      pushSeries('YouGov Trump', false, $scope.huffingstonTrumpData, 'tt')
                                    

                                      //Election Projection
                                      $scope.electionProjection = subcomponentDataClean(data, 'Election Projection', $scope.electionProjection)
                                      $scope.clintonelectionProjectionForecast = getClintonForcast($scope.electionProjection)
                                      $scope.trumpelectionProjectionForecast = getTrumpForcast($scope.electionProjection)
                                      $scope.ClintionelectionProjection = []
                                      $scope.TrumpelectionProjection = []
                                      getNeededValues($scope.ClintionelectionProjection, $scope.TrumpelectionProjection, $scope.electionProjection)
                                      pushSeries('Election Projection Clinton', false, $scope.ClintionelectionProjection, 'cc')
                                      pushSeries('Election Projection Trump', false, $scope.TrumpelectionProjection, 'tt')
                                     
                                      //538 (polls-only)
                                      $scope.pollsOnly = subcomponentDataClean(data, '538 (polls-only)', $scope.pollsOnly)
                                      $scope.clinton538Forcast = getClintonForcast($scope.pollsOnly)
                                      $scope.Trump538Forcast = getTrumpForcast($scope.pollsOnly)
                                      $scope.Clinton538ForecastValues = []
                                      $scope.Trump538ForecastValues = []
                                      getNeededValues($scope.Clinton538ForecastValues, $scope.Trump538ForecastValues, $scope.pollsOnly)
                                      pushSeries('538 (polls-only) Clinton', false, $scope.Clinton538ForecastValues, 'cc')
                                      pushSeries('538 (polls-only) Trump', false, $scope.Trump538ForecastValues, 'tt')
                                     


                                      //270 to win
                                      $scope.twoSeventy = subcomponentDataClean(data, '270 to win', $scope.twoSeventy)
                                      $scope.clintonTwoSeventyForcast = getClintonForcast($scope.twoSeventy)
                                      $scope.trumpTwoSeventyForcast = getTrumpForcast($scope.twoSeventy)
                                      $scope.twoSeventyClintonValues = []
                                      $scope.twoSeventyTrumpValues = []
                                      getNeededValues($scope.twoSeventyClintonValues, $scope.twoSeventyTrumpValues, $scope.twoSeventy)
                                      pushSeries('270 to win Clinton', false, $scope.twoSeventyClintonValues, 'cc')
                                      pushSeries('270 to win Trump', false, $scope.twoSeventyTrumpValues, 'tt')
                                      
                                     


                                      //RealClearPolitics
                                      $scope.RealClearPolitics = subcomponentDataClean(data, 'RealClearPolitics', $scope.RealClearPolitics)
                                      $scope.clintonRealClearPoliticsForcast = getClintonForcast($scope.RealClearPolitics)
                                      $scope.TrumpRealClearPoliticsForcast = getTrumpForcast($scope.RealClearPolitics)
                                      $scope.RealClearPoliticsClintonValues = []
                                      $scope.RealClearPoliticstrumpValues = []
                                      getNeededValues($scope.RealClearPoliticsClintonValues, $scope.RealClearPoliticstrumpValues, $scope.RealClearPolitics)
                                      pushSeries('RealClearPolitics Clinton', false, $scope.RealClearPoliticsClintonValues, 'cc')
                                      pushSeries('RealClearPolitics Trump', false, $scope.RealClearPoliticstrumpValues, 'tt')
                                   

                                      //PEC
                                      $scope.pec = subcomponentDataClean(data, 'PEC', $scope.pec)
                                      $scope.pecclintonForecast = getClintonForcast($scope.pec)
                                      $scope.pecTrumpForecast = getTrumpForcast($scope.pec)
                                      $scope.pecClintonValues = []
                                      $scope.pecTrumpValues = []
                                      getNeededValues($scope.pecClintonValues, $scope.pecTrumpValues, $scope.pec)
                                      pushSeries('PEC Clinton', false, $scope.pecClintonValues, 'cc')
                                      pushSeries('PEC Trump', false, $scope.pecTrumpValues, 'tt')
                                    



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

                                                          //Bread & Peace
                                                          var breadPeace = {}
                                                          separteData(data, 'Bread & Peace', breadPeace)
                                                          var breadPeaceCleanData = cleanupData(breadPeace)
                                                          $scope.breadPeaceClintonForecast = breadPeaceCleanData[0].clinton
                                                          $scope.breadPeaceTrumpForecast = breadPeaceCleanData[0].trump
                                                          var breadPeaceClintonValues = [];
                                                          var breadPeaceTrumpValues = [];
                                                          getNeededValues(breadPeaceClintonValues, breadPeaceTrumpValues, breadPeaceCleanData)
                                                          pushSeries('Bread & Peace Clinton', false, breadPeaceClintonValues, 'cc')
                                                          pushSeries('Bread & Peace Trump', false, breadPeaceTrumpValues, 'tt')

                                                          //Crosstab
                                                          var Crosstab = {}
                                                          separteData(data, 'Crosstab', Crosstab)
                                                          var CrosstabCleanData = cleanupData(Crosstab)
                                                          $scope.CrosstabClintonForecast = CrosstabCleanData[0].clinton
                                                          $scope.CrosstabTrumpForecast = CrosstabCleanData[0].trump
                                                          var CrosstabClintonValues = [];
                                                          var CrosstabTrumpValues = [];
                                                          getNeededValues(CrosstabClintonValues, CrosstabTrumpValues, CrosstabCleanData)
                                                          pushSeries('Crosstab Clinton', false, CrosstabClintonValues, 'cc')
                                                          pushSeries('Crosstab Trump', false, CrosstabTrumpValues, 'tt')

                                                          


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


                                                          $scope.tableData = [{
                                                            name: 'Index models',
                                                            url: '//pollyvote.com/en/components/index-models/',
                                                            clintonValuemain: $scope.indexClintonForcast,
                                                            trumpValue: $scope.indexTrumpForcast,
                                                            model: 'indexModel',
                                                            subvalues: [{
                                                              name: 'Keys to the White House',
                                                              url: '//pollyvote.com/en/components/index-models/keys-to-the-white-house/',
                                                              clintonValuesub: $scope.keystowhiteHouseClintonForcast,
                                                              trumpValue: $scope.keystowhiteHousetrumpForcast,
                                                              model: 'keysWhiteHouse'
                                                            }, {
                                                              name: 'Issues and Leaders',
                                                              url: '//pollyvote.com/en/issues-and-leaders/',
                                                              clintonValuesub: $scope.IssuesandLeadersClintonForcast,
                                                              trumpValue: $scope.issuesandLeadersTrumpForecast,
                                                              model: 'issuesAndLeaders'
                                                            }, {
                                                              name: 'Bio-index',
                                                              url: '//pollyvote.com/en/components/index-models/bio-index/',
                                                              clintonValuesub: $scope.bioindexClintonForecast,
                                                              trumpValue: $scope.bioindexTrumpForecast,
                                                              model: 'bioIndex'
                                                            }, {
                                                              name: 'Big-issue',
                                                              url: '//pollyvote.com/de/komponenten/index-modelle/big-issue/',
                                                              clintonValuesub: $scope.bigIssueClintonForecast,
                                                              trumpValue: $scope.bigIssueTrumpForecast,
                                                              model: 'bigIssue'
                                                            }, {
                                                              name: 'Issue-index',
                                                              url: '//pollyvote.com/en/components/index-models/issue-index',
                                                              clintonValuesub: $scope.issueIndexClintonForecast,
                                                              trumpValue: $scope.issueIndexTrumpForecast,
                                                              model: 'issueIndex'
                                                            }]
                                                          }, {
                                                            name: 'Poll aggregators',
                                                            url: '//pollyvote.com/en/components/polls/',
                                                            clintonValuemain: $scope.pollaggrClintonForcast,
                                                            trumpValue: $scope.pollaggrTrumpForcast,
                                                            model: 'aggregators',
                                                            subvalues: [{
                                                              name: 'TPM Poll Tracker',
                                                              url: '//pollyvote.com/en/2016/06/27/tpm-poll-tracker-poll-clinton-with-5-point-lead/',
                                                              clintonValuesub: $scope.clintonTPMForcast ,
                                                              trumpValue: $scope.TrumpTPMForcast,
                                                              model: 'tpmPolls'
                                                            }, {
                                                              name: 'HuffPost Pollster',
                                                              url: '//pollyvote.com/en/components/polls/huffpost-pollster/',
                                                              clintonValuesub: $scope.clintonhuffingstonForcast,
                                                              trumpValue: $scope.TrumphussingstonForcast,
                                                              model: 'huffingstonPolls'
                                                            }, {
                                                              name: 'Election Projection',
                                                              url: '//pollyvote.com/en/components/polls/election-projection/',
                                                              clintonValuesub: $scope.clintonelectionProjectionForecast,
                                                              trumpValue: $scope.trumpelectionProjectionForecast,
                                                              model: 'electionProjection'
                                                            }, {
                                                              name: '538 (polls-only)',
                                                              url: '//pollyvote.com/en/components/polls/538-polls-plus/',
                                                              clintonValuesub: $scope.clinton538Forcast,
                                                              trumpValue: $scope.Trump538Forcast,
                                                              model: 'pluspolls'

                                                            }, {
                                                              name: '270 to win',
                                                              url: '//pollyvote.com/en/components/polls/270-to-win/',
                                                              clintonValuesub: $scope.clintonTwoSeventyForcast,
                                                              trumpValue: $scope.trumpTwoSeventyForcast,
                                                              model: 'twoSeventytoWin'

                                                            }, {
                                                              name: 'RealClearPolitics',
                                                              url: '//pollyvote.com/en/components/polls/RealClearPolitics/',
                                                              clintonValuesub: $scope.clintonRealClearPoliticsForcast,
                                                              trumpValue: $scope.TrumpRealClearPoliticsForcast,
                                                              model: 'Real'

                                                            }, {
                                                              name: 'PEC',
                                                              url: '//pollyvote.com/en/components/polls/',
                                                              clintonValuesub: $scope.pecclintonForecast,
                                                              trumpValue: $scope.pecTrumpForecast,
                                                              model: 'pec'
                                                            },{
                                                              name: 'YouGov',
                                                              url: '//pollyvote.com/en/yougov',
                                                              clintonValuesub: $scope.clintonyouGovForcast,
                                                              trumpValue: $scope.TrumpyouGovForcast,
                                                              model: 'yougov'
                                                            }]

                                                          }, {
                                                            name: 'Expert judgment',
                                                            url: '//pollyvote.com/en/components/expert-judgment/',
                                                            clintonValuemain: $scope.expertClintonForcast,
                                                            trumpValue: $scope.expertTrumpForcast,
                                                            model: 'expert',
                                                            subvalues: []
                                                          }, {
                                                            name: 'Citizen forecasts',
                                                            url: '//pollyvote.com/en/components/citizen-forecasts/',
                                                            clintonValuemain: $scope.citizenClintonForcast,
                                                            trumpValue: $scope.citizentrumpForcast,
                                                            model: 'expert',
                                                            subvalues: []
                                                          }, {
                                                            name: 'Prediction markets',
                                                            url: '//pollyvote.com/en/components/prediction-markets/',
                                                            clintonValuemain: $scope.predictionMarketClintonForcast,
                                                            trumpValue: $scope.predictionMarketTrumpForcast,
                                                            model: 'expert',
                                                            subvalues: [{
                                                              name: 'IEM (vote-share)',
                                                              url: '//pollyvote.com/en/components/prediction-markets/iowa-electronic-markets/',
                                                              clintonValuesub: $scope.iemClintonForecast,
                                                              trumpValue: $scope.iemTrumpForecast,
                                                              model: 'iem'
                                                            }]
                                                          }, {
                                                            name: 'Econometric models',
                                                            url: '//pollyvote.com/en/components/econometric-models/',
                                                            clintonValuemain: $scope.econometricClintonForcast,
                                                            trumpValue: $scope.econometricTrumpForcast,
                                                            model: 'models',
                                                            subvalues: [{
                                                              name: 'Vox.com',
                                                              url: '//www.vox.com/a/trump-tax',
                                                              clintonValuesub: $scope.voxClintonForecast,
                                                              trumpValue: $scope.voxTrumpForecast,
                                                              model: 'vox'
                                                            }, {
                                                              name: 'Time-for-change',
                                                              url: '//pollyvote.com/en/components/econometric-models/time-for-change-model/',
                                                              clintonValuesub: $scope.tfcClintonForecast,
                                                              trumpValue: $scope.tfcTrumpForecast,
                                                              model: 'tfc'
                                                            }, {
                                                              name: 'Primary',
                                                              url: '//pollyvote.com/en/components/econometric-models/primary-model/',
                                                              clintonValuesub: $scope.primaryClintonForecast,
                                                              trumpValue: $scope.primaryTrumpForecast,
                                                              model: 'primary'
                                                            }, {
                                                              name: 'Lockerbie',
                                                              url: '//www.centerforpolitics.org/crystalball/articles/the-political-science-election-forecasts-of-the-2016-presidential-and-congressional-elections-part-2/',
                                                              clintonValuesub: $scope.lockerbieClintonForecast,
                                                              trumpValue: $scope.lockerbieTrumpForecast,
                                                              model: 'lockerbie'
                                                            }, {
                                                              name: 'Lewis-Beck & Tien',
                                                              url: '//pollyvote.com/en/components/econometric-models/lewis-beck-tien/',
                                                              clintonValuesub: $scope.tienClintonForecast,
                                                              trumpValue: $scope.tienTrumpForecast,
                                                              model: 'tien'
                                                            }, {
                                                              name: 'Leading indicators',
                                                              url: '//pollyvote.com/en/components/econometric-models/leading-economic-indicators-and-the-polls/',
                                                              clintonValuesub: $scope.indicatorsClintonForecast,
                                                              trumpValue: $scope.indicatorsTrumpForecast,
                                                              model: 'indicators'
                                                            }, {
                                                              name: 'Jérôme & Jérôme',
                                                              url: '//pollyvote.com/en/components/econometric-models/jerome-jerome/',
                                                              clintonValuesub: $scope.jeromeClintonForecast,
                                                              trumpValue: $scope.jeromeTrumpForecast,
                                                              model: 'jerome'
                                                            }, {
                                                              name: 'Holbrook & DeSart',
                                                              url: '//research.uvu.edu/DeSart/forecasting/',
                                                              clintonValuesub: $scope.desarClintonForecast,
                                                              trumpValue: $scope.desarTrumpForecast,
                                                              model: 'desar'
                                                            }, {
                                                              name: 'Trial-heat',
                                                              url: '//pollyvote.com/en/components/econometric-models/trial-heat-model/',
                                                              clintonValuesub: $scope.heatClintonForecast,
                                                              trumpValue: $scope.heatTrumpForecast,
                                                              model: 'heat'
                                                            }, {
                                                              name: 'Fair',
                                                              url: '//pollyvote.com/en/components/econometric-models/fair-model/',
                                                              clintonValuesub: $scope.fairClintonForecast,
                                                              trumpValue: $scope.fairTrumpForecast,
                                                              model: 'fair'
                                                            }, {
                                                              name: 'Electoral-cycle',
                                                              url: '//pollyvote.com/en/components/econometric-models/electoral-cycle-model/',
                                                              clintonValuesub: $scope.electoralcycleClintonForecast,
                                                              trumpValue: $scope.electoralcycleTrumpForecast,
                                                              model: 'electoralcycle'
                                                            }, {
                                                              name: 'DeSart',
                                                              url: '//pollyvote.com/en/components/econometric-models/desart/',
                                                              clintonValuesub: $scope.desartClintonForecast,
                                                              trumpValue: $scope.desartTrumpForecast,
                                                              model: 'desart'
                                                            }, {
                                                              name: 'Convention bump',
                                                              url: '//pollyvote.com/en/components/econometric-models/convention-bump-model/',
                                                              clintonValuesub: $scope.bumpClintonForecast,
                                                              trumpValue: $scope.bumpTrumpForecast,
                                                              model: 'bump'
                                                            }, {
                                                              name: '538 (polls-plus)',
                                                              url: '//projects.fivethirtyeight.com/2016-election-forecast/?ex_cid=rrpromo#plus',
                                                              clintonValuesub: $scope.pollsPlusClintonForecast,
                                                              trumpValue: $scope.pollsPlusTrumpForecast,
                                                              model: 'pollsPlus'
                                                            }, {
                                                              name: 'Fiscal model',
                                                              url: '//pollyvote.com/en/components/econometric-models/fiscal-model/',
                                                              clintonValuesub: $scope.fiscalModelClintonForecast,
                                                              trumpValue: $scope.fiscalModelTrumpForecast,
                                                              model: 'fiscalModel'
                                                            }, {
                                                              name: 'Holbrook',
                                                              url: '//pollyvote.com/en/components/econometric-models/holbrook/',
                                                              clintonValuesub: $scope.holbrookClintonForecast,
                                                              trumpValue: $scope.holbrookTrumpForecast,
                                                              model: 'holbrook'
                                                            }, {
                                                              name: 'Bread & Peace',
                                                              url: '//pollyvote.com/en/components/econometric-models/bread-and-peace-model/',
                                                              clintonValuesub: $scope.breadPeaceClintonForecast,
                                                              trumpValue: $scope.breadPeaceTrumpForecast,
                                                              model: 'breadPeace'
                                                            }, {
                                                              name: 'Crosstab',
                                                              url: '//pollyvote.com/en/',
                                                              clintonValuesub: $scope.CrosstabClintonForecast,
                                                              trumpValue: $scope.CrosstabTrumpForecast,
                                                              model: 'Crosstab'
                                                            }]
                                                          }];



                                                          function showValues(nameLocation) {
                                                           
                                                            var clinton = nameLocation + ' ' + 'Clinton' 
                                                            var trump = nameLocation + ' ' + 'Trump'
                                                            var indexClinton = chart.series.findIndex(function(x) { return x.name == clinton})
                                                            var indexTrump = chart.series.findIndex(function(x) { return  x.name == trump})
                                                            seriesShow(indexClinton, indexTrump)
                                                            clintionTrumpValue()

                                                          }

                                                          function hideValues(nameLocation) {
                                            
                                                            var clinton = nameLocation + ' ' + 'Clinton'
                                                            var trump = nameLocation + ' ' + 'Trump'
                                                            var indexClinton = chart.series.findIndex(function(x) { return  x.name == clinton})
                                                            var indexTrump = chart.series.findIndex(function(x) { return  x.name == trump})
                                                            seriesHide(indexClinton, indexTrump)
                                                            clintionTrumpValue()


                                                          }



                                                          $scope.onChnage = function() {
                                                            console.log($scope.tableData[5].name)
                                                            var i, k
                                                            for (i = 0; i < $scope.tableData.length; i++) {
                                                              if ($scope.tableData[i].model == true) {
                                                                showValues($scope.tableData[i].name)

                                                              } else if ($scope.tableData[i].model == false) {
                                                                hideValues($scope.tableData[i].name)

                                                              }
                                                            }
                                                            for (i = 0; i < $scope.tableData[0].subvalues.length; i++) {
                                                              if ($scope.tableData[0].subvalues[i].model == true) {
                                                                showValues($scope.tableData[0].subvalues[i].name)

                                                              } else if ($scope.tableData[0].subvalues[i].model == false) {
                                                                hideValues($scope.tableData[0].subvalues[i].name)

                                                              }


                                                            };

                                                            for (i = 0; i < $scope.tableData[1].subvalues.length; i++) {
                                                              if ($scope.tableData[1].subvalues[i].model == true) {
                                                                showValues($scope.tableData[1].subvalues[i].name)

                                                              } else if ($scope.tableData[1].subvalues[i].model == false) {
                                                                hideValues($scope.tableData[1].subvalues[i].name)

                                                              }


                                                            };

                                                            for (i = 0; i < $scope.tableData[4].subvalues.length; i++) {
                                                              if ($scope.tableData[4].subvalues[i].model == true) {
                                                                showValues($scope.tableData[4].subvalues[i].name)

                                                              } else if ($scope.tableData[4].subvalues[i].model == false) {
                                                                hideValues($scope.tableData[4].subvalues[i].name)

                                                              }


                                                            };

                                                            for (i = 0; i < $scope.tableData[5].subvalues.length; i++) {
                                                              if ($scope.tableData[5].subvalues[i].model == true) {
                                                                showValues($scope.tableData[5].subvalues[i].name)

                                                              } else if ($scope.tableData[5].subvalues[i].model == false) {
                                                                hideValues($scope.tableData[5].subvalues[i].name)

                                                              }


                                                            };



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