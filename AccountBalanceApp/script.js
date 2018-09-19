var accountBalance = angular.module('accountbalance', ['ngRoute']);

accountBalance.config(function ($routeProvider) {
    $routeProvider

        .when('/uploadstatement', {
            templateUrl: 'pages/uploadstatement.html',
            controller: 'uploadController'
        })

        .when('/viewstatement', {
            templateUrl: 'pages/viewstatement.html',
            controller: 'viewController'
        })

        .when('/viewgraph', {
            templateUrl: 'pages/viewgraph.html',
            controller: 'graphController'
        });
});

accountBalance.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

accountBalance.controller('uploadController', function ($scope, $http) {
    $scope.uploadFile = function () {
        var oFile = event.target.files;
        var files = oFile;
        var i, f;

        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;
                var result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function (y) { /* iterate through sheets */
                    //Convert the cell value to Json
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    if (roa.length > 0) {
                        result = roa;
                    }
                    var roaKeys = [];
                    for (var i = 0; i < roa.length; i++) {
                        roaKeys.push(Object.keys(roa[i]));
                    }
                    for (var j = 0; j < roa.length; j++) {
                        console.log(result);

                        //Post the account balance
                        $http(
                            {
                                method: 'POST',
                                url: 'https://accountbalance.azurewebsites.net/api/values/',
                                data: result[0],
                            }).then(function successCallback(response) {
                                alert("Upload Success!");
                                location.reload();
                            }, function errorCallback(response) {
                                alert("Something went wrong. please try again!");
                                location.reload();
                            });
                    }
                });
            };
            reader.readAsArrayBuffer(f);
        }
    };
});

accountBalance.controller('viewController', function ($scope, $http) {
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

accountBalance.controller('graphController', function ($scope, $http) {
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