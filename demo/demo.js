angular.module('Demo', ['bootstrap-select'])

.controller('exampleCtrl', function($scope) {
	$scope.people = [
		{ name: 'Dan', age: 22 },
		{ name: 'Steve', age: 43 },
		{ name: 'Alex', age: 28 },
		{ name: 'Tim', age: 30 }
	];

	$scope.currentPerson = $scope.people[0];
})

;