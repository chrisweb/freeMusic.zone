
/**
 * sample application client code using anuglar.js
 * 
 * @returns {undefined}
 *//*
(function($, window, undefined) {

    // on dom loaded
    $(function() {

        console.log('Hello Dom');

    });

    var $scope = window.$scope;
    var angular = window.angular;
    var $routeProvider = window.$routeProvider;
    var $locationProvider = window.$locationProvider;
    var $route = window.$route;
    var $routeParams = window.$routeParams;
    var $location = window.$location;
*/
    angular.module('prototype', [], function($routeProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);
        
        $routeProvider.when('/test/:bookId', {
            templateUrl: 'page1.html',
            controller: Page1Cntl,
            resolve: {
                // I will cause a 1 second delay
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        });
        
        $routeProvider.when('/test/:bookId/ch/:chapterId', {
            templateUrl: 'page2.html',
            controller: Page2Cntl
        });
    });

    window.MainCntl = function($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    };

    window.Page1Cntl = function($scope, $routeParams) {
        $scope.name = "BookCntl";
        $scope.params = $routeParams;
    };

    window.Page2Cntl = function($scope, $routeParams) {
        $scope.name = "ChapterCntl";
        $scope.params = $routeParams;
    };
/*
})(jQuery, window);*/