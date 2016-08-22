(function() {
  'use strict';

  angular
    .module('pollyvotes')
    .config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider, tmhDynamicLocaleProvider, cfpLoadingBarProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');
    // Enable log
    $logProvider.debugEnabled(true);
    // enable translation
    $translateProvider.translations('en', {
    'TITLE': 'U.S. Presidential Election ',
    'titleDiscription': 'This site provides a research-based prediction which you can embed on your own website for free',
    'cardTitleOne': 'Predicting which party will win. Updated daily',
    'chartTwoHeading': 'Predicting the winner in each U.S. State',
    'chartFourHeading': 'Election analytics as newsletter',
    'chartFiveHeading': 'What is PollyVote? And who is behind this?',
    'greyTextForChart': 'Embedding and sharing is free for everyone. The content is dynamic, i.e. numbers and text change in accordance with the data. If you are curious about controversial developments, check out the ',
    'blog': 'blog',
    'chartSource': 'Source:',
    'embed': 'EMBED',
    'latestPrediction': 'Latest prediction',
    'updatedDaily': 'updated daily',
    'prefixDate': ' ',
    'democrats': 'Clinton:',
    'republicans': 'Trump:',
    'checkBoxText30day': 'Last 30 days',
    'checkBoxTextWholeTimeline': 'Election timeline',
    'chart2Heading': 'Past predictions by PollyVote',
    'chart2Discription': "The PollyVote method predicted the candidate's final vote shares in the last three U.S. presidential elections with little error. The following table shows the predicted and actual results of the two-party popular vote.",
    "year": "Year",
    "winner": "winner",
    "actResult": "ACTUAL RESULT",
    "finalFore": "FINAL FORECAST",
    "oneMonth": "1 MONTH BEFORE ELECTION",
    "threeMonth": "3 MONTHS BEFORE ELECTION",
    "chartThreeHeading": "Election Analytics as Newsletter",
    "chartThreeDiscription": "This website will send out regular newsletters to keep you updated on how the predictions change over time. Are you interested?",
    "subsText": "Subscribe to our mailing list",
    "emailAdd": "email address",
    "Subscribe": "Subscribe",
    "aboutSectionHeading": "What is PollyVote? And who is behind this?",
    "aboutSectionDiscription": "The visualizations are based on PollyVote, a forecasting project founded in 2004 by scholars from different academic fields. The PollyVote draws on hundreds of single forecasts to predict the popular vote on national and state level. PollyVote was successfully applied to the last three U.S. presidential elections, predicting accurately the winning party. For more information with regards to the methodology, please refer to the ",
    "predictionError": "Prediction Error",
    "withDate": "{{date| date}}",
    "embedText": "Embed the following link to show chart in your webpage. Embedding and sharing is free for everyone. The content is dynamic, i.e. numbers and text change in accordance with the data.",
    "twitterTextLineChart": "@PollyVote forecast of the #2016election:",
    "historyChartText": "Accuracy of prediction model PollyVote for U.S. presidential election 2004, 2008 & 2012",
    "website": "official PollyVote website."
  });

  $translateProvider.translations('de', {
    'TITLE': 'US-Präsidentschaftswahl ',
    'titleDiscription': 'Auf dieser Seite finden Sie wissenschaftliche Prognosen zur Wahl. Sie können die Charts frei teilen und auf Ihrer Webseite einbinden.',
    'cardTitleOne': 'Welche Partei wird gewinnen?',
    'chartTwoHeading': 'Prognose des Wahlsiegers je Staat',
    'chartFourHeading': 'Wahlanalysen als Newsletter',
    'chartFiveHeading': 'Was ist PollyVote? Wer steckt dahinter?',
    'greyTextForChart': 'Das Teilen und Einbetten der Charts ist  kostenfrei. Sowohl der Text als auch die Zahlen sind dynamisch, d.h. sie werden auch nach dem Einbetten aktualisiert. Berichte über einzelne Prognosen finden Sie im ',
    'chartSource': 'Quelle:',
    'chart2Heading': 'Frühere Prognose von PollyVote',
    'embed': 'EINBETTEN',
    'latestPrediction': 'Aktuelle Prognose',
    'updatedDaily': 'wird täglich aktualisiert',
    'prefixDate': 'der',
    'democrats': 'Clinton:',
    'republicans': 'Trump:',
    'checkBoxText30day': '30-Tage-Prognose',
    'checkBoxTextWholeTimeline': 'Wahlchronik',
    'chart2Hading': 'Frühere Prognosen',
    'chart2Discription': "Bereits zu den vergangenen drei US-Präsidentschaftswahlen wurde PollyVote eingesetzt und konnte die tatsächliche Stimmenverteilung mit einer geringen Fehlermarge vorhersagen. Die folgende Tabelle zeigt die prognostizierten und tatsächlichen Wahlergebnisse.",
    "year": "Jahr",
    "winner": "Sieger",
    "actResult": "Offizielles Ergebnis",
    "finalFore": "Finale Prognose",
    "oneMonth": "1 Monat vor Wahl",
    "threeMonth": "3 Monate vor Wahl",
    "chartThreeHeading": "Wahlanalysen als Newsletter",
    "chartThreeDiscription": "Sobald der Dienst eingerichtet ist, halten wir Sie mit einem automatisierten Newsletter auf den Laufenden. Themen sind die Entwicklungen der PollyVote-Prognose als auch aktuelle Vorhersagen anderer Prognosemethoden. Besteht Interesse? ",
    "subsText": "Hinterlassen Sie Ihre Email-Adresse, sodass wir Sie benachrichtigen können, sobald es los geht. ",
    "emailAdd": "Email-Adresse",
    "Subscribe": "Abonnieren",
    "aboutSectionHeading": "Über uns",
    "aboutSectionDiscription": "Die Visualisierungen basieren auf Prognosen von PollyVote,  ein Projekt, das 2004 von amerikanischen Politikwissenschaftlern und Prognoseexperten ins Leben gerufen wurde. Das Model greift auf hunderte einzelne Vorhersagen zurück, um die Stimmenverteilung in den jeweiligen Bundesstaaten bzw. im Land zu prognostizieren. Bereits in den vergangenen drei US-Präsidentschaftswahlen wurde PollyVote eingesetzt und konnte die siegende Partei bereits Monate vor der Wahl präzise vorhersagen. Mehr Informationen zur Methodik und zum wissenschaftlichen Hintergrund von PollyVote finden Sie auf",
    "predictionError": "Vorhersagefehler",
    "withDate": "{{date|date }}",
    "embedText": "Das Teilen und Einbetten der Charts ist  kostenfrei. Sowohl der Text als auch die Zahlen sind dynamisch, d.h. sie werden auch nach dem Einbetten stetig aktualisiert.",
    "twitterTextLineChart": "@PollyVote Prognose zur #USWahl:",
    "historyChartText": "Frühere Prognosen: 2004, 2008 & 2012 #Präsidentschaftswahlen USA 2016",
    "website": "der offiziellen PollyVote Webseite."

  });

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);

  //config loading bar
  cfpLoadingBarProvider.latencyThreshold = 100;
  cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
  cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"> Loading Pollyvote Map....</div>';
  }

})();
