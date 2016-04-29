(function () {
    angular
            .module('formlyExample')
            .factory('ModelsFactory', ['AppApi', fnModelsFactory])
            .controller('ModelsController', ['$scope', 'ModelsFactory', fnModelsController])
    ;
    function fnModelsFactory(AppApi) {
        var service = new AppApi();
        
        function getModels(model) {
            var promise;
            promise = service.Get(model);
            promise
                    .then(
                function (results) {
                    return results;
                },
                            function (error) {
                    return error;
                });
            return promise;
        }
        ;
        
        return {
            GetModels: getModels//,
            //CurrentUser: currentUser
        };
    }
    function fnModelsController($scope, ModelsFactory) {
        
        
        // ONLY SUBMIT IF I HAVE VALID DATA
        $scope.doSubmit = function () {
            alert(JSON.stringify($scope.formData, null, 2));
            alert(JSON.stringify($scope.formData, null, 2));
	  
        }
        
        
        
        $scope.formFields = []
        
        var model = ""//
        $scope.search = {}
        $scope.search.phrase = "Store"
        
        $scope.model = {} //"Ticket"
        
        $scope.doFind = function () {
            $scope.formFields = []            
            GetModels()
        }
        
        $scope.formFields = []
        
        $scope.formData = {};
        var GetModels = function () {
            var promise;
            model = $scope.search.phrase;
            
            //promise = ModelsFactory.GetModels($stateParams.model);
            promise = ModelsFactory.GetModels(model);
            promise.then(function (results) {
                //$scope.suburbs = results.data.suburbs;
                //console.log(results.data)
                //var props = {}
                props = (results.data);
                for (var item in props) {
                    //console.log(props[item])
                    //tempField.key = item
                    var tempField = 
 {
                        "type": "input",
                        "key": props[item].key,
                        "templateOptions": {
                            "type": "text",
                            "placeholder": props[item].description,
                            "label": props[item].key,
                            "icon": "ion-person",
                            required : false,
                            "iconPlaceholder": true
                        }
                    }
                    tempField = props[item]
                    $scope.formFields.push(tempField)
                };
                
                console.log($scope.formFields)

            });
        };
        
        $scope.AddNewUserSuburb = function (suburb_id) {
            var session = SessionFactory.GetSession();
            var UserSuburb = {};
            UserSuburb.user_id = session.user_id;
            UserSuburb.suburb_id = suburb_id;
            UserModelsFactory.SaveNewUserSuburb(UserSuburb);
        };
        
        GetModels();
    }
    ;


})();