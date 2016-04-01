angular.module('App')
.controller('RatesController', function ($scope, $http, Currencies, $ionicLoading, $ionicPopover) {
  $scope.currencies = Currencies;

  $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

  $scope.openHelp = function ($event) {
    $scope.popover.show($event);
  };

  $scope.$on('$destroy', function () {
    $scope.popover.remove();
  });

  $scope.getBitcoinRates = function () {
    $http.get('https://api.bitcoinaverage.com/ticker/all')
    .success(function (tickers) {
      angular.forEach($scope.currencies, function (currency) {
        currency.ticker = tickers[currency.code];
        if (currency.ticker) {
          currency.ticker.timestamp = new Date(currency.ticker.timestamp);
        }
      });
    })
    .error(function (err) {
      $ionicLoading.show({
        template: "An error ocurred. Please try again later",
        duration: 3000
      });
      console.log(err);
    })
    .finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.getBitcoinRates();
});