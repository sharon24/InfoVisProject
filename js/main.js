(function() {
	var app = angular.module('InfoVis', []);
 	app.controller('MainController',['$scope', '$window', function($scope, $window){
 		      $scope.greeting = 'Hello, World!';
      $scope.doGreeting = function(greeting) {
        $window.alert(greeting);
      };

 	}]);

})();