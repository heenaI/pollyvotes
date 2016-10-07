(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .directive('line', line);

  /** @ngInject */
  function line(lineChart, lineChartIndexModel, econometricModels, expert, citizen, prediction, pollagg, indexModelsubcategory, pollssubcomponent) {
    return {
      restrict: 'E',
      templateUrl: "app/lineChartAlloptions/lineChart.html",
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
            $scope.convertedData.push({
              "clinton": ClintonValues,
              "trump": TrumpValues,
              "date": Date.parse(anotherDate),
              'lastUpdate': Date.parse(unixDate)
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
      }

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

      var removeByAttr = function(arr, attr, value) {
        var i = arr.length;
        while (i--) {
          if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

          }
        }
        return arr;
      };

      //highcharts charts

      function createChart() {


      };

      function showOnlyClintonValues() {
        $scope.trumpValues = false
          for (var i = 0; i < $scope.chartConfig.series.length; i++) {

            if ($scope.chartConfig.series[i].identifier == 'tt' && $scope.chartConfig.series[i].visible == true) {
              $scope.chartConfig.series[i].visible = false
              $scope.chartConfig.series[0].visible = true

            } 
            // else if($scope.chartConfig.series[0]){
            //   $scope.chartConfig.series[i].visible = true
            // } 
          }

      }

      function showOnlyTrumpValues() {
        $scope.clintonValues = false
          for (var i = 0; i < $scope.chartConfig.series.length; i++) {

            if ($scope.chartConfig.series[i].identifier == 'cc' && $scope.chartConfig.series[i].visible == true) {
              $scope.chartConfig.series[i].visible = false
              $scope.chartConfig.series[1].visible = true

            } 
          }

      }

      function allOnclickFunctions(){
         $scope.indexOnclick()
          $scope.econoOnclick()
          $scope.expertOnclick()
          $scope.keysOnclick()
          $scope.issuesOnclick()
          $scope.bioIndexOnclick()
          $scope.bigIssueOnclick()
          $scope.issueIndexOnclick()
          $scope.citizenOnclick()
          $scope.pmOnclick()
          $scope.intenpollsOnclick()
          $scope.tpmOnclick()
          $scope.huffingstonPollsOnclick()
          $scope.electionProjectionOnclick()
          $scope.pluspollsOnclick()
          $scope.twoSeventytoWinOnclick()
          $scope.RealOnclick()
          $scope.pecOnclick()

      }



      $scope.addOnlyTrump = function(key) {


        if ($scope.trumpValues == true) {
          showOnlyTrumpValues()
          allOnclickFunctions()
          


        } else {
           for (var i = 0; i < $scope.chartConfig.series.length; i++) {
              $scope.chartConfig.series[i].visible = true
          }
         
          allOnclickFunctions()




        }



      };



      $scope.addOnlyClinton = function(key) {
        if ($scope.clintonValues == true) {
          showOnlyClintonValues()
          allOnclickFunctions()


        } else {
          for (var i = 0; i < $scope.chartConfig.series.length; i++) {
              $scope.chartConfig.series[i].visible = true
          }
          allOnclickFunctions()


        }



      };



      $scope.completeTimeLine = function(key) {

        if ($scope.timeline == true) {
          $scope.thirtyDay = false
          $scope.chartConfig.xAxis.min = new Date('2016/01/04').getTime()
          $scope.chartConfig.xAxis.max = $scope.pollyvoteData[0].date



        } else if ($scope.timeline == false && $scope.thirtyDay == false) {
          $scope.chartConfig.xAxis.max = new Date('2016/11/08').getTime()
          $scope.chartConfig.xAxis.min = new Date('2016/01/04').getTime()



        }

      }



      $scope.lastThiry = function(key) {
        if ($scope.thirtyDay == true) {
          $scope.timeline = false
            // $scope.savedState = JSON.parse(JSON.stringify($scope.chartConfig));
          var pastDay = moment().subtract(30, 'days')
          var today = moment()

          $scope.chartConfig.xAxis.max = Date.parse(today)
          $scope.chartConfig.xAxis.min = Date.parse(pastDay._d)
          console.log(JSON.stringify($scope.pollyvoteData))



        } else if ($scope.thirtyDay == false && $scope.timeline == false) {
          $scope.chartConfig.xAxis.max = new Date('2016/11/08').getTime()
          $scope.chartConfig.xAxis.min = new Date('2016/01/04').getTime()


        }



      };
      var subcomponentDataClean = function(rawData, subcomponent, holder) {

        var createJson = {};
        separteData(rawData, subcomponent, createJson)
        var cleanData = cleanupData(createJson)
        return cleanData



      }
      var getClintonForcast = function(cleanedData) {
        return cleanedData[0].clinton

      }

      var getTrumpForcast = function(cleanedData) {
        return cleanedData[0].trump

      }

      function clintionTrumpValue() {
        if ($scope.trumpValues == true) {
          showOnlyTrumpValues();


        } else if ($scope.clintonValues == true) {
          showOnlyClintonValues();

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
                          $scope.pollaggr = cleanupData(pollaggData)
                          $scope.pollaggrClintonForcast = $scope.pollaggr[0].clinton
                          $scope.pollaggrTrumpForcast = $scope.pollaggr[0].trump
                          $scope.pollsClintonValues = [];
                          $scope.pollsTrumpValues = [];
                          getNeededValues($scope.pollsClintonValues, $scope.pollsTrumpValues, $scope.pollaggr)



                          prediction.getData()
                            .success(function(predictionData) {
                              $scope.predictionMarketData = cleanupData(predictionData)
                              $scope.predictionMarketClintonForcast = $scope.predictionMarketData[0].clinton
                              $scope.predictionMarketTrumpForcast = $scope.predictionMarketData[0].trump
                              $scope.predictionClintonValues = [];
                              $scope.predictionTrumpValues = [];
                              getNeededValues($scope.predictionClintonValues, $scope.predictionTrumpValues, $scope.predictionMarketData)



                              citizen.getData()
                                .success(function(citizenData) {
                                  $scope.citizenData = cleanupData(citizenData)
                                  $scope.citizenClintonForcast = $scope.citizenData[0].clinton
                                  $scope.citizentrumpForcast = $scope.citizenData[0].trump
                                  $scope.citizenClintonValues = [];
                                  $scope.citizenTrumpValues = [];
                                  getNeededValues($scope.citizenClintonValues, $scope.citizenTrumpValues, $scope.citizenData)



                                  pollssubcomponent.getData()
                                    .success(function(data) {

                                      $scope.tpmPollTracker = subcomponentDataClean(data, 'TPM Poll Tracker', $scope.tpmPollTracker)
                                      $scope.clintonTPMForcast = getClintonForcast($scope.tpmPollTracker)
                                      $scope.TrumpTPMForcast = getTrumpForcast($scope.tpmPollTracker)
                                      $scope.TPMClintonData = [];
                                      $scope.TPMTrumpData = [];
                                      getNeededValues($scope.TPMClintonData, $scope.TPMTrumpData, $scope.tpmPollTracker)

                                      //huffingston polls
                                      $scope.huffingston = subcomponentDataClean(data, 'HuffPost Pollster', $scope.huffingston)
                                      $scope.clintonhuffingstonForcast = getClintonForcast($scope.huffingston)
                                      $scope.TrumphussingstonForcast = getTrumpForcast($scope.huffingston)
                                      $scope.huffingstonClintonData = [];
                                      $scope.huffingstonTrumpData = [];
                                      getNeededValues($scope.huffingstonClintonData, $scope.huffingstonTrumpData, $scope.huffingston)

                                      //Election Projection
                                      $scope.electionProjection = subcomponentDataClean(data, 'Election Projection', $scope.electionProjection)
                                      $scope.clintonelectionProjectionForecast = getClintonForcast($scope.electionProjection)
                                      $scope.trumpelectionProjectionForecast = getTrumpForcast($scope.electionProjection)
                                      $scope.ClintionelectionProjection = []
                                      $scope.TrumpelectionProjection = []
                                      getNeededValues($scope.ClintionelectionProjection, $scope.TrumpelectionProjection, $scope.electionProjection)

                                      //538 (polls-only)
                                      $scope.pollsOnly = subcomponentDataClean(data, '538 (polls-only)', $scope.pollsOnly)
                                      $scope.clinton538Forcast = getClintonForcast($scope.pollsOnly)
                                      $scope.Trump538Forcast = getTrumpForcast($scope.pollsOnly)
                                      $scope.Clinton538ForecastValues = []
                                      $scope.Trump538ForecastValues = []
                                      getNeededValues($scope.Clinton538ForecastValues, $scope.Trump538ForecastValues, $scope.pollsOnly)


                                      //270 to win
                                      $scope.twoSeventy = subcomponentDataClean(data, '270 to win', $scope.twoSeventy)
                                      $scope.clintonTwoSeventyForcast = getClintonForcast($scope.twoSeventy)
                                      $scope.trumpTwoSeventyForcast = getTrumpForcast($scope.twoSeventy)
                                      $scope.twoSeventyClintonValues = []
                                      $scope.twoSeventyTrumpValues = []
                                      getNeededValues($scope.twoSeventyClintonValues, $scope.twoSeventyTrumpValues, $scope.twoSeventy)

                                      //RealClearPolitics
                                      $scope.RealClearPolitics = subcomponentDataClean(data, 'RealClearPolitics', $scope.RealClearPolitics)
                                      $scope.clintonRealClearPoliticsForcast = getClintonForcast($scope.RealClearPolitics)
                                      $scope.TrumpRealClearPoliticsForcast = getTrumpForcast($scope.RealClearPolitics)
                                      $scope.RealClearPoliticsClintonValues = []
                                      $scope.RealClearPoliticstrumpValues = []
                                      getNeededValues($scope.RealClearPoliticsClintonValues, $scope.RealClearPoliticstrumpValues, $scope.RealClearPolitics)

                                      //PEC
                                      $scope.pec = subcomponentDataClean(data, 'PEC', $scope.pec)
                                      $scope.pecclintonForecast = getClintonForcast($scope.pec)
                                      $scope.pecTrumpForecast = getTrumpForcast($scope.pec)
                                      $scope.pecClintonValues = []
                                      $scope.pecTrumpValues = []
                                      getNeededValues($scope.pecClintonValues, $scope.pecTrumpValues, $scope.pec)



                                      indexModelsubcategory.getData()
                                        .success(function(data) {
                                          $scope.KeystotheWhiteHouse = {}
                                          $scope.IssuesandLeaders = {}
                                          $scope.bioIndex = {}
                                          $scope.bigIssue = {}
                                          $scope.issueIndex = {}

                                          separteData(data, 'Keys to the White House', $scope.KeystotheWhiteHouse)
                                          separteData(data, 'Issues and Leaders', $scope.IssuesandLeaders)
                                          separteData(data, 'Bio-index', $scope.bioIndex)
                                          separteData(data, 'Big-issue', $scope.bigIssue)
                                          separteData(data, 'Issue-index', $scope.issueIndex)

                                          // console.log($scope.KeystotheWhiteHouse.data.length)

                                          // console.log(JSON.stringify($scope.KeystotheWhiteHouse))

                                          $scope.keystowhitehouseCleanedData = cleanupData($scope.KeystotheWhiteHouse)
                                          $scope.issuesandLeadersCleanedData = cleanupData($scope.IssuesandLeaders)
                                          $scope.bioindexCleanedData = cleanupData($scope.bioIndex)
                                          $scope.bigIssue = cleanupData($scope.bigIssue)
                                          $scope.issueIndexCleanedData = cleanupData($scope.issueIndex)

                                          $scope.keystowhiteHouseClintonForcast = $scope.keystowhitehouseCleanedData[0].clinton
                                          $scope.IssuesandLeadersClintonForcast = $scope.issuesandLeadersCleanedData[0].clinton
                                          $scope.bioindexClintonForecast = $scope.bioindexCleanedData[0].clinton
                                          $scope.bigIssueClintonForecast = $scope.bigIssue[0].clinton
                                          $scope.issueIndexClintonForecast = $scope.issueIndexCleanedData[0].clinton

                                          $scope.keystowhiteHousetrumpForcast = $scope.keystowhitehouseCleanedData[0].trump
                                          $scope.issuesandLeadersTrumpForecast = $scope.issuesandLeadersCleanedData[0].trump
                                          $scope.bioindexTrumpForecast = $scope.bioindexCleanedData[0].trump
                                          $scope.bigIssueTrumpForecast = $scope.bigIssue[0].trump
                                          $scope.issueIndexTrumpForecast = $scope.issueIndexCleanedData[0].trump

                                          $scope.keystowhiteHouseClintonValues = [];
                                          $scope.issuesandleadersClintonValues = [];
                                          $scope.bioindexClintonValues = [];
                                          $scope.bigIssueClintonValues = [];
                                          $scope.issueIndexClintonValues = [];

                                          $scope.keystowhiteHouseTrumpValues = [];
                                          $scope.issuesandleadersTrumpValues = [];
                                          $scope.bioindexTrumpValues = [];
                                          $scope.bigIssueTrumpValues = [];
                                          $scope.issueIndextrumpValues = [];

                                          getNeededValues($scope.keystowhiteHouseClintonValues, $scope.keystowhiteHouseTrumpValues, $scope.keystowhitehouseCleanedData)
                                          getNeededValues($scope.issuesandleadersClintonValues, $scope.issuesandleadersTrumpValues, $scope.issuesandLeadersCleanedData)
                                          getNeededValues($scope.bioindexClintonValues, $scope.bioindexTrumpValues, $scope.bioindexCleanedData)
                                          getNeededValues($scope.bigIssueClintonValues, $scope.bigIssueTrumpValues, $scope.bigIssue)
                                          getNeededValues($scope.issueIndexClintonValues, $scope.issueIndextrumpValues, $scope.issueIndexCleanedData)



                                          // console.log(pollyvotedata)
                                          // console.log(indexModelData)
                                          // console.log(ModelsEconometricData)
                                          // console.log(expertModelsData)



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



                                          $scope.indexOnclick = function() {
                                            if ($scope.indexModel == true) {
                                              console.log('initiated')

                                              $scope.chartConfig.series[2].visible = true
                                              $scope.chartConfig.series[3].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[2].visible = false
                                              $scope.chartConfig.series[3].visible = false
                                            }


                                          }



                                          $scope.econoOnclick = function() {
                                            if ($scope.models == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[4].visible = true
                                              $scope.chartConfig.series[5].visible = true
                                              clintionTrumpValue()

                                            } else {
                                              $scope.chartConfig.series[4].visible = false
                                              $scope.chartConfig.series[5].visible = false
                                            }


                                          }



                                          $scope.expertOnclick = function() {
                                            if ($scope.expert == true) {
                                              $scope.chartConfig.series[6].visible = true
                                              $scope.chartConfig.series[7].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[6].visible = false
                                              $scope.chartConfig.series[7].visible = false
                                            }


                                          }

                                          $scope.keysOnclick = function() {
                                            if ($scope.keysWhiteHouse == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[8].visible = true
                                              $scope.chartConfig.series[9].visible = true
                                              clintionTrumpValue()

                                            } else {
                                              $scope.chartConfig.series[8].visible = false
                                              $scope.chartConfig.series[9].visible = false
                                            }


                                          }

                                          $scope.issuesOnclick = function() {
                                            if ($scope.issuesAndLeaders == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[10].visible = true
                                              $scope.chartConfig.series[11].visible = true
                                              clintionTrumpValue()
                                            } else {
                                              $scope.chartConfig.series[10].visible = false
                                              $scope.chartConfig.series[11].visible = false

                                            }


                                          }

                                          $scope.bioIndexOnclick = function() {
                                            if ($scope.bioIndex == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[12].visible = true
                                              $scope.chartConfig.series[13].visible = true
                                              clintionTrumpValue()
                                            } else {
                                              $scope.chartConfig.series[12].visible = false
                                              $scope.chartConfig.series[13].visible = false


                                            }


                                          }

                                          $scope.bigIssueOnclick = function() {
                                            if ($scope.bigIssue == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[14].visible = true
                                              $scope.chartConfig.series[15].visible = true
                                              clintionTrumpValue()
                                            } else {
                                              $scope.chartConfig.series[14].visible = false
                                              $scope.chartConfig.series[15].visible = false

                                            }


                                          }

                                          $scope.issueIndexOnclick = function() {
                                            if ($scope.issueIndex == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[16].visible = true
                                              $scope.chartConfig.series[17].visible = true
                                              clintionTrumpValue()
                                            } else {
                                              $scope.chartConfig.series[16].visible = false
                                              $scope.chartConfig.series[17].visible = false


                                            }


                                          }


                                          $scope.citizenOnclick = function() {
                                            if ($scope.citizen == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[18].visible = true
                                              $scope.chartConfig.series[19].visible = true
                                              clintionTrumpValue()

                                            } else {
                                              $scope.chartConfig.series[18].visible = false
                                              $scope.chartConfig.series[19].visible = false
                                            }


                                          }
                                          $scope.pmOnclick = function() {
                                            if ($scope.markets == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[20].visible = true
                                              $scope.chartConfig.series[21].visible = true
                                              clintionTrumpValue()

                                            } else {
                                              $scope.chartConfig.series[20].visible = false
                                              $scope.chartConfig.series[21].visible = false

                                            }


                                          }

                                          $scope.intenpollsOnclick = function() {
                                            if ($scope.aggregators == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[22].visible = true
                                              $scope.chartConfig.series[23].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[22].visible = false
                                              $scope.chartConfig.series[23].visible = false

                                            }


                                          }


                                          $scope.tpmOnclick = function() {
                                            if ($scope.tpmPolls == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[24].visible = true
                                              $scope.chartConfig.series[25].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[24].visible = false
                                              $scope.chartConfig.series[25].visible = false

                                            }


                                          }

                                          $scope.huffingstonPollsOnclick = function() {
                                            if ($scope.huffingstonPolls == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[26].visible = true
                                              $scope.chartConfig.series[27].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[26].visible = false
                                              $scope.chartConfig.series[27].visible = false

                                            }


                                          }


                                          $scope.electionProjectionOnclick = function() {
                                            if ($scope.electionProjection == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[28].visible = true
                                              $scope.chartConfig.series[29].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[28].visible = false
                                              $scope.chartConfig.series[29].visible = false

                                            }


                                          }


                                          $scope.pluspollsOnclick = function() {
                                            if ($scope.pluspolls == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[30].visible = true
                                              $scope.chartConfig.series[31].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[30].visible = false
                                              $scope.chartConfig.series[31].visible = false

                                            }


                                          }


                                          $scope.twoSeventytoWinOnclick = function() {
                                            if ($scope.twoSeventytoWin == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[32].visible = true
                                              $scope.chartConfig.series[33].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[32].visible = false
                                              $scope.chartConfig.series[33].visible = false

                                            }


                                          };


                                          $scope.RealOnclick = function() {
                                            if ($scope.Real == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[34].visible = true
                                              $scope.chartConfig.series[35].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[34].visible = false
                                              $scope.chartConfig.series[35].visible = false

                                            }


                                          };

                                          $scope.pecOnclick = function() {
                                            if ($scope.pec == true) {
                                              console.log('initiated')
                                              $scope.chartConfig.series[36].visible = true
                                              $scope.chartConfig.series[37].visible = true
                                              clintionTrumpValue()


                                            } else {
                                              $scope.chartConfig.series[36].visible = false
                                              $scope.chartConfig.series[37].visible = false

                                            }


                                          };

                                          $scope.chartConfig = {
                                            options: {
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


                                                  var s = '<h5><b>' + moment(this.x, 'x').format('MMM Do') + '</b><h5>'

                                                  $.each(this.points, function() {
                                                    var id = this.series.options.identifier

                                                    var color = function() {

                                                      if (id == 'cc') {
                                                        return "#2980b9"

                                                      } else if (id == 'tt') {
                                                        return "#e74c3c"
                                                      }
                                                    }

                                                    s += '<p  style="color:' + color() + '">' + this.series.name + ': ' +
                                                      '<span style="font-weight:bold;">' + this.y.toFixed(1) + '</span>' + '</p>';


                                                  });



                                                  return s;

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
                                                visible: true
                                              },

                                              {
                                                type: 'spline',
                                                name: 'PollyVote Combined forecasts Trump',
                                                identifier: 'tt',
                                                method: 'PollyVote Combined forecasts',
                                                color: colors[0],
                                                data: $scope.trumpValues,
                                                lineWidth: 3,
                                                visible: true
                                              }, {
                                                type: 'spline',
                                                name: 'Index Models Clinton ',
                                                identifier: 'cc',
                                                method: 'Index models',
                                                color: colors[2],
                                                data: $scope.indexClinton,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Index Models Trump',
                                                identifier: 'tt',
                                                method: 'Index models',
                                                color: colors[1],
                                                data: $scope.indexTrump,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Econometric Models Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.econoClinton,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Econometric Models Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.econoTrump,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Expert Judgment Clinton ',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.ModelsExpertClinton,
                                                lineWidth: 2,
                                                visible: false

                                              },

                                              {
                                                type: 'spline',
                                                name: 'Expert Judgment Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.ModelsExpertTrump,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Keys to White House Prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.keystowhiteHouseClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Keys to White House Prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.keystowhiteHouseTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Issues and Leaders Prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.issuesandleadersClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Issues and Leaders Prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.issuesandleadersTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Bio-index Prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.bioindexClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Bio-index Prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.bioindexTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Big-Issues Prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.bigIssueClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Big-Issues Prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.bigIssueTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Issue-index Prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.issueIndexClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Issue-index Prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.issueIndextrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Citizen Forecast for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.citizenClintonValues,
                                                lineWidth: 2,
                                                visible: false

                                              },

                                              {
                                                type: 'spline',
                                                name: 'Citizen Forecast for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.citizenTrumpValues,
                                                lineWidth: 2,
                                                visible: false

                                              }, {
                                                type: 'spline',
                                                name: 'Prediction Markets Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.predictionClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Prediction Markets Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.predictionTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Intention polls Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.pollsClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              },

                                              {
                                                type: 'spline',
                                                name: 'Intention polls Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.pollsTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'TPM Poll tracker prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.TPMClintonData,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'TPM Poll tracker prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.TPMTrumpData,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'HuffPost pollster prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.huffingstonClintonData,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'HuffPost pollster prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.huffingstonTrumpData,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Election projection prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.ClintionelectionProjection,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'Election projection prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.TrumpelectionProjection,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: '538 (polls-plus) prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.Clinton538ForecastValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: '538 (polls-plus) prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.Trump538ForecastValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: '270 to win prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.twoSeventyClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: '270 to win prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.twoSeventyTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'RealClearPolitics prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.RealClearPoliticsClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'RealClearPolitics prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.RealClearPoliticstrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'PEC prediction for Clinton',
                                                identifier: 'cc',
                                                color: colors[2],
                                                data: $scope.pecClintonValues,
                                                lineWidth: 2,
                                                visible: false
                                              }, {
                                                type: 'spline',
                                                name: 'PEC prediction for Trump',
                                                identifier: 'tt',
                                                color: colors[1],
                                                data: $scope.pecTrumpValues,
                                                lineWidth: 2,
                                                visible: false
                                              }
                                            ],

                                            title: {
                                              text: ' '
                                            },

                                            loading: false,
                                            credits: {
                                              enabled: false
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



    }
  }
})();