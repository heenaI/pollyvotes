(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .directive('simpleline', simpleline);

  /** @ngInject */
  function simpleline(lineChart, csvService) {
    return {
      restrict: 'E',
      templateUrl: 'app/simplerChart/simpleCharttemplate.html',
      link: link
    };

    function link($scope, element, $document) {

      var colors = ["#e74c3c", "#f4a582", "#92c5de", "#2980b9"];

      var data = [
  {
    "Days to election": 0,
    "Date": "11/8/2016",
    "SevetyFive": 0.92,
    "Eighty": 1.03,
    "Eightyfive": 1.15,
    "ninty": 1.33,
    "nintyfive": 1.57,
    "nintynine": 2.06
  },
  {
    "Days to election": 1,
    "Date": "11/7/2016",
    "SevetyFive": 0.92,
    "Eighty": 1.03,
    "Eightyfive": 1.15,
    "ninty": 1.33,
    "nintyfive": 1.57,
    "nintynine": 2.06
  },
  {
    "Days to election": 2,
    "Date": "11/6/2016",
    "SevetyFive": 0.95,
    "Eighty": 1.05,
    "Eightyfive": 1.18,
    "ninty": 1.36,
    "nintyfive": 1.61,
    "nintynine": 2.12
  },
  {
    "Days to election": 3,
    "Date": "11/5/2016",
    "SevetyFive": 0.97,
    "Eighty": 1.08,
    "Eightyfive": 1.22,
    "ninty": 1.4,
    "nintyfive": 1.66,
    "nintynine": 2.18
  },
  {
    "Days to election": 4,
    "Date": "11/4/2016",
    "SevetyFive": 1,
    "Eighty": 1.11,
    "Eightyfive": 1.25,
    "ninty": 1.43,
    "nintyfive": 1.7,
    "nintynine": 2.23
  },
  {
    "Days to election": 5,
    "Date": "11/3/2016",
    "SevetyFive": 1.02,
    "Eighty": 1.13,
    "Eightyfive": 1.27,
    "ninty": 1.46,
    "nintyfive": 1.73,
    "nintynine": 2.28
  },
  {
    "Days to election": 6,
    "Date": "11/2/2016",
    "SevetyFive": 1.04,
    "Eighty": 1.15,
    "Eightyfive": 1.3,
    "ninty": 1.49,
    "nintyfive": 1.76,
    "nintynine": 2.32
  },
  {
    "Days to election": 7,
    "Date": "11/1/2016",
    "SevetyFive": 1.05,
    "Eighty": 1.16,
    "Eightyfive": 1.31,
    "ninty": 1.51,
    "nintyfive": 1.78,
    "nintynine": 2.34
  },
  {
    "Days to election": 8,
    "Date": "10/31/2016",
    "SevetyFive": 1.06,
    "Eighty": 1.18,
    "Eightyfive": 1.33,
    "ninty": 1.53,
    "nintyfive": 1.81,
    "nintynine": 2.38
  },
  {
    "Days to election": 9,
    "Date": "10/30/2016",
    "SevetyFive": 1.07,
    "Eighty": 1.19,
    "Eightyfive": 1.34,
    "ninty": 1.54,
    "nintyfive": 1.83,
    "nintynine": 2.4
  },
  {
    "Days to election": 10,
    "Date": "10/29/2016",
    "SevetyFive": 1.07,
    "Eighty": 1.19,
    "Eightyfive": 1.34,
    "ninty": 1.54,
    "nintyfive": 1.83,
    "nintynine": 2.4
  },
  {
    "Days to election": 11,
    "Date": "10/28/2016",
    "SevetyFive": 1.06,
    "Eighty": 1.18,
    "Eightyfive": 1.33,
    "ninty": 1.53,
    "nintyfive": 1.81,
    "nintynine": 2.38
  },
  {
    "Days to election": 12,
    "Date": "10/27/2016",
    "SevetyFive": 1.05,
    "Eighty": 1.17,
    "Eightyfive": 1.32,
    "ninty": 1.51,
    "nintyfive": 1.79,
    "nintynine": 2.36
  },
  {
    "Days to election": 13,
    "Date": "10/26/2016",
    "SevetyFive": 1.04,
    "Eighty": 1.15,
    "Eightyfive": 1.3,
    "ninty": 1.49,
    "nintyfive": 1.76,
    "nintynine": 2.32
  },
  {
    "Days to election": 14,
    "Date": "10/25/2016",
    "SevetyFive": 1.02,
    "Eighty": 1.13,
    "Eightyfive": 1.27,
    "ninty": 1.46,
    "nintyfive": 1.73,
    "nintynine": 2.28
  },
  {
    "Days to election": 15,
    "Date": "10/24/2016",
    "SevetyFive": 1.01,
    "Eighty": 1.12,
    "Eightyfive": 1.26,
    "ninty": 1.45,
    "nintyfive": 1.72,
    "nintynine": 2.26
  },
  {
    "Days to election": 16,
    "Date": "10/23/2016",
    "SevetyFive": 1,
    "Eighty": 1.11,
    "Eightyfive": 1.25,
    "ninty": 1.44,
    "nintyfive": 1.71,
    "nintynine": 2.24
  },
  {
    "Days to election": 17,
    "Date": "10/22/2016",
    "SevetyFive": 0.99,
    "Eighty": 1.1,
    "Eightyfive": 1.23,
    "ninty": 1.42,
    "nintyfive": 1.68,
    "nintynine": 2.21
  },
  {
    "Days to election": 18,
    "Date": "10/21/2016",
    "SevetyFive": 0.98,
    "Eighty": 1.09,
    "Eightyfive": 1.22,
    "ninty": 1.4,
    "nintyfive": 1.66,
    "nintynine": 2.18
  },
  {
    "Days to election": 19,
    "Date": "10/20/2016",
    "SevetyFive": 0.96,
    "Eighty": 1.07,
    "Eightyfive": 1.2,
    "ninty": 1.38,
    "nintyfive": 1.64,
    "nintynine": 2.15
  },
  {
    "Days to election": 20,
    "Date": "10/19/2016",
    "SevetyFive": 0.95,
    "Eighty": 1.06,
    "Eightyfive": 1.19,
    "ninty": 1.37,
    "nintyfive": 1.63,
    "nintynine": 2.14
  },
  {
    "Days to election": 21,
    "Date": "10/18/2016",
    "SevetyFive": 0.96,
    "Eighty": 1.06,
    "Eightyfive": 1.2,
    "ninty": 1.37,
    "nintyfive": 1.63,
    "nintynine": 2.14
  },
  {
    "Days to election": 22,
    "Date": "10/17/2016",
    "SevetyFive": 0.97,
    "Eighty": 1.08,
    "Eightyfive": 1.22,
    "ninty": 1.4,
    "nintyfive": 1.66,
    "nintynine": 2.18
  },
  {
    "Days to election": 23,
    "Date": "10/16/2016",
    "SevetyFive": 1,
    "Eighty": 1.11,
    "Eightyfive": 1.25,
    "ninty": 1.44,
    "nintyfive": 1.7,
    "nintynine": 2.24
  },
  {
    "Days to election": 24,
    "Date": "10/15/2016",
    "SevetyFive": 1.05,
    "Eighty": 1.17,
    "Eightyfive": 1.32,
    "ninty": 1.52,
    "nintyfive": 1.8,
    "nintynine": 2.36
  },
  {
    "Days to election": 25,
    "Date": "10/14/2016",
    "SevetyFive": 1.12,
    "Eighty": 1.25,
    "Eightyfive": 1.4,
    "ninty": 1.61,
    "nintyfive": 1.91,
    "nintynine": 2.51
  },
  {
    "Days to election": 26,
    "Date": "10/13/2016",
    "SevetyFive": 1.19,
    "Eighty": 1.32,
    "Eightyfive": 1.49,
    "ninty": 1.71,
    "nintyfive": 2.03,
    "nintynine": 2.67
  },
  {
    "Days to election": 27,
    "Date": "10/12/2016",
    "SevetyFive": 1.26,
    "Eighty": 1.4,
    "Eightyfive": 1.58,
    "ninty": 1.81,
    "nintyfive": 2.15,
    "nintynine": 2.83
  },
  {
    "Days to election": 28,
    "Date": "10/11/2016",
    "SevetyFive": 1.34,
    "Eighty": 1.49,
    "Eightyfive": 1.68,
    "ninty": 1.93,
    "nintyfive": 2.29,
    "nintynine": 3.01
  },
  {
    "Days to election": 29,
    "Date": "10/10/2016",
    "SevetyFive": 1.41,
    "Eighty": 1.57,
    "Eightyfive": 1.77,
    "ninty": 2.03,
    "nintyfive": 2.41,
    "nintynine": 3.16
  },
  {
    "Days to election": 30,
    "Date": "10/9/2016",
    "SevetyFive": 1.48,
    "Eighty": 1.65,
    "Eightyfive": 1.85,
    "ninty": 2.13,
    "nintyfive": 2.52,
    "nintynine": 3.31
  },
  {
    "Days to election": 31,
    "Date": "10/8/2016",
    "SevetyFive": 1.54,
    "Eighty": 1.71,
    "Eightyfive": 1.93,
    "ninty": 2.21,
    "nintyfive": 2.62,
    "nintynine": 3.45
  },
  {
    "Days to election": 32,
    "Date": "10/7/2016",
    "SevetyFive": 1.6,
    "Eighty": 1.78,
    "Eightyfive": 2,
    "ninty": 2.3,
    "nintyfive": 2.73,
    "nintynine": 3.59
  },
  {
    "Days to election": 33,
    "Date": "10/6/2016",
    "SevetyFive": 1.66,
    "Eighty": 1.85,
    "Eightyfive": 2.08,
    "ninty": 2.39,
    "nintyfive": 2.83,
    "nintynine": 3.72
  },
  {
    "Days to election": 34,
    "Date": "10/5/2016",
    "SevetyFive": 1.72,
    "Eighty": 1.91,
    "Eightyfive": 2.15,
    "ninty": 2.47,
    "nintyfive": 2.93,
    "nintynine": 3.85
  },
  {
    "Days to election": 35,
    "Date": "10/4/2016",
    "SevetyFive": 1.76,
    "Eighty": 1.96,
    "Eightyfive": 2.2,
    "ninty": 2.53,
    "nintyfive": 3,
    "nintynine": 3.94
  },
  {
    "Days to election": 36,
    "Date": "10/3/2016",
    "SevetyFive": 1.79,
    "Eighty": 2,
    "Eightyfive": 2.24,
    "ninty": 2.58,
    "nintyfive": 3.06,
    "nintynine": 4.02
  },
  {
    "Days to election": 37,
    "Date": "10/2/2016",
    "SevetyFive": 1.83,
    "Eighty": 2.04,
    "Eightyfive": 2.29,
    "ninty": 2.64,
    "nintyfive": 3.12,
    "nintynine": 4.1
  },
  {
    "Days to election": 38,
    "Date": "10/1/2016",
    "SevetyFive": 1.85,
    "Eighty": 2.06,
    "Eightyfive": 2.32,
    "ninty": 2.66,
    "nintyfive": 3.16,
    "nintynine": 4.15
  },
  {
    "Days to election": 39,
    "Date": "9/30/2016",
    "SevetyFive": 1.87,
    "Eighty": 2.09,
    "Eightyfive": 2.35,
    "ninty": 2.7,
    "nintyfive": 3.19,
    "nintynine": 4.2
  },
  {
    "Days to election": 40,
    "Date": "9/29/2016",
    "SevetyFive": 1.89,
    "Eighty": 2.1,
    "Eightyfive": 2.36,
    "ninty": 2.71,
    "nintyfive": 3.22,
    "nintynine": 4.23
  },
  {
    "Days to election": 41,
    "Date": "9/28/2016",
    "SevetyFive": 1.91,
    "Eighty": 2.12,
    "Eightyfive": 2.39,
    "ninty": 2.74,
    "nintyfive": 3.25,
    "nintynine": 4.27
  },
  {
    "Days to election": 42,
    "Date": "9/27/2016",
    "SevetyFive": 1.91,
    "Eighty": 2.13,
    "Eightyfive": 2.4,
    "ninty": 2.75,
    "nintyfive": 3.26,
    "nintynine": 4.29
  },
  {
    "Days to election": 43,
    "Date": "9/26/2016",
    "SevetyFive": 1.91,
    "Eighty": 2.13,
    "Eightyfive": 2.39,
    "ninty": 2.75,
    "nintyfive": 3.26,
    "nintynine": 4.28
  },
  {
    "Days to election": 44,
    "Date": "9/25/2016",
    "SevetyFive": 1.9,
    "Eighty": 2.12,
    "Eightyfive": 2.38,
    "ninty": 2.74,
    "nintyfive": 3.24,
    "nintynine": 4.26
  },
  {
    "Days to election": 45,
    "Date": "9/24/2016",
    "SevetyFive": 1.9,
    "Eighty": 2.11,
    "Eightyfive": 2.38,
    "ninty": 2.73,
    "nintyfive": 3.23,
    "nintynine": 4.25
  },
  {
    "Days to election": 46,
    "Date": "9/23/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.1,
    "Eightyfive": 2.36,
    "ninty": 2.71,
    "nintyfive": 3.21,
    "nintynine": 4.22
  },
  {
    "Days to election": 47,
    "Date": "9/22/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.08,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.18
  },
  {
    "Days to election": 48,
    "Date": "9/21/2016",
    "SevetyFive": 1.84,
    "Eighty": 2.05,
    "Eightyfive": 2.3,
    "ninty": 2.65,
    "nintyfive": 3.14,
    "nintynine": 4.12
  },
  {
    "Days to election": 49,
    "Date": "9/20/2016",
    "SevetyFive": 1.83,
    "Eighty": 2.03,
    "Eightyfive": 2.29,
    "ninty": 2.63,
    "nintyfive": 3.11,
    "nintynine": 4.09
  },
  {
    "Days to election": 50,
    "Date": "9/19/2016",
    "SevetyFive": 1.81,
    "Eighty": 2.02,
    "Eightyfive": 2.27,
    "ninty": 2.61,
    "nintyfive": 3.09,
    "nintynine": 4.06
  },
  {
    "Days to election": 51,
    "Date": "9/18/2016",
    "SevetyFive": 1.79,
    "Eighty": 1.99,
    "Eightyfive": 2.24,
    "ninty": 2.57,
    "nintyfive": 3.05,
    "nintynine": 4.01
  },
  {
    "Days to election": 52,
    "Date": "9/17/2016",
    "SevetyFive": 1.75,
    "Eighty": 1.95,
    "Eightyfive": 2.2,
    "ninty": 2.52,
    "nintyfive": 2.99,
    "nintynine": 3.93
  },
  {
    "Days to election": 53,
    "Date": "9/16/2016",
    "SevetyFive": 1.71,
    "Eighty": 1.9,
    "Eightyfive": 2.14,
    "ninty": 2.46,
    "nintyfive": 2.91,
    "nintynine": 3.82
  },
  {
    "Days to election": 54,
    "Date": "9/15/2016",
    "SevetyFive": 1.66,
    "Eighty": 1.85,
    "Eightyfive": 2.08,
    "ninty": 2.39,
    "nintyfive": 2.84,
    "nintynine": 3.73
  },
  {
    "Days to election": 55,
    "Date": "9/14/2016",
    "SevetyFive": 1.62,
    "Eighty": 1.81,
    "Eightyfive": 2.03,
    "ninty": 2.34,
    "nintyfive": 2.77,
    "nintynine": 3.64
  },
  {
    "Days to election": 56,
    "Date": "9/13/2016",
    "SevetyFive": 1.59,
    "Eighty": 1.77,
    "Eightyfive": 1.99,
    "ninty": 2.29,
    "nintyfive": 2.71,
    "nintynine": 3.57
  },
  {
    "Days to election": 57,
    "Date": "9/12/2016",
    "SevetyFive": 1.57,
    "Eighty": 1.75,
    "Eightyfive": 1.97,
    "ninty": 2.26,
    "nintyfive": 2.68,
    "nintynine": 3.52
  },
  {
    "Days to election": 58,
    "Date": "9/11/2016",
    "SevetyFive": 1.55,
    "Eighty": 1.72,
    "Eightyfive": 1.94,
    "ninty": 2.23,
    "nintyfive": 2.64,
    "nintynine": 3.47
  },
  {
    "Days to election": 59,
    "Date": "9/10/2016",
    "SevetyFive": 1.54,
    "Eighty": 1.71,
    "Eightyfive": 1.92,
    "ninty": 2.21,
    "nintyfive": 2.62,
    "nintynine": 3.44
  },
  {
    "Days to election": 60,
    "Date": "9/9/2016",
    "SevetyFive": 1.52,
    "Eighty": 1.69,
    "Eightyfive": 1.91,
    "ninty": 2.19,
    "nintyfive": 2.6,
    "nintynine": 3.41
  },
  {
    "Days to election": 61,
    "Date": "9/8/2016",
    "SevetyFive": 1.5,
    "Eighty": 1.67,
    "Eightyfive": 1.88,
    "ninty": 2.16,
    "nintyfive": 2.56,
    "nintynine": 3.36
  },
  {
    "Days to election": 62,
    "Date": "9/7/2016",
    "SevetyFive": 1.48,
    "Eighty": 1.64,
    "Eightyfive": 1.85,
    "ninty": 2.12,
    "nintyfive": 2.52,
    "nintynine": 3.31
  },
  {
    "Days to election": 63,
    "Date": "9/6/2016",
    "SevetyFive": 1.45,
    "Eighty": 1.61,
    "Eightyfive": 1.82,
    "ninty": 2.09,
    "nintyfive": 2.47,
    "nintynine": 3.25
  },
  {
    "Days to election": 64,
    "Date": "9/5/2016",
    "SevetyFive": 1.41,
    "Eighty": 1.57,
    "Eightyfive": 1.77,
    "ninty": 2.03,
    "nintyfive": 2.41,
    "nintynine": 3.17
  },
  {
    "Days to election": 65,
    "Date": "9/4/2016",
    "SevetyFive": 1.38,
    "Eighty": 1.54,
    "Eightyfive": 1.73,
    "ninty": 1.99,
    "nintyfive": 2.36,
    "nintynine": 3.1
  },
  {
    "Days to election": 66,
    "Date": "9/3/2016",
    "SevetyFive": 1.36,
    "Eighty": 1.52,
    "Eightyfive": 1.71,
    "ninty": 1.96,
    "nintyfive": 2.32,
    "nintynine": 3.05
  },
  {
    "Days to election": 67,
    "Date": "9/2/2016",
    "SevetyFive": 1.35,
    "Eighty": 1.5,
    "Eightyfive": 1.69,
    "ninty": 1.94,
    "nintyfive": 2.3,
    "nintynine": 3.02
  },
  {
    "Days to election": 68,
    "Date": "9/1/2016",
    "SevetyFive": 1.34,
    "Eighty": 1.49,
    "Eightyfive": 1.67,
    "ninty": 1.92,
    "nintyfive": 2.28,
    "nintynine": 2.99
  },
  {
    "Days to election": 69,
    "Date": "8/31/2016",
    "SevetyFive": 1.31,
    "Eighty": 1.45,
    "Eightyfive": 1.63,
    "ninty": 1.88,
    "nintyfive": 2.22,
    "nintynine": 2.92
  },
  {
    "Days to election": 70,
    "Date": "8/30/2016",
    "SevetyFive": 1.26,
    "Eighty": 1.4,
    "Eightyfive": 1.58,
    "ninty": 1.82,
    "nintyfive": 2.15,
    "nintynine": 2.83
  },
  {
    "Days to election": 71,
    "Date": "8/29/2016",
    "SevetyFive": 1.23,
    "Eighty": 1.37,
    "Eightyfive": 1.55,
    "ninty": 1.77,
    "nintyfive": 2.1,
    "nintynine": 2.76
  },
  {
    "Days to election": 72,
    "Date": "8/28/2016",
    "SevetyFive": 1.2,
    "Eighty": 1.33,
    "Eightyfive": 1.5,
    "ninty": 1.72,
    "nintyfive": 2.04,
    "nintynine": 2.68
  },
  {
    "Days to election": 73,
    "Date": "8/27/2016",
    "SevetyFive": 1.17,
    "Eighty": 1.3,
    "Eightyfive": 1.46,
    "ninty": 1.68,
    "nintyfive": 1.99,
    "nintynine": 2.61
  },
  {
    "Days to election": 74,
    "Date": "8/26/2016",
    "SevetyFive": 1.14,
    "Eighty": 1.27,
    "Eightyfive": 1.42,
    "ninty": 1.64,
    "nintyfive": 1.94,
    "nintynine": 2.55
  },
  {
    "Days to election": 75,
    "Date": "8/25/2016",
    "SevetyFive": 1.13,
    "Eighty": 1.26,
    "Eightyfive": 1.42,
    "ninty": 1.63,
    "nintyfive": 1.93,
    "nintynine": 2.53
  },
  {
    "Days to election": 76,
    "Date": "8/24/2016",
    "SevetyFive": 1.14,
    "Eighty": 1.27,
    "Eightyfive": 1.43,
    "ninty": 1.64,
    "nintyfive": 1.95,
    "nintynine": 2.56
  },
  {
    "Days to election": 77,
    "Date": "8/23/2016",
    "SevetyFive": 1.16,
    "Eighty": 1.29,
    "Eightyfive": 1.45,
    "ninty": 1.67,
    "nintyfive": 1.98,
    "nintynine": 2.6
  },
  {
    "Days to election": 78,
    "Date": "8/22/2016",
    "SevetyFive": 1.19,
    "Eighty": 1.33,
    "Eightyfive": 1.49,
    "ninty": 1.71,
    "nintyfive": 2.03,
    "nintynine": 2.67
  },
  {
    "Days to election": 79,
    "Date": "8/21/2016",
    "SevetyFive": 1.23,
    "Eighty": 1.36,
    "Eightyfive": 1.54,
    "ninty": 1.76,
    "nintyfive": 2.09,
    "nintynine": 2.75
  },
  {
    "Days to election": 80,
    "Date": "8/20/2016",
    "SevetyFive": 1.26,
    "Eighty": 1.4,
    "Eightyfive": 1.57,
    "ninty": 1.81,
    "nintyfive": 2.14,
    "nintynine": 2.82
  },
  {
    "Days to election": 81,
    "Date": "8/19/2016",
    "SevetyFive": 1.29,
    "Eighty": 1.44,
    "Eightyfive": 1.62,
    "ninty": 1.86,
    "nintyfive": 2.2,
    "nintynine": 2.9
  },
  {
    "Days to election": 82,
    "Date": "8/18/2016",
    "SevetyFive": 1.33,
    "Eighty": 1.48,
    "Eightyfive": 1.66,
    "ninty": 1.91,
    "nintyfive": 2.26,
    "nintynine": 2.97
  },
  {
    "Days to election": 83,
    "Date": "8/17/2016",
    "SevetyFive": 1.38,
    "Eighty": 1.53,
    "Eightyfive": 1.72,
    "ninty": 1.98,
    "nintyfive": 2.35,
    "nintynine": 3.09
  },
  {
    "Days to election": 84,
    "Date": "8/16/2016",
    "SevetyFive": 1.43,
    "Eighty": 1.59,
    "Eightyfive": 1.79,
    "ninty": 2.06,
    "nintyfive": 2.44,
    "nintynine": 3.2
  },
  {
    "Days to election": 85,
    "Date": "8/15/2016",
    "SevetyFive": 1.47,
    "Eighty": 1.63,
    "Eightyfive": 1.84,
    "ninty": 2.11,
    "nintyfive": 2.5,
    "nintynine": 3.29
  },
  {
    "Days to election": 86,
    "Date": "8/14/2016",
    "SevetyFive": 1.51,
    "Eighty": 1.68,
    "Eightyfive": 1.89,
    "ninty": 2.18,
    "nintyfive": 2.58,
    "nintynine": 3.39
  },
  {
    "Days to election": 87,
    "Date": "8/13/2016",
    "SevetyFive": 1.54,
    "Eighty": 1.72,
    "Eightyfive": 1.93,
    "ninty": 2.22,
    "nintyfive": 2.63,
    "nintynine": 3.45
  },
  {
    "Days to election": 88,
    "Date": "8/12/2016",
    "SevetyFive": 1.55,
    "Eighty": 1.73,
    "Eightyfive": 1.94,
    "ninty": 2.23,
    "nintyfive": 2.65,
    "nintynine": 3.48
  },
  {
    "Days to election": 89,
    "Date": "8/11/2016",
    "SevetyFive": 1.58,
    "Eighty": 1.76,
    "Eightyfive": 1.98,
    "ninty": 2.28,
    "nintyfive": 2.7,
    "nintynine": 3.55
  },
  {
    "Days to election": 90,
    "Date": "8/10/2016",
    "SevetyFive": 1.61,
    "Eighty": 1.8,
    "Eightyfive": 2.02,
    "ninty": 2.32,
    "nintyfive": 2.75,
    "nintynine": 3.62
  },
  {
    "Days to election": 91,
    "Date": "8/9/2016",
    "SevetyFive": 1.63,
    "Eighty": 1.82,
    "Eightyfive": 2.05,
    "ninty": 2.35,
    "nintyfive": 2.79,
    "nintynine": 3.66
  },
  {
    "Days to election": 92,
    "Date": "8/8/2016",
    "SevetyFive": 1.64,
    "Eighty": 1.83,
    "Eightyfive": 2.06,
    "ninty": 2.36,
    "nintyfive": 2.8,
    "nintynine": 3.68
  },
  {
    "Days to election": 93,
    "Date": "8/7/2016",
    "SevetyFive": 1.64,
    "Eighty": 1.82,
    "Eightyfive": 2.05,
    "ninty": 2.35,
    "nintyfive": 2.79,
    "nintynine": 3.67
  },
  {
    "Days to election": 94,
    "Date": "8/6/2016",
    "SevetyFive": 1.64,
    "Eighty": 1.82,
    "Eightyfive": 2.05,
    "ninty": 2.36,
    "nintyfive": 2.79,
    "nintynine": 3.67
  },
  {
    "Days to election": 95,
    "Date": "8/5/2016",
    "SevetyFive": 1.63,
    "Eighty": 1.82,
    "Eightyfive": 2.04,
    "ninty": 2.35,
    "nintyfive": 2.78,
    "nintynine": 3.66
  },
  {
    "Days to election": 96,
    "Date": "8/4/2016",
    "SevetyFive": 1.63,
    "Eighty": 1.82,
    "Eightyfive": 2.04,
    "ninty": 2.35,
    "nintyfive": 2.78,
    "nintynine": 3.66
  },
  {
    "Days to election": 97,
    "Date": "8/3/2016",
    "SevetyFive": 1.62,
    "Eighty": 1.8,
    "Eightyfive": 2.03,
    "ninty": 2.33,
    "nintyfive": 2.76,
    "nintynine": 3.63
  },
  {
    "Days to election": 98,
    "Date": "8/2/2016",
    "SevetyFive": 1.63,
    "Eighty": 1.81,
    "Eightyfive": 2.04,
    "ninty": 2.34,
    "nintyfive": 2.77,
    "nintynine": 3.64
  },
  {
    "Days to election": 99,
    "Date": "8/1/2016",
    "SevetyFive": 1.62,
    "Eighty": 1.81,
    "Eightyfive": 2.03,
    "ninty": 2.33,
    "nintyfive": 2.77,
    "nintynine": 3.63
  },
  {
    "Days to election": 100,
    "Date": "7/31/2016",
    "SevetyFive": 1.63,
    "Eighty": 1.82,
    "Eightyfive": 2.04,
    "ninty": 2.35,
    "nintyfive": 2.78,
    "nintynine": 3.65
  },
  {
    "Days to election": 101,
    "Date": "7/30/2016",
    "SevetyFive": 1.65,
    "Eighty": 1.84,
    "Eightyfive": 2.07,
    "ninty": 2.38,
    "nintyfive": 2.82,
    "nintynine": 3.71
  },
  {
    "Days to election": 102,
    "Date": "7/29/2016",
    "SevetyFive": 1.7,
    "Eighty": 1.89,
    "Eightyfive": 2.13,
    "ninty": 2.45,
    "nintyfive": 2.9,
    "nintynine": 3.81
  },
  {
    "Days to election": 103,
    "Date": "7/28/2016",
    "SevetyFive": 1.74,
    "Eighty": 1.93,
    "Eightyfive": 2.18,
    "ninty": 2.5,
    "nintyfive": 2.96,
    "nintynine": 3.89
  },
  {
    "Days to election": 104,
    "Date": "7/27/2016",
    "SevetyFive": 1.76,
    "Eighty": 1.96,
    "Eightyfive": 2.21,
    "ninty": 2.54,
    "nintyfive": 3.01,
    "nintynine": 3.95
  },
  {
    "Days to election": 105,
    "Date": "7/26/2016",
    "SevetyFive": 1.81,
    "Eighty": 2.01,
    "Eightyfive": 2.26,
    "ninty": 2.6,
    "nintyfive": 3.08,
    "nintynine": 4.05
  },
  {
    "Days to election": 106,
    "Date": "7/25/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.17,
    "nintynine": 4.17
  },
  {
    "Days to election": 107,
    "Date": "7/24/2016",
    "SevetyFive": 1.92,
    "Eighty": 2.14,
    "Eightyfive": 2.41,
    "ninty": 2.77,
    "nintyfive": 3.28,
    "nintynine": 4.31
  },
  {
    "Days to election": 108,
    "Date": "7/23/2016",
    "SevetyFive": 1.97,
    "Eighty": 2.19,
    "Eightyfive": 2.46,
    "ninty": 2.83,
    "nintyfive": 3.35,
    "nintynine": 4.4
  },
  {
    "Days to election": 109,
    "Date": "7/22/2016",
    "SevetyFive": 2.01,
    "Eighty": 2.23,
    "Eightyfive": 2.51,
    "ninty": 2.89,
    "nintyfive": 3.42,
    "nintynine": 4.5
  },
  {
    "Days to election": 110,
    "Date": "7/21/2016",
    "SevetyFive": 2.06,
    "Eighty": 2.29,
    "Eightyfive": 2.57,
    "ninty": 2.96,
    "nintyfive": 3.5,
    "nintynine": 4.61
  },
  {
    "Days to election": 111,
    "Date": "7/20/2016",
    "SevetyFive": 2.14,
    "Eighty": 2.38,
    "Eightyfive": 2.67,
    "ninty": 3.07,
    "nintyfive": 3.64,
    "nintynine": 4.78
  },
  {
    "Days to election": 112,
    "Date": "7/19/2016",
    "SevetyFive": 2.19,
    "Eighty": 2.44,
    "Eightyfive": 2.74,
    "ninty": 3.15,
    "nintyfive": 3.73,
    "nintynine": 4.9
  },
  {
    "Days to election": 113,
    "Date": "7/18/2016",
    "SevetyFive": 2.25,
    "Eighty": 2.5,
    "Eightyfive": 2.81,
    "ninty": 3.23,
    "nintyfive": 3.83,
    "nintynine": 5.03
  },
  {
    "Days to election": 114,
    "Date": "7/17/2016",
    "SevetyFive": 2.3,
    "Eighty": 2.56,
    "Eightyfive": 2.88,
    "ninty": 3.31,
    "nintyfive": 3.92,
    "nintynine": 5.15
  },
  {
    "Days to election": 115,
    "Date": "7/16/2016",
    "SevetyFive": 2.33,
    "Eighty": 2.59,
    "Eightyfive": 2.92,
    "ninty": 3.35,
    "nintyfive": 3.97,
    "nintynine": 5.22
  },
  {
    "Days to election": 116,
    "Date": "7/15/2016",
    "SevetyFive": 2.35,
    "Eighty": 2.62,
    "Eightyfive": 2.95,
    "ninty": 3.38,
    "nintyfive": 4.01,
    "nintynine": 5.27
  },
  {
    "Days to election": 117,
    "Date": "7/14/2016",
    "SevetyFive": 2.36,
    "Eighty": 2.63,
    "Eightyfive": 2.95,
    "ninty": 3.39,
    "nintyfive": 4.02,
    "nintynine": 5.29
  },
  {
    "Days to election": 118,
    "Date": "7/13/2016",
    "SevetyFive": 2.36,
    "Eighty": 2.63,
    "Eightyfive": 2.96,
    "ninty": 3.4,
    "nintyfive": 4.02,
    "nintynine": 5.29
  },
  {
    "Days to election": 119,
    "Date": "7/12/2016",
    "SevetyFive": 2.35,
    "Eighty": 2.62,
    "Eightyfive": 2.95,
    "ninty": 3.38,
    "nintyfive": 4.01,
    "nintynine": 5.27
  },
  {
    "Days to election": 120,
    "Date": "7/11/2016",
    "SevetyFive": 2.35,
    "Eighty": 2.62,
    "Eightyfive": 2.94,
    "ninty": 3.38,
    "nintyfive": 4,
    "nintynine": 5.26
  },
  {
    "Days to election": 121,
    "Date": "7/10/2016",
    "SevetyFive": 2.34,
    "Eighty": 2.61,
    "Eightyfive": 2.93,
    "ninty": 3.37,
    "nintyfive": 3.99,
    "nintynine": 5.25
  },
  {
    "Days to election": 122,
    "Date": "7/9/2016",
    "SevetyFive": 2.39,
    "Eighty": 2.66,
    "Eightyfive": 2.99,
    "ninty": 3.44,
    "nintyfive": 4.08,
    "nintynine": 5.36
  },
  {
    "Days to election": 123,
    "Date": "7/8/2016",
    "SevetyFive": 2.45,
    "Eighty": 2.72,
    "Eightyfive": 3.07,
    "ninty": 3.52,
    "nintyfive": 4.17,
    "nintynine": 5.48
  },
  {
    "Days to election": 124,
    "Date": "7/7/2016",
    "SevetyFive": 2.49,
    "Eighty": 2.77,
    "Eightyfive": 3.12,
    "ninty": 3.58,
    "nintyfive": 4.25,
    "nintynine": 5.58
  },
  {
    "Days to election": 125,
    "Date": "7/6/2016",
    "SevetyFive": 2.51,
    "Eighty": 2.8,
    "Eightyfive": 3.15,
    "ninty": 3.61,
    "nintyfive": 4.28,
    "nintynine": 5.63
  },
  {
    "Days to election": 126,
    "Date": "7/5/2016",
    "SevetyFive": 2.52,
    "Eighty": 2.81,
    "Eightyfive": 3.16,
    "ninty": 3.63,
    "nintyfive": 4.3,
    "nintynine": 5.65
  },
  {
    "Days to election": 127,
    "Date": "7/4/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.83,
    "Eightyfive": 3.19,
    "ninty": 3.66,
    "nintyfive": 4.34,
    "nintynine": 5.7
  },
  {
    "Days to election": 128,
    "Date": "7/3/2016",
    "SevetyFive": 2.58,
    "Eighty": 2.87,
    "Eightyfive": 3.23,
    "ninty": 3.7,
    "nintyfive": 4.39,
    "nintynine": 5.77
  },
  {
    "Days to election": 129,
    "Date": "7/2/2016",
    "SevetyFive": 2.62,
    "Eighty": 2.92,
    "Eightyfive": 3.28,
    "ninty": 3.77,
    "nintyfive": 4.47,
    "nintynine": 5.87
  },
  {
    "Days to election": 130,
    "Date": "7/1/2016",
    "SevetyFive": 2.68,
    "Eighty": 2.98,
    "Eightyfive": 3.35,
    "ninty": 3.85,
    "nintyfive": 4.56,
    "nintynine": 6
  },
  {
    "Days to election": 131,
    "Date": "6/30/2016",
    "SevetyFive": 2.74,
    "Eighty": 3.05,
    "Eightyfive": 3.43,
    "ninty": 3.94,
    "nintyfive": 4.66,
    "nintynine": 6.13
  },
  {
    "Days to election": 132,
    "Date": "6/29/2016",
    "SevetyFive": 2.8,
    "Eighty": 3.11,
    "Eightyfive": 3.5,
    "ninty": 4.02,
    "nintyfive": 4.77,
    "nintynine": 6.27
  },
  {
    "Days to election": 133,
    "Date": "6/28/2016",
    "SevetyFive": 2.86,
    "Eighty": 3.18,
    "Eightyfive": 3.58,
    "ninty": 4.11,
    "nintyfive": 4.87,
    "nintynine": 6.4
  },
  {
    "Days to election": 134,
    "Date": "6/27/2016",
    "SevetyFive": 2.94,
    "Eighty": 3.27,
    "Eightyfive": 3.68,
    "ninty": 4.23,
    "nintyfive": 5.01,
    "nintynine": 6.59
  },
  {
    "Days to election": 135,
    "Date": "6/26/2016",
    "SevetyFive": 3,
    "Eighty": 3.34,
    "Eightyfive": 3.76,
    "ninty": 4.32,
    "nintyfive": 5.12,
    "nintynine": 6.73
  },
  {
    "Days to election": 136,
    "Date": "6/25/2016",
    "SevetyFive": 3.03,
    "Eighty": 3.37,
    "Eightyfive": 3.79,
    "ninty": 4.36,
    "nintyfive": 5.16,
    "nintynine": 6.78
  },
  {
    "Days to election": 137,
    "Date": "6/24/2016",
    "SevetyFive": 3.05,
    "Eighty": 3.39,
    "Eightyfive": 3.82,
    "ninty": 4.38,
    "nintyfive": 5.19,
    "nintynine": 6.83
  },
  {
    "Days to election": 138,
    "Date": "6/23/2016",
    "SevetyFive": 3.07,
    "Eighty": 3.41,
    "Eightyfive": 3.84,
    "ninty": 4.41,
    "nintyfive": 5.23,
    "nintynine": 6.87
  },
  {
    "Days to election": 139,
    "Date": "6/22/2016",
    "SevetyFive": 3.14,
    "Eighty": 3.5,
    "Eightyfive": 3.94,
    "ninty": 4.52,
    "nintyfive": 5.36,
    "nintynine": 7.04
  },
  {
    "Days to election": 140,
    "Date": "6/21/2016",
    "SevetyFive": 3.27,
    "Eighty": 3.64,
    "Eightyfive": 4.09,
    "ninty": 4.7,
    "nintyfive": 5.57,
    "nintynine": 7.32
  },
  {
    "Days to election": 141,
    "Date": "6/20/2016",
    "SevetyFive": 3.39,
    "Eighty": 3.77,
    "Eightyfive": 4.24,
    "ninty": 4.87,
    "nintyfive": 5.77,
    "nintynine": 7.58
  },
  {
    "Days to election": 142,
    "Date": "6/19/2016",
    "SevetyFive": 3.46,
    "Eighty": 3.85,
    "Eightyfive": 4.33,
    "ninty": 4.98,
    "nintyfive": 5.9,
    "nintynine": 7.75
  },
  {
    "Days to election": 143,
    "Date": "6/18/2016",
    "SevetyFive": 3.55,
    "Eighty": 3.95,
    "Eightyfive": 4.45,
    "ninty": 5.11,
    "nintyfive": 6.05,
    "nintynine": 7.95
  },
  {
    "Days to election": 144,
    "Date": "6/17/2016",
    "SevetyFive": 3.63,
    "Eighty": 4.04,
    "Eightyfive": 4.55,
    "ninty": 5.22,
    "nintyfive": 6.19,
    "nintynine": 8.13
  },
  {
    "Days to election": 145,
    "Date": "6/16/2016",
    "SevetyFive": 3.69,
    "Eighty": 4.1,
    "Eightyfive": 4.61,
    "ninty": 5.3,
    "nintyfive": 6.28,
    "nintynine": 8.26
  },
  {
    "Days to election": 146,
    "Date": "6/15/2016",
    "SevetyFive": 3.71,
    "Eighty": 4.12,
    "Eightyfive": 4.64,
    "ninty": 5.33,
    "nintyfive": 6.32,
    "nintynine": 8.3
  },
  {
    "Days to election": 147,
    "Date": "6/14/2016",
    "SevetyFive": 3.68,
    "Eighty": 4.1,
    "Eightyfive": 4.61,
    "ninty": 5.3,
    "nintyfive": 6.28,
    "nintynine": 8.25
  },
  {
    "Days to election": 148,
    "Date": "6/13/2016",
    "SevetyFive": 3.63,
    "Eighty": 4.04,
    "Eightyfive": 4.54,
    "ninty": 5.22,
    "nintyfive": 6.18,
    "nintynine": 8.12
  },
  {
    "Days to election": 149,
    "Date": "6/12/2016",
    "SevetyFive": 3.6,
    "Eighty": 4.01,
    "Eightyfive": 4.51,
    "ninty": 5.18,
    "nintyfive": 6.13,
    "nintynine": 8.06
  },
  {
    "Days to election": 150,
    "Date": "6/11/2016",
    "SevetyFive": 3.58,
    "Eighty": 3.98,
    "Eightyfive": 4.48,
    "ninty": 5.14,
    "nintyfive": 6.1,
    "nintynine": 8.01
  },
  {
    "Days to election": 151,
    "Date": "6/10/2016",
    "SevetyFive": 3.56,
    "Eighty": 3.96,
    "Eightyfive": 4.45,
    "ninty": 5.12,
    "nintyfive": 6.06,
    "nintynine": 7.97
  },
  {
    "Days to election": 152,
    "Date": "6/9/2016",
    "SevetyFive": 3.54,
    "Eighty": 3.94,
    "Eightyfive": 4.43,
    "ninty": 5.09,
    "nintyfive": 6.03,
    "nintynine": 7.92
  },
  {
    "Days to election": 153,
    "Date": "6/8/2016",
    "SevetyFive": 3.47,
    "Eighty": 3.87,
    "Eightyfive": 4.35,
    "ninty": 5,
    "nintyfive": 5.92,
    "nintynine": 7.78
  },
  {
    "Days to election": 154,
    "Date": "6/7/2016",
    "SevetyFive": 3.38,
    "Eighty": 3.76,
    "Eightyfive": 4.23,
    "ninty": 4.86,
    "nintyfive": 5.76,
    "nintynine": 7.57
  },
  {
    "Days to election": 155,
    "Date": "6/6/2016",
    "SevetyFive": 3.27,
    "Eighty": 3.64,
    "Eightyfive": 4.09,
    "ninty": 4.7,
    "nintyfive": 5.57,
    "nintynine": 7.32
  },
  {
    "Days to election": 156,
    "Date": "6/5/2016",
    "SevetyFive": 3.19,
    "Eighty": 3.55,
    "Eightyfive": 4,
    "ninty": 4.59,
    "nintyfive": 5.44,
    "nintynine": 7.15
  },
  {
    "Days to election": 157,
    "Date": "6/4/2016",
    "SevetyFive": 3.1,
    "Eighty": 3.45,
    "Eightyfive": 3.89,
    "ninty": 4.46,
    "nintyfive": 5.29,
    "nintynine": 6.95
  },
  {
    "Days to election": 158,
    "Date": "6/3/2016",
    "SevetyFive": 3.02,
    "Eighty": 3.36,
    "Eightyfive": 3.78,
    "ninty": 4.34,
    "nintyfive": 5.14,
    "nintynine": 6.76
  },
  {
    "Days to election": 159,
    "Date": "6/2/2016",
    "SevetyFive": 2.96,
    "Eighty": 3.3,
    "Eightyfive": 3.71,
    "ninty": 4.26,
    "nintyfive": 5.05,
    "nintynine": 6.64
  },
  {
    "Days to election": 160,
    "Date": "6/1/2016",
    "SevetyFive": 2.94,
    "Eighty": 3.28,
    "Eightyfive": 3.69,
    "ninty": 4.23,
    "nintyfive": 5.02,
    "nintynine": 6.6
  },
  {
    "Days to election": 161,
    "Date": "5/31/2016",
    "SevetyFive": 2.98,
    "Eighty": 3.31,
    "Eightyfive": 3.73,
    "ninty": 4.28,
    "nintyfive": 5.07,
    "nintynine": 6.67
  },
  {
    "Days to election": 162,
    "Date": "5/30/2016",
    "SevetyFive": 3.01,
    "Eighty": 3.35,
    "Eightyfive": 3.77,
    "ninty": 4.33,
    "nintyfive": 5.13,
    "nintynine": 6.74
  },
  {
    "Days to election": 163,
    "Date": "5/29/2016",
    "SevetyFive": 3.03,
    "Eighty": 3.38,
    "Eightyfive": 3.8,
    "ninty": 4.36,
    "nintyfive": 5.17,
    "nintynine": 6.8
  },
  {
    "Days to election": 164,
    "Date": "5/28/2016",
    "SevetyFive": 3.05,
    "Eighty": 3.4,
    "Eightyfive": 3.83,
    "ninty": 4.39,
    "nintyfive": 5.21,
    "nintynine": 6.84
  },
  {
    "Days to election": 165,
    "Date": "5/27/2016",
    "SevetyFive": 3.07,
    "Eighty": 3.42,
    "Eightyfive": 3.85,
    "ninty": 4.42,
    "nintyfive": 5.24,
    "nintynine": 6.89
  },
  {
    "Days to election": 166,
    "Date": "5/26/2016",
    "SevetyFive": 3.1,
    "Eighty": 3.45,
    "Eightyfive": 3.88,
    "ninty": 4.45,
    "nintyfive": 5.28,
    "nintynine": 6.94
  },
  {
    "Days to election": 167,
    "Date": "5/25/2016",
    "SevetyFive": 3.11,
    "Eighty": 3.46,
    "Eightyfive": 3.89,
    "ninty": 4.47,
    "nintyfive": 5.3,
    "nintynine": 6.96
  },
  {
    "Days to election": 168,
    "Date": "5/24/2016",
    "SevetyFive": 3.13,
    "Eighty": 3.48,
    "Eightyfive": 3.92,
    "ninty": 4.5,
    "nintyfive": 5.33,
    "nintynine": 7
  },
  {
    "Days to election": 169,
    "Date": "5/23/2016",
    "SevetyFive": 3.15,
    "Eighty": 3.51,
    "Eightyfive": 3.95,
    "ninty": 4.54,
    "nintyfive": 5.38,
    "nintynine": 7.07
  },
  {
    "Days to election": 170,
    "Date": "5/22/2016",
    "SevetyFive": 3.18,
    "Eighty": 3.54,
    "Eightyfive": 3.98,
    "ninty": 4.57,
    "nintyfive": 5.42,
    "nintynine": 7.12
  },
  {
    "Days to election": 171,
    "Date": "5/21/2016",
    "SevetyFive": 3.22,
    "Eighty": 3.59,
    "Eightyfive": 4.04,
    "ninty": 4.64,
    "nintyfive": 5.5,
    "nintynine": 7.22
  },
  {
    "Days to election": 172,
    "Date": "5/20/2016",
    "SevetyFive": 3.28,
    "Eighty": 3.66,
    "Eightyfive": 4.11,
    "ninty": 4.72,
    "nintyfive": 5.6,
    "nintynine": 7.36
  },
  {
    "Days to election": 173,
    "Date": "5/19/2016",
    "SevetyFive": 3.33,
    "Eighty": 3.71,
    "Eightyfive": 4.17,
    "ninty": 4.79,
    "nintyfive": 5.68,
    "nintynine": 7.47
  },
  {
    "Days to election": 174,
    "Date": "5/18/2016",
    "SevetyFive": 3.38,
    "Eighty": 3.76,
    "Eightyfive": 4.23,
    "ninty": 4.86,
    "nintyfive": 5.76,
    "nintynine": 7.57
  },
  {
    "Days to election": 175,
    "Date": "5/17/2016",
    "SevetyFive": 3.41,
    "Eighty": 3.8,
    "Eightyfive": 4.28,
    "ninty": 4.91,
    "nintyfive": 5.82,
    "nintynine": 7.65
  },
  {
    "Days to election": 176,
    "Date": "5/16/2016",
    "SevetyFive": 3.44,
    "Eighty": 3.83,
    "Eightyfive": 4.3,
    "ninty": 4.94,
    "nintyfive": 5.86,
    "nintynine": 7.7
  },
  {
    "Days to election": 177,
    "Date": "5/15/2016",
    "SevetyFive": 3.45,
    "Eighty": 3.84,
    "Eightyfive": 4.32,
    "ninty": 4.96,
    "nintyfive": 5.88,
    "nintynine": 7.73
  },
  {
    "Days to election": 178,
    "Date": "5/14/2016",
    "SevetyFive": 3.45,
    "Eighty": 3.84,
    "Eightyfive": 4.32,
    "ninty": 4.97,
    "nintyfive": 5.88,
    "nintynine": 7.73
  },
  {
    "Days to election": 179,
    "Date": "5/13/2016",
    "SevetyFive": 3.44,
    "Eighty": 3.83,
    "Eightyfive": 4.31,
    "ninty": 4.95,
    "nintyfive": 5.87,
    "nintynine": 7.71
  },
  {
    "Days to election": 180,
    "Date": "5/12/2016",
    "SevetyFive": 3.42,
    "Eighty": 3.8,
    "Eightyfive": 4.28,
    "ninty": 4.91,
    "nintyfive": 5.82,
    "nintynine": 7.65
  },
  {
    "Days to election": 181,
    "Date": "5/11/2016",
    "SevetyFive": 3.38,
    "Eighty": 3.76,
    "Eightyfive": 4.23,
    "ninty": 4.86,
    "nintyfive": 5.75,
    "nintynine": 7.56
  },
  {
    "Days to election": 182,
    "Date": "5/10/2016",
    "SevetyFive": 3.33,
    "Eighty": 3.7,
    "Eightyfive": 4.17,
    "ninty": 4.79,
    "nintyfive": 5.67,
    "nintynine": 7.45
  },
  {
    "Days to election": 183,
    "Date": "5/9/2016",
    "SevetyFive": 3.29,
    "Eighty": 3.66,
    "Eightyfive": 4.12,
    "ninty": 4.73,
    "nintyfive": 5.61,
    "nintynine": 7.37
  },
  {
    "Days to election": 184,
    "Date": "5/8/2016",
    "SevetyFive": 3.26,
    "Eighty": 3.62,
    "Eightyfive": 4.08,
    "ninty": 4.68,
    "nintyfive": 5.55,
    "nintynine": 7.29
  },
  {
    "Days to election": 185,
    "Date": "5/7/2016",
    "SevetyFive": 3.19,
    "Eighty": 3.55,
    "Eightyfive": 4,
    "ninty": 4.59,
    "nintyfive": 5.44,
    "nintynine": 7.15
  },
  {
    "Days to election": 186,
    "Date": "5/6/2016",
    "SevetyFive": 3.11,
    "Eighty": 3.46,
    "Eightyfive": 3.89,
    "ninty": 4.47,
    "nintyfive": 5.3,
    "nintynine": 6.96
  },
  {
    "Days to election": 187,
    "Date": "5/5/2016",
    "SevetyFive": 3.03,
    "Eighty": 3.37,
    "Eightyfive": 3.79,
    "ninty": 4.35,
    "nintyfive": 5.16,
    "nintynine": 6.78
  },
  {
    "Days to election": 188,
    "Date": "5/4/2016",
    "SevetyFive": 2.95,
    "Eighty": 3.28,
    "Eightyfive": 3.69,
    "ninty": 4.24,
    "nintyfive": 5.02,
    "nintynine": 6.6
  },
  {
    "Days to election": 189,
    "Date": "5/3/2016",
    "SevetyFive": 2.87,
    "Eighty": 3.2,
    "Eightyfive": 3.59,
    "ninty": 4.13,
    "nintyfive": 4.89,
    "nintynine": 6.43
  },
  {
    "Days to election": 190,
    "Date": "5/2/2016",
    "SevetyFive": 2.79,
    "Eighty": 3.11,
    "Eightyfive": 3.5,
    "ninty": 4.02,
    "nintyfive": 4.76,
    "nintynine": 6.25
  },
  {
    "Days to election": 191,
    "Date": "5/1/2016",
    "SevetyFive": 2.72,
    "Eighty": 3.03,
    "Eightyfive": 3.41,
    "ninty": 3.92,
    "nintyfive": 4.64,
    "nintynine": 6.1
  },
  {
    "Days to election": 192,
    "Date": "4/30/2016",
    "SevetyFive": 2.67,
    "Eighty": 2.97,
    "Eightyfive": 3.34,
    "ninty": 3.84,
    "nintyfive": 4.55,
    "nintynine": 5.97
  },
  {
    "Days to election": 193,
    "Date": "4/29/2016",
    "SevetyFive": 2.63,
    "Eighty": 2.93,
    "Eightyfive": 3.29,
    "ninty": 3.78,
    "nintyfive": 4.48,
    "nintynine": 5.89
  },
  {
    "Days to election": 194,
    "Date": "4/28/2016",
    "SevetyFive": 2.62,
    "Eighty": 2.91,
    "Eightyfive": 3.28,
    "ninty": 3.76,
    "nintyfive": 4.46,
    "nintynine": 5.86
  },
  {
    "Days to election": 195,
    "Date": "4/27/2016",
    "SevetyFive": 2.62,
    "Eighty": 2.91,
    "Eightyfive": 3.28,
    "ninty": 3.76,
    "nintyfive": 4.46,
    "nintynine": 5.86
  },
  {
    "Days to election": 196,
    "Date": "4/26/2016",
    "SevetyFive": 2.62,
    "Eighty": 2.92,
    "Eightyfive": 3.28,
    "ninty": 3.77,
    "nintyfive": 4.47,
    "nintynine": 5.87
  },
  {
    "Days to election": 197,
    "Date": "4/25/2016",
    "SevetyFive": 2.61,
    "Eighty": 2.91,
    "Eightyfive": 3.27,
    "ninty": 3.76,
    "nintyfive": 4.46,
    "nintynine": 5.86
  },
  {
    "Days to election": 198,
    "Date": "4/24/2016",
    "SevetyFive": 2.6,
    "Eighty": 2.89,
    "Eightyfive": 3.25,
    "ninty": 3.74,
    "nintyfive": 4.43,
    "nintynine": 5.82
  },
  {
    "Days to election": 199,
    "Date": "4/23/2016",
    "SevetyFive": 2.58,
    "Eighty": 2.87,
    "Eightyfive": 3.23,
    "ninty": 3.71,
    "nintyfive": 4.4,
    "nintynine": 5.78
  },
  {
    "Days to election": 200,
    "Date": "4/22/2016",
    "SevetyFive": 2.56,
    "Eighty": 2.85,
    "Eightyfive": 3.21,
    "ninty": 3.69,
    "nintyfive": 4.37,
    "nintynine": 5.74
  },
  {
    "Days to election": 201,
    "Date": "4/21/2016",
    "SevetyFive": 2.54,
    "Eighty": 2.83,
    "Eightyfive": 3.18,
    "ninty": 3.65,
    "nintyfive": 4.33,
    "nintynine": 5.69
  },
  {
    "Days to election": 202,
    "Date": "4/20/2016",
    "SevetyFive": 2.52,
    "Eighty": 2.8,
    "Eightyfive": 3.15,
    "ninty": 3.62,
    "nintyfive": 4.29,
    "nintynine": 5.63
  },
  {
    "Days to election": 203,
    "Date": "4/19/2016",
    "SevetyFive": 2.5,
    "Eighty": 2.78,
    "Eightyfive": 3.13,
    "ninty": 3.6,
    "nintyfive": 4.26,
    "nintynine": 5.6
  },
  {
    "Days to election": 204,
    "Date": "4/18/2016",
    "SevetyFive": 2.5,
    "Eighty": 2.79,
    "Eightyfive": 3.14,
    "ninty": 3.6,
    "nintyfive": 4.27,
    "nintynine": 5.61
  },
  {
    "Days to election": 205,
    "Date": "4/17/2016",
    "SevetyFive": 2.52,
    "Eighty": 2.8,
    "Eightyfive": 3.15,
    "ninty": 3.62,
    "nintyfive": 4.29,
    "nintynine": 5.64
  },
  {
    "Days to election": 206,
    "Date": "4/16/2016",
    "SevetyFive": 2.54,
    "Eighty": 2.83,
    "Eightyfive": 3.18,
    "ninty": 3.65,
    "nintyfive": 4.33,
    "nintynine": 5.69
  },
  {
    "Days to election": 207,
    "Date": "4/15/2016",
    "SevetyFive": 2.56,
    "Eighty": 2.85,
    "Eightyfive": 3.21,
    "ninty": 3.68,
    "nintyfive": 4.36,
    "nintynine": 5.74
  },
  {
    "Days to election": 208,
    "Date": "4/14/2016",
    "SevetyFive": 2.58,
    "Eighty": 2.87,
    "Eightyfive": 3.23,
    "ninty": 3.71,
    "nintyfive": 4.4,
    "nintynine": 5.78
  },
  {
    "Days to election": 209,
    "Date": "4/13/2016",
    "SevetyFive": 2.6,
    "Eighty": 2.9,
    "Eightyfive": 3.26,
    "ninty": 3.74,
    "nintyfive": 4.43,
    "nintynine": 5.83
  },
  {
    "Days to election": 210,
    "Date": "4/12/2016",
    "SevetyFive": 2.64,
    "Eighty": 2.93,
    "Eightyfive": 3.3,
    "ninty": 3.79,
    "nintyfive": 4.49,
    "nintynine": 5.9
  },
  {
    "Days to election": 211,
    "Date": "4/11/2016",
    "SevetyFive": 2.67,
    "Eighty": 2.98,
    "Eightyfive": 3.35,
    "ninty": 3.84,
    "nintyfive": 4.56,
    "nintynine": 5.99
  },
  {
    "Days to election": 212,
    "Date": "4/10/2016",
    "SevetyFive": 2.72,
    "Eighty": 3.03,
    "Eightyfive": 3.41,
    "ninty": 3.91,
    "nintyfive": 4.64,
    "nintynine": 6.09
  },
  {
    "Days to election": 213,
    "Date": "4/9/2016",
    "SevetyFive": 2.78,
    "Eighty": 3.1,
    "Eightyfive": 3.48,
    "ninty": 4,
    "nintyfive": 4.74,
    "nintynine": 6.23
  },
  {
    "Days to election": 214,
    "Date": "4/8/2016",
    "SevetyFive": 2.85,
    "Eighty": 3.17,
    "Eightyfive": 3.57,
    "ninty": 4.1,
    "nintyfive": 4.85,
    "nintynine": 6.38
  },
  {
    "Days to election": 215,
    "Date": "4/7/2016",
    "SevetyFive": 2.92,
    "Eighty": 3.25,
    "Eightyfive": 3.66,
    "ninty": 4.2,
    "nintyfive": 4.98,
    "nintynine": 6.54
  },
  {
    "Days to election": 216,
    "Date": "4/6/2016",
    "SevetyFive": 2.99,
    "Eighty": 3.33,
    "Eightyfive": 3.75,
    "ninty": 4.3,
    "nintyfive": 5.1,
    "nintynine": 6.7
  },
  {
    "Days to election": 217,
    "Date": "4/5/2016",
    "SevetyFive": 3.05,
    "Eighty": 3.39,
    "Eightyfive": 3.82,
    "ninty": 4.39,
    "nintyfive": 5.2,
    "nintynine": 6.83
  },
  {
    "Days to election": 218,
    "Date": "4/4/2016",
    "SevetyFive": 3.09,
    "Eighty": 3.44,
    "Eightyfive": 3.88,
    "ninty": 4.45,
    "nintyfive": 5.27,
    "nintynine": 6.93
  },
  {
    "Days to election": 219,
    "Date": "4/3/2016",
    "SevetyFive": 3.13,
    "Eighty": 3.49,
    "Eightyfive": 3.92,
    "ninty": 4.51,
    "nintyfive": 5.34,
    "nintynine": 7.02
  },
  {
    "Days to election": 220,
    "Date": "4/2/2016",
    "SevetyFive": 3.15,
    "Eighty": 3.51,
    "Eightyfive": 3.95,
    "ninty": 4.53,
    "nintyfive": 5.37,
    "nintynine": 7.06
  },
  {
    "Days to election": 221,
    "Date": "4/1/2016",
    "SevetyFive": 3.17,
    "Eighty": 3.53,
    "Eightyfive": 3.97,
    "ninty": 4.56,
    "nintyfive": 5.4,
    "nintynine": 7.09
  },
  {
    "Days to election": 222,
    "Date": "3/31/2016",
    "SevetyFive": 3.17,
    "Eighty": 3.53,
    "Eightyfive": 3.97,
    "ninty": 4.56,
    "nintyfive": 5.41,
    "nintynine": 7.1
  },
  {
    "Days to election": 223,
    "Date": "3/30/2016",
    "SevetyFive": 3.18,
    "Eighty": 3.54,
    "Eightyfive": 3.98,
    "ninty": 4.57,
    "nintyfive": 5.42,
    "nintynine": 7.12
  },
  {
    "Days to election": 224,
    "Date": "3/29/2016",
    "SevetyFive": 3.18,
    "Eighty": 3.53,
    "Eightyfive": 3.98,
    "ninty": 4.57,
    "nintyfive": 5.41,
    "nintynine": 7.11
  },
  {
    "Days to election": 225,
    "Date": "3/28/2016",
    "SevetyFive": 3.15,
    "Eighty": 3.5,
    "Eightyfive": 3.94,
    "ninty": 4.53,
    "nintyfive": 5.37,
    "nintynine": 7.05
  },
  {
    "Days to election": 226,
    "Date": "3/27/2016",
    "SevetyFive": 3.12,
    "Eighty": 3.47,
    "Eightyfive": 3.91,
    "ninty": 4.49,
    "nintyfive": 5.32,
    "nintynine": 6.99
  },
  {
    "Days to election": 227,
    "Date": "3/26/2016",
    "SevetyFive": 3.09,
    "Eighty": 3.44,
    "Eightyfive": 3.87,
    "ninty": 4.44,
    "nintyfive": 5.26,
    "nintynine": 6.91
  },
  {
    "Days to election": 228,
    "Date": "3/25/2016",
    "SevetyFive": 3.05,
    "Eighty": 3.39,
    "Eightyfive": 3.81,
    "ninty": 4.38,
    "nintyfive": 5.19,
    "nintynine": 6.82
  },
  {
    "Days to election": 229,
    "Date": "3/24/2016",
    "SevetyFive": 3,
    "Eighty": 3.34,
    "Eightyfive": 3.76,
    "ninty": 4.32,
    "nintyfive": 5.12,
    "nintynine": 6.73
  },
  {
    "Days to election": 230,
    "Date": "3/23/2016",
    "SevetyFive": 2.96,
    "Eighty": 3.3,
    "Eightyfive": 3.71,
    "ninty": 4.26,
    "nintyfive": 5.05,
    "nintynine": 6.63
  },
  {
    "Days to election": 231,
    "Date": "3/22/2016",
    "SevetyFive": 2.93,
    "Eighty": 3.26,
    "Eightyfive": 3.66,
    "ninty": 4.21,
    "nintyfive": 4.99,
    "nintynine": 6.55
  },
  {
    "Days to election": 232,
    "Date": "3/21/2016",
    "SevetyFive": 2.89,
    "Eighty": 3.22,
    "Eightyfive": 3.62,
    "ninty": 4.16,
    "nintyfive": 4.93,
    "nintynine": 6.48
  },
  {
    "Days to election": 233,
    "Date": "3/20/2016",
    "SevetyFive": 2.86,
    "Eighty": 3.18,
    "Eightyfive": 3.58,
    "ninty": 4.11,
    "nintyfive": 4.87,
    "nintynine": 6.4
  },
  {
    "Days to election": 234,
    "Date": "3/19/2016",
    "SevetyFive": 2.83,
    "Eighty": 3.14,
    "Eightyfive": 3.54,
    "ninty": 4.06,
    "nintyfive": 4.82,
    "nintynine": 6.33
  },
  {
    "Days to election": 235,
    "Date": "3/18/2016",
    "SevetyFive": 2.81,
    "Eighty": 3.12,
    "Eightyfive": 3.51,
    "ninty": 4.04,
    "nintyfive": 4.78,
    "nintynine": 6.28
  },
  {
    "Days to election": 236,
    "Date": "3/17/2016",
    "SevetyFive": 2.78,
    "Eighty": 3.1,
    "Eightyfive": 3.48,
    "ninty": 4,
    "nintyfive": 4.74,
    "nintynine": 6.23
  },
  {
    "Days to election": 237,
    "Date": "3/16/2016",
    "SevetyFive": 2.75,
    "Eighty": 3.06,
    "Eightyfive": 3.45,
    "ninty": 3.96,
    "nintyfive": 4.69,
    "nintynine": 6.16
  },
  {
    "Days to election": 238,
    "Date": "3/15/2016",
    "SevetyFive": 2.7,
    "Eighty": 3.01,
    "Eightyfive": 3.38,
    "ninty": 3.88,
    "nintyfive": 4.6,
    "nintynine": 6.05
  },
  {
    "Days to election": 239,
    "Date": "3/14/2016",
    "SevetyFive": 2.68,
    "Eighty": 2.98,
    "Eightyfive": 3.35,
    "ninty": 3.85,
    "nintyfive": 4.56,
    "nintynine": 6
  },
  {
    "Days to election": 240,
    "Date": "3/13/2016",
    "SevetyFive": 2.65,
    "Eighty": 2.95,
    "Eightyfive": 3.32,
    "ninty": 3.81,
    "nintyfive": 4.52,
    "nintynine": 5.94
  },
  {
    "Days to election": 241,
    "Date": "3/12/2016",
    "SevetyFive": 2.61,
    "Eighty": 2.91,
    "Eightyfive": 3.27,
    "ninty": 3.76,
    "nintyfive": 4.46,
    "nintynine": 5.86
  },
  {
    "Days to election": 242,
    "Date": "3/11/2016",
    "SevetyFive": 2.59,
    "Eighty": 2.88,
    "Eightyfive": 3.24,
    "ninty": 3.72,
    "nintyfive": 4.41,
    "nintynine": 5.79
  },
  {
    "Days to election": 243,
    "Date": "3/10/2016",
    "SevetyFive": 2.57,
    "Eighty": 2.86,
    "Eightyfive": 3.21,
    "ninty": 3.69,
    "nintyfive": 4.38,
    "nintynine": 5.75
  },
  {
    "Days to election": 244,
    "Date": "3/9/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.84,
    "Eightyfive": 3.2,
    "ninty": 3.67,
    "nintyfive": 4.35,
    "nintynine": 5.72
  },
  {
    "Days to election": 245,
    "Date": "3/8/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.84,
    "Eightyfive": 3.19,
    "ninty": 3.67,
    "nintyfive": 4.35,
    "nintynine": 5.72
  },
  {
    "Days to election": 246,
    "Date": "3/7/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.84,
    "Eightyfive": 3.19,
    "ninty": 3.67,
    "nintyfive": 4.35,
    "nintynine": 5.71
  },
  {
    "Days to election": 247,
    "Date": "3/6/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.83,
    "Eightyfive": 3.19,
    "ninty": 3.66,
    "nintyfive": 4.34,
    "nintynine": 5.7
  },
  {
    "Days to election": 248,
    "Date": "3/5/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.84,
    "Eightyfive": 3.19,
    "ninty": 3.67,
    "nintyfive": 4.35,
    "nintynine": 5.72
  },
  {
    "Days to election": 249,
    "Date": "3/4/2016",
    "SevetyFive": 2.55,
    "Eighty": 2.84,
    "Eightyfive": 3.2,
    "ninty": 3.67,
    "nintyfive": 4.35,
    "nintynine": 5.72
  },
  {
    "Days to election": 250,
    "Date": "3/3/2016",
    "SevetyFive": 2.56,
    "Eighty": 2.85,
    "Eightyfive": 3.2,
    "ninty": 3.68,
    "nintyfive": 4.36,
    "nintynine": 5.73
  },
  {
    "Days to election": 251,
    "Date": "3/2/2016",
    "SevetyFive": 2.5,
    "Eighty": 2.78,
    "Eightyfive": 3.13,
    "ninty": 3.6,
    "nintyfive": 4.26,
    "nintynine": 5.6
  },
  {
    "Days to election": 252,
    "Date": "3/1/2016",
    "SevetyFive": 2.46,
    "Eighty": 2.73,
    "Eightyfive": 3.07,
    "ninty": 3.53,
    "nintyfive": 4.18,
    "nintynine": 5.5
  },
  {
    "Days to election": 253,
    "Date": "2/29/2016",
    "SevetyFive": 2.41,
    "Eighty": 2.68,
    "Eightyfive": 3.02,
    "ninty": 3.46,
    "nintyfive": 4.1,
    "nintynine": 5.39
  },
  {
    "Days to election": 254,
    "Date": "2/28/2016",
    "SevetyFive": 2.36,
    "Eighty": 2.63,
    "Eightyfive": 2.96,
    "ninty": 3.4,
    "nintyfive": 4.03,
    "nintynine": 5.29
  },
  {
    "Days to election": 255,
    "Date": "2/27/2016",
    "SevetyFive": 2.31,
    "Eighty": 2.57,
    "Eightyfive": 2.9,
    "ninty": 3.33,
    "nintyfive": 3.94,
    "nintynine": 5.18
  },
  {
    "Days to election": 256,
    "Date": "2/26/2016",
    "SevetyFive": 2.26,
    "Eighty": 2.52,
    "Eightyfive": 2.83,
    "ninty": 3.25,
    "nintyfive": 3.85,
    "nintynine": 5.07
  },
  {
    "Days to election": 257,
    "Date": "2/25/2016",
    "SevetyFive": 2.21,
    "Eighty": 2.46,
    "Eightyfive": 2.76,
    "ninty": 3.17,
    "nintyfive": 3.76,
    "nintynine": 4.94
  },
  {
    "Days to election": 258,
    "Date": "2/24/2016",
    "SevetyFive": 2.15,
    "Eighty": 2.39,
    "Eightyfive": 2.69,
    "ninty": 3.09,
    "nintyfive": 3.67,
    "nintynine": 4.82
  },
  {
    "Days to election": 259,
    "Date": "2/23/2016",
    "SevetyFive": 2.09,
    "Eighty": 2.32,
    "Eightyfive": 2.61,
    "ninty": 3,
    "nintyfive": 3.56,
    "nintynine": 4.68
  },
  {
    "Days to election": 260,
    "Date": "2/22/2016",
    "SevetyFive": 2.03,
    "Eighty": 2.26,
    "Eightyfive": 2.54,
    "ninty": 2.92,
    "nintyfive": 3.45,
    "nintynine": 4.54
  },
  {
    "Days to election": 261,
    "Date": "2/21/2016",
    "SevetyFive": 1.98,
    "Eighty": 2.2,
    "Eightyfive": 2.48,
    "ninty": 2.84,
    "nintyfive": 3.37,
    "nintynine": 4.43
  },
  {
    "Days to election": 262,
    "Date": "2/20/2016",
    "SevetyFive": 1.93,
    "Eighty": 2.14,
    "Eightyfive": 2.41,
    "ninty": 2.77,
    "nintyfive": 3.28,
    "nintynine": 4.31
  },
  {
    "Days to election": 263,
    "Date": "2/19/2016",
    "SevetyFive": 1.87,
    "Eighty": 2.08,
    "Eightyfive": 2.34,
    "ninty": 2.69,
    "nintyfive": 3.18,
    "nintynine": 4.18
  },
  {
    "Days to election": 264,
    "Date": "2/18/2016",
    "SevetyFive": 1.81,
    "Eighty": 2.02,
    "Eightyfive": 2.27,
    "ninty": 2.61,
    "nintyfive": 3.09,
    "nintynine": 4.06
  },
  {
    "Days to election": 265,
    "Date": "2/17/2016",
    "SevetyFive": 1.81,
    "Eighty": 2.02,
    "Eightyfive": 2.27,
    "ninty": 2.61,
    "nintyfive": 3.09,
    "nintynine": 4.06
  },
  {
    "Days to election": 266,
    "Date": "2/16/2016",
    "SevetyFive": 1.82,
    "Eighty": 2.03,
    "Eightyfive": 2.28,
    "ninty": 2.62,
    "nintyfive": 3.11,
    "nintynine": 4.09
  },
  {
    "Days to election": 267,
    "Date": "2/15/2016",
    "SevetyFive": 1.85,
    "Eighty": 2.06,
    "Eightyfive": 2.31,
    "ninty": 2.66,
    "nintyfive": 3.15,
    "nintynine": 4.14
  },
  {
    "Days to election": 268,
    "Date": "2/14/2016",
    "SevetyFive": 1.87,
    "Eighty": 2.09,
    "Eightyfive": 2.35,
    "ninty": 2.7,
    "nintyfive": 3.19,
    "nintynine": 4.2
  },
  {
    "Days to election": 269,
    "Date": "2/13/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.09,
    "Eightyfive": 2.35,
    "ninty": 2.7,
    "nintyfive": 3.2,
    "nintynine": 4.2
  },
  {
    "Days to election": 270,
    "Date": "2/12/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.09,
    "Eightyfive": 2.36,
    "ninty": 2.71,
    "nintyfive": 3.21,
    "nintynine": 4.22
  },
  {
    "Days to election": 271,
    "Date": "2/11/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.09,
    "Eightyfive": 2.36,
    "ninty": 2.71,
    "nintyfive": 3.21,
    "nintynine": 4.21
  },
  {
    "Days to election": 272,
    "Date": "2/10/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.09,
    "Eightyfive": 2.36,
    "ninty": 2.71,
    "nintyfive": 3.21,
    "nintynine": 4.21
  },
  {
    "Days to election": 273,
    "Date": "2/9/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.09,
    "Eightyfive": 2.35,
    "ninty": 2.7,
    "nintyfive": 3.2,
    "nintynine": 4.21
  },
  {
    "Days to election": 274,
    "Date": "2/8/2016",
    "SevetyFive": 1.88,
    "Eighty": 2.09,
    "Eightyfive": 2.35,
    "ninty": 2.7,
    "nintyfive": 3.2,
    "nintynine": 4.2
  },
  {
    "Days to election": 275,
    "Date": "2/7/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 276,
    "Date": "2/6/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 277,
    "Date": "2/5/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 278,
    "Date": "2/4/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 279,
    "Date": "2/3/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 280,
    "Date": "2/2/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 281,
    "Date": "2/1/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 282,
    "Date": "1/31/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 283,
    "Date": "1/30/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 284,
    "Date": "1/29/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 285,
    "Date": "1/28/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 286,
    "Date": "1/27/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 287,
    "Date": "1/26/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 288,
    "Date": "1/25/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 289,
    "Date": "1/24/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 290,
    "Date": "1/23/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 291,
    "Date": "1/22/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 292,
    "Date": "1/21/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 293,
    "Date": "1/20/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 294,
    "Date": "1/19/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 295,
    "Date": "1/18/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 296,
    "Date": "1/17/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 297,
    "Date": "1/16/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 298,
    "Date": "1/15/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 299,
    "Date": "1/14/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 300,
    "Date": "1/13/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 301,
    "Date": "1/12/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 302,
    "Date": "1/11/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 303,
    "Date": "1/10/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 304,
    "Date": "1/9/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 305,
    "Date": "1/8/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 306,
    "Date": "1/7/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 307,
    "Date": "1/6/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 308,
    "Date": "1/5/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  },
  {
    "Days to election": 309,
    "Date": "1/4/2016",
    "SevetyFive": 1.86,
    "Eighty": 2.07,
    "Eightyfive": 2.33,
    "ninty": 2.68,
    "nintyfive": 3.18,
    "nintynine": 4.17
  }
]



      $scope.confidenceIntervals = [{
        name: '75% confidence',
        model: 'Seventyfive'
      }, {
        name: '80% confidence',
        model: 'eighty'
      }, {
        name: '85% confidence',
        model: 'eightyfive'
      }, {
        name: '90% confidence',
        model: 'ninty'
      }, {
        name: '95% confidence',
        model: 'nintyfive'
      }, {
        name: '99% confidence',
        model: 'nintynine'
      }]


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
              chart: {
                height: 350
              },
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
                    if (this.point.low || this.point.high) {
                      s += '<br/>' +
                        '<tr><td class = "tooltipvalue" style="color: ' + createColor(this.series) + '">' +
                        this.series.name + ': ' +
                        '<br>' +

                        'Low:' + ' ' + '<b>' + this.point.low.toFixed(1) + '</b><br>' +
                        'High:' + ' ' + '<b>' + this.point.high.toFixed(1) + '</b>'
                      '</td></tr>';
                    } else {
                      s += '<br/>' +
                        '<tr><td class = "tooltipvalue" style="color: ' + createColor(this.series) + '">' +
                        this.series.name + ': ' +

                        this.y.toFixed(1) +
                        '</td></tr>';

                    }


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

         

          $scope.addpollyVote = function() {
            if ($scope.pollyVote == true) {
              seriesShow(0, 1)

            } else if ($scope.pollyVote == false) {
              seriesHide(0, 1)
            }
          }

          function joiningData(data, name, container) {
            var datajoined = $scope.clintonValues.slice().map(function(el) {
              for (var i = 0, l = data.length; i < l; i++) {
                if (el[0] === Date.parse(new Date(data[i].Date))) {
                  el.date = Date.parse(new Date(data[i].Date))
                  el.value = data[i].value
                }
              }

              container.push([el.date, el[1] - parseFloat(el.value), el[1] + parseFloat(el.value)]);
            });
          }
         
         var csvData = data;

          function cleancsvData(data) {
            $scope.uncertinatiyClinton = []
            $scope.uncertainityTrump = []
            $scope.eightyClinton = []
            $scope.eightyTrump = []
            $scope.eightyFiveClinton = []
            $scope.eightyFiveTrump = []
            $scope.nintyClinton = []
            $scope.nintyTrump = []
            $scope.nintyFiveClinton = []
            $scope.nintyFiveTrump = []
            $scope.nintyNineClinton = []
            $scope.nintyNineTrump = []

            // joiningData(data, 'SevetyFive', $scope.uncertinatiyClinton)
            // joiningData(data, 'SevetyFive', $scope.uncertainityTrump)

            var datajoined = $scope.clintonValues.slice().map(function(el) {
              
              for (var i = 0, l = data.length; i < l; i++) {
                if (el[0] === Date.parse(new Date(data[i].Date))) {
                  el.date = Date.parse(new Date(data[i].Date))
                  el.valueSeventyFive = data[i].SevetyFive
                  el.valueEighty = data[i].Eighty
                  el.valueEightyFive = data[i].Eightyfive
                  el.valueNinty = data[i].ninty
                  el.valueNintyFive = data[i].nintyfive
                  el.nintyNine = data[i].nintynine
                }
              }

              $scope.uncertinatiyClinton.push([el.date, el[1] - parseFloat(el.valueSeventyFive), el[1] + parseFloat(el.valueSeventyFive)]);
              $scope.eightyClinton.push([el.date, el[1] - parseFloat(el.valueEighty), el[1] + parseFloat(el.valueEighty)])
              $scope.eightyFiveClinton.push([el.date, el[1] - parseFloat(el.valueEightyFive), el[1] + parseFloat(el.valueEightyFive)])
              $scope.nintyClinton.push([el.date, el[1] - parseFloat(el.valueNinty), el[1] + parseFloat(el.valueNinty)])
              $scope.nintyFiveClinton.push([el.date, el[1] - parseFloat(el.valueNintyFive), el[1] + parseFloat(el.valueNintyFive)])
              $scope.nintyNineClinton.push([el.date, el[1] - parseFloat(el.nintyNine), el[1] + parseFloat(el.nintyNine)])
            });


            var datajoined = $scope.trumpValues.slice().map(function(el) {
              for (var i = 0, l = data.length; i < l; i++) {
                if (el[0] === Date.parse(new Date(data[i].Date))) {
                  el.date = Date.parse(new Date(data[i].Date))
                  el.valueSeventyFive = data[i].SevetyFive
                  el.valueEighty = data[i].Eighty
                  el.valueEightyFive = data[i].Eightyfive
                  el.valueNinty = data[i].ninty
                  el.valueNintyFive = data[i].nintyfive
                  el.nintyNine = data[i].nintynine
                }
              }
              $scope.uncertainityTrump.push([el.date, el[1] - parseFloat(el.valueSeventyFive), el[1] + parseFloat(el.valueSeventyFive)]);
              $scope.eightyTrump.push([el.date, el[1] - parseFloat(el.valueEighty), el[1] + parseFloat(el.valueEighty)])
              $scope.eightyFiveTrump.push([el.date, el[1] - parseFloat(el.valueEightyFive), el[1] + parseFloat(el.valueEightyFive)])
              $scope.nintyTrump.push([el.date, el[1] - parseFloat(el.valueNinty), el[1] + parseFloat(el.valueNinty)])
              $scope.nintyFiveTrump.push([el.date, el[1] - parseFloat(el.valueNintyFive), el[1] + parseFloat(el.valueNintyFive)])
              $scope.nintyNineTrump.push([el.date, el[1] - parseFloat(el.nintyNine), el[1] + parseFloat(el.nintyNine)])
            });


            chart.addSeries({
              type: 'arearange',
              name: '75% confidence Clinton',
              identifier: 'cc',
              color: colors[2],
              data: $scope.uncertinatiyClinton,
              lineWidth: 0,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '75% confidence Trump',
              identifier: 'tt',
              color: colors[1],
              lineWidth: 0,
              data: $scope.uncertainityTrump,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '80% confidence Clinton',
              identifier: 'cc',
              color: colors[2],
              data: $scope.eightyClinton,
              lineWidth: 0,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '80% confidence Trump',
              identifier: 'tt',
              color: colors[1],
              lineWidth: 0,
              data: $scope.eightyTrump,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '85% confidence Clinton',
              identifier: 'cc',
              color: colors[2],
              data: $scope.eightyFiveClinton,
              lineWidth: 0,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '85% confidence Trump',
              identifier: 'tt',
              color: colors[1],
              lineWidth: 0,
              data: $scope.eightyFiveTrump,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '90% confidence Clinton',
              identifier: 'cc',
              color: colors[2],
              data: $scope.nintyClinton,
              lineWidth: 0,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '90% confidence Trump',
              identifier: 'tt',
              color: colors[1],
              lineWidth: 0,
              data: $scope.nintyTrump,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })
            chart.addSeries({
              type: 'arearange',
              name: '95% confidence Clinton',
              identifier: 'cc',
              color: colors[2],
              data: $scope.nintyFiveClinton,
              lineWidth: 0,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '95% confidence Trump',
              identifier: 'tt',
              color: colors[1],
              lineWidth: 0,
              data: $scope.nintyFiveTrump,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })
            chart.addSeries({
              type: 'arearange',
              name: '99% confidence Clinton',
              identifier: 'cc',
              color: colors[2],
              data: $scope.nintyNineClinton,
              lineWidth: 0,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })

            chart.addSeries({
              type: 'arearange',
              name: '99% confidence Trump',
              identifier: 'tt',
              color: colors[1],
              lineWidth: 0,
              data: $scope.nintyNineTrump,
              visible: false,
              zIndex: 0,
              fillOpacity: 0.3
            })


          }




          function clintionTrumpValue() {
            if ($scope.trumpValues == true) {
              showOnlyTrumpValues()

            } else if ($scope.clintonValues == true) {
              showOnlyClintonValues();

            }
          }

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

           function seriesShow(a, b) {
            chart.series[a].show()
            chart.series[b].show()

            for(var i = 0; i < chart.series.length; i++){
              if(chart.series[i]!=chart.series[a] && chart.series[i]!=chart.series[b] && chart.series[i]!=chart.series[0] && chart.series[i]!=chart.series[1]){
               chart.series[i].hide()
              }
            }
          }

          function seriesHide(a, b) {
            chart.series[a].hide()
            chart.series[b].hide()
          }



          function showValues(nameLocation) {

            var clinton = nameLocation + ' ' + 'Clinton'
            var trump = nameLocation + ' ' + 'Trump'
            var indexClinton = chart.series.findIndex(function(x) {
              return x.name == clinton
            })
            var indexTrump = chart.series.findIndex(function(x) {
              return x.name == trump
            })
            seriesShow(indexClinton, indexTrump)
            clintionTrumpValue()

          }

          function hideValues(nameLocation) {

            var clinton = nameLocation + ' ' + 'Clinton'
            var trump = nameLocation + ' ' + 'Trump'
            var indexClinton = chart.series.findIndex(function(x) {
              return x.name == clinton
            })
            var indexTrump = chart.series.findIndex(function(x) {
              return x.name == trump
            })
            seriesHide(indexClinton, indexTrump)
            clintionTrumpValue()


          }


          $scope.onChangeIntervals = function() {
            var i;

            for (i = 0; i < $scope.confidenceIntervals.length; i++) {
              if ($scope.selected.name==$scope.confidenceIntervals[i].name) {
                showValues($scope.confidenceIntervals[i].name)

              }

            }

          };


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



          $scope.addOnlyTrump = function(key) {
            var chart = $('#container').highcharts()


            if ($scope.trumpValues == true) {
              $scope.clintonValues = false
              $scope.addpollyVote()
              $scope.onChangeIntervals()
              showOnlyTrumpValues();

            } else {
              $scope.addpollyVote();
              $scope.onChangeIntervals()


            };
          }



          $scope.addOnlyClinton = function(key) {
            var chart = $('#container').highcharts()
            if ($scope.clintonValues == true) {
              $scope.trumpValues = false
              $scope.addpollyVote();
              $scope.onChangeIntervals()
              showOnlyClintonValues()


            } else {
              $scope.addpollyVote();
              $scope.onChangeIntervals()



            }

          };


          var csvData = data;

          cleancsvData(data)
        });



    }
  }
})();