var app = angular.module('ViewUpload', []);

app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

app.controller('ViewUploadController', function ($scope, $http) {

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
                            }, function errorCallback(response) {
                                alert("Something went wrong. please try again!");
                            });
                    }
                });
            };
            reader.readAsArrayBuffer(f);
        }
    };
});