
define(['configuration', 'utilities', 'angular', 'controllers', 'filters', 'services', 'directives'], function(configurationModule, utilities, angular, controllers, filters, services, directives) {

    'use strict';
    
    var configuration = configurationModule.get();

    return angular.module(configuration.application.name, ['controllersModule', 'filtersModule', 'servicesModule', 'directivesModule']);

});