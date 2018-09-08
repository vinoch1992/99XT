var app = angular.module('ViewGraph', []);
app.controller('ViewGraphController', function ($scope, $http) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    $scope.generateGraph = function () {
        if ($scope.startDate === undefined || $scope.startDate == null || $scope.endDate === undefined || $scope.endDate == null)
            alert("Date selection is required!");
        else
            $http(
                {
                    method: 'GET',
                    url: 'https://accountbalance.azurewebsites.net/api/values/' + formatDate($scope.startDate) + '/' + formatDate($scope.endDate),
                }).then(function successCallback(response) {
                    DrawChart(response);
                }, function errorCallback(response) {
                });
    };

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    function DrawChart(response) {

        //Start the drawing points for account balance
        var dataPoints = [];

        var header = ['Date', 'CEO\'s Car', 'Canteen', 'Marketing', 'ParkingFines', 'RAD'];
        dataPoints.push(header);

        for (var i = 0; i < response.data.length; i++) {
            var obj = [];
            obj.push(formatDate(response.data[i].balanceDate));
            obj.push(response.data[i].balanceCEOCar);
            obj.push(response.data[i].balanceCanteen);
            obj.push(response.data[i].balanceMarketing);
            obj.push(response.data[i].balanceParkingFines);
            obj.push(response.data[i].balanceRAD);
            dataPoints.push(obj);
        }

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(dataPoints);

            var options = {
                title: 'Balance Change over the selected period',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }
    }
});