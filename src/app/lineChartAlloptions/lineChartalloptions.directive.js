(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .directive('line', line);

  /** @ngInject */
  function line(lineChart) {
    return {
      restrict: 'E',
      templateUrl: "app/lineChartAlloptions/lineChart.html",
      link: link
    };

    function link($scope, element) {

      //highcharts charts
      function createCharts(DataforcastClinton, DataForcastTrump) {

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
            color: '#2980b9',
            data: DataforcastClinton,
            pointStart: Date.UTC(2016, 3, 9),
            marker: {
              symbol: 'circle'
            }
          }, {
            name: 'Trump',
            color: '#e74c3c',
            data: DataForcastTrump,
            pointStart: Date.UTC(2016, 3, 9),
            marker: {
              symbol: 'circle'
            }
          }],

          title: {
            text: ' '
          },

          loading: false
        };


      }

      function parseValues(data) {
        if (typeof(data) == 'string') {
          var value = parseFloat(data)
          return value.toFixed(1)
        } else {
          return data.toFixed(1)
        }
      }


      lineChart.getData()
        .success(function(data) {
          var convertedData = []

          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].fcdemvs != 0 && data.data[i].fcrepvs != 0) {
              var date = data.data[i]._lastupdate;
              var utcSeconds = date;
              var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
              var newDate = new Date(d.setUTCSeconds(utcSeconds));

              var ClintonValues = parseValues(data.data[i].fcdemvs)
              var TrumpValues = parseValues(data.data[i].fcrepvs)
              convertedData.push({
                "clinton": ClintonValues,
                "trump": TrumpValues,
                "date": newDate
              })


            }
          }

          //rearrange if dates are mixed up 

          var rearrangedData = convertedData.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
          });

          $scope.clintonValues = [];
          $scope.trumpValues = [];
          console.log(rearrangedData)

          for (var i = 0; i < rearrangedData.length; i++) {
            $scope.clintonValues.push([Date.parse(rearrangedData[i].date), parseFloat(rearrangedData[i].clinton)])
            $scope.trumpValues.push([Date.parse(rearrangedData[i].date), parseFloat(rearrangedData[i].trump)])
          }

          console.log(JSON.stringify($scope.clintonValues))
          createCharts($scope.clintonValues, $scope.trumpValues)



        });



    }
  }
})();