var app = angular.module('ViewStatement', []);
app.controller('ViewStatementController', function ($scope, $http) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    $http(
        {
            method: 'GET',
            url: 'https://accountbalance.azurewebsites.net/api/values/',
        }).then(function successCallback(response) {
            $scope.statement = response.data;
            $scope.statement.balanceDate = monthNames[new Date().getUTCMonth()] + " " + new Date().getUTCFullYear();
        }, function errorCallback(response) {

        });
});