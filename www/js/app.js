angular.module('App', ['ionic','highcharts-ng'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs/tabs.html'
    })

    .state('tabs.rates', {
      url: '/rates',
      views: {
        'rates-tab': {
          templateUrl: 'views/rates/rates.html',
          controller: 'RatesController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/detail/:currency',
      views: {
        'rates-tab': {
          templateUrl: 'views/rates/detail.html',
          controller: 'DetailController'
        }
      }
    })

    .state('tabs.history', {
      url: '/history?currency',
      views: {
        'history-tab': {
          templateUrl: 'views/history/history.html',
          controller:  'HistoryController'
        }
      }
    })

    .state('tabs.currencies', {
      url: '/currencies',
      views: {
        'currencies-tab': {
          templateUrl: 'views/currencies/currencies.html'
        }
      }
    })

  $urlRouterProvider.otherwise('/tabs/rates');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
