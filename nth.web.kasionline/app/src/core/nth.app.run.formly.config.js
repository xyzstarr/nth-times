/* global angular */
(function() {
  console.clear();
  
  'use strict';
  
  var app = angular.module('nth.app');
  
  app.run(function(formlyConfig) {
    formlyConfig.setType({
      name: 'input',
      template: '<input ng-model="model[options.key]"><div class="hint">{{to.sanjeeva}}</div>'
    });
    
    formlyConfig.setType({
      name: 'checkbox',
      template: '<md-checkbox ng-model="model[options.key]">{{to.label}}</md-checkbox>'
    });
    
    formlyConfig.setWrapper({
      name: 'mdLabel',
      types: ['input'],
      template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
    });
    
    formlyConfig.setWrapper({
      name: 'mdInputContainer',
      types: ['input'],
      template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
    });
    
    // having trouble getting icons to work.
    // Feel free to clone this jsbin, fix it, and make a PR to the website repo: https://github.com/formly-js/angular-formly-website
    formlyConfig.templateManipulators.preWrapper.push(function(template, options) {
      if (!options.data.icon) {
        return template;
      }
      return '<md-icon class="step" md-font-icon="icon-' + options.data.icon + '"></md-icon>' + template;
    });
  });

  
})();