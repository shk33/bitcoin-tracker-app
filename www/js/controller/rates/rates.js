angular.module('App')
.controller('RatesController', function ($scope, $http, Currencies, $ionicLoading) {
  $scope.currencies = Currencies;

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
    });
  };

  $scope.getBitcoinRates();
});