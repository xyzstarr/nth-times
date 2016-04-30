(function(){
    "use strict";
    var app = angular.module('nth.app')
            app.factory("AppApi",['$http','$q',fnAppApi])
            ;
    function fnAppApi($http,$q){
		var serviceBase = "http://localhost:1337/modles/"
        var apiResult=function(){
            return {
                Put:doPut,
                Get:doGet,
                Post:doPost,
                Delete:doDelete
            };
        };
        var apiResultSuccess=function(result){
            //addToLogs(result);
            //alert(result);
            console.log(result);
            //console.log('key is...'+$http.defaults.headers.common.Authorization);
            //if(result.data.status==='success'){
            //    if(result.data.toast_feedback===true){
                    //ToastFactory.success(result);
            //    }
           // }
           //// else
           // {
               // ToastFactory.error('some error');
               // ToastFactory.error(result);
           // }
        };
        var apiResultFailed=function(result){
            var error;
            console.log(result);          
        };
        var doGet=function(endpoint){
            var deferred=$q.defer();
            $http
                    .get(serviceBase+endpoint)
                    .then(function(result){
                        deferred.resolve(result);
                        apiResultSuccess(result);
                    },
                            function(result){
                                deferred.reject(result);
                                apiResultFailed(result);
                            });
            return deferred.promise;
        };
        var doPost=function(endpoint,payload){
            var deferred;
            deferred=$q.defer();
            $http
                    .post(serviceBase+endpoint,payload)
                    .then(
                            function(result){
                                deferred.resolve(result);
                                apiResultSuccess(result);
                            },
                            function(result){
                                deferred.reject(result);
                                apiResultFailed(result);
                            });
            return deferred.promise;
        };
        var doPut=function(endpoint,payload){
            var deferred=$q.defer();
            $http
                    .put(serviceBase+endpoint,payload)
                    .then(function(result){
                        deferred.resolve(result);
                        apiResultSuccess(result);
                    },
                            function(result){
                                deferred.reject(result);
                                apiResultFailed(result);
                            });
            return deferred.promise;
        };
        var doDelete=function(endpoint){
            var deferred=$q.defer();
            $http
                    .delete(serviceBase+endpoint)
                    .then(function(result){
                        deferred.resolve(result);
                        apiResultSuccess(result);
                    },
                            function(result){
                                deferred.reject(result);
                                apiResultFailed(result);
                            });
            return deferred.promise;
        };
        return apiResult;
    }

})();
