(function () {
    "use strict";
    var app = angular.module('nth.app')
    app.factory("NthModelsAPI", ['$http', '$q', nthModelsAPI])
    ;
    function nthModelsAPI($http, $q) {
        var serviceBase = "http://localhost:1337/"
        var apiResult = function () {
            return {
                Put: doPut,
                Get: doGet,
                Post: doPost,
                Delete: doDelete
            };
        };
        var apiResultSuccess = function (result) {
              console.log(result);
         
        };
        var apiResultFailed = function (result) {
            var error;
            console.log(result);
        };
        var doGet = function (endpoint) {
            var deferred = $q.defer();
            $http
                    .get(serviceBase + endpoint)
                    .then(function (result) {
                deferred.resolve(result);
                apiResultSuccess(result);
            },
                            function (result) {
                deferred.reject(result);
                apiResultFailed(result);
            });
            return deferred.promise;
        };
        var doPost = function (endpoint, payload) {
            console.log(endpoint)
            var deferred = $q.defer();
            $http
                    .post(serviceBase + endpoint, payload)
                    .then(
                function (result) {
                    deferred.resolve(result);
                    apiResultSuccess(result);
                },
                            function (result) {
                    deferred.reject(result);
                    apiResultFailed(result);
                });
            return deferred.promise;
        };
        var doPut = function (endpoint, payload) {
            var deferred = $q.defer();
            $http
                    .put(serviceBase + endpoint, payload)
                    .then(function (result) {
                deferred.resolve(result);
                apiResultSuccess(result);
            },
                            function (result) {
                deferred.reject(result);
                apiResultFailed(result);
            });
            return deferred.promise;
        };
        var doDelete = function (endpoint) {
            var deferred = $q.defer();
            $http
                    .delete(serviceBase + endpoint)
                    .then(function (result) {
                deferred.resolve(result);
                apiResultSuccess(result);
            },
                            function (result) {
                deferred.reject(result);
                apiResultFailed(result);
            });
            return deferred.promise;
        };
        return apiResult;
    }

})();
