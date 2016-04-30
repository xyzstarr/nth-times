(function () {
    var app = angular.module('nth.app')
    app.factory('ModelsFactory', ['NthModelsAPI', fnModelsFactory])
    app.controller('ModelsController', ['formlyVersion', 'NthModelsAPI', 'ModelsFactory', fnModelsController])
    
    function fnModelsFactory(NthModelsAPI) {
        var service = new NthModelsAPI();
        
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
        function saveModelInstance(model, data) {
            var promise;
            promise = service.Post(model, data);
            promise
                    .then(
                function (results) {
                    if (results.data.status === 'success') {
                                    //SessionFactory.CreateSession(results.data);
                                    //$state.transitionTo('app.currentuserprofile');
                        console.clear();
                        console.log("successful")
                    }
                               console.clear();
                        console.log(results)
                    return results;
                },
                            function (results) {
                                           console.clear();
                        console.log(results)
                    return results;
                });
            return promise;
        }
        ;
        return {
            GetModels: getModels,
            SaveModel: saveModelInstance
            //CurrentUser: currentUser
        };
    }
    function fnModelsController(formlyVersion, NthModelsAPI, ModelsFactory) {
        var vm = this;
        // ONLY SUBMIT IF I HAVE VALID DATA
        vm.doSubmit = function () {
            alert(JSON.stringify(vm.modelInstance, null, 2));
            // alert(JSON.stringify(vm.formData, null, 2));
            ModelsFactory.SaveModel(vm.search.searchPhrase, vm.modelInstance)
        }
        
        vm.search = {}
        vm.search.searchPhrase = "Store"
        vm.modelInstance = {} //"Ticket"
        vm.formFields = []
        vm.options = {};
        vm.env = {
            angularVersion: angular.version.full,
            formlyVersion: formlyVersion
        };
        vm.originalFields = angular.copy(vm.fields);
        
        // function definition
        function onSubmit() {
            vm.options.updateInitialValue();
            alert(JSON.stringify(vm.model), null, 2);
        }
        var GetModels = function () {
            var promise;
            var model = vm.search.searchPhrase;
            
            //promise = ModelsFactory.GetModels($stateParams.model);
            promise = ModelsFactory.GetModels(model);
            promise.then(function (results) {
                props = (results.data);
                for (var item in props) {
                    
                    formField = props[item]
                    
                    vm.formFields.push(formField)
                };

               // console.log($scope.formFields)
            });
        };
        
        GetModels();
    }
    ;
})();