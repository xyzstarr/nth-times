/* global angular */
(function () {
    console.clear();

    'use strict';

    var app = angular.module('nth.app')

    app.controller('MainCtrl', function MainCtrl(formlyVersion) {
        var vm = this;
        // funcation assignment
        vm.onSubmit = onSubmit;

        // variable assignment
        vm.author = {
            // optionally fill in your info below :-)
            name: 'Kent C. Dodds',
            url: 'https://twitter.com/kentcdodds'
        };
        vm.exampleTitle = 'angular-material'; // add this
        vm.env = {
            angularVersion: angular.version.full,
            formlyVersion: formlyVersion
        };

        vm.model = {};
        vm.options = {};

        vm.fields = [
            {
                key: 'text',
                type: 'input',
                templateOptions: {
                    label: 'Input'
                }
            },
            {
                elementAttributes: {
                    layout: 'row',
                    'layout-sm': 'column'
                },
                fieldGroup: [
                    {
                        key: 'firstName',
                        className: 'flex',
                        type: 'input',
                        templateOptions: {
                            label: 'First Name'
                        }
                    },
                    {
                        key: 'lastName',
                        className: 'flex',
                        type: 'input',
                        templateOptions: {
                            label: 'Last Name'
                        }
                    }
                ]
            },
            {
                key: 'knowsMuffinMan',
                type: 'checkbox',
                templateOptions: {
                    label: 'Do you know the muffin man?'
                }
            }
        ];

        vm.originalFields = angular.copy(vm.fields);

        // function definition
        function onSubmit() {
            vm.options.updateInitialValue();
            alert(JSON.stringify(vm.model), null, 2);
        }
    });
})();