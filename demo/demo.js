angular.module('Demo', ['angular-bootstrap-select'])

.controller('simpleExampleCtrl', function ($scope) {
	$scope.people = [
		{ name: 'Dan', age: 22 },
		{ name: 'Steve', age: 43 },
		{ name: 'Alex', age: 28 },
		{ name: 'Tim', age: 30 }
	];

	$scope.currentPerson = $scope.people[0];
})

.controller('selectAsExampleCtrl', function ($scope) {
	$scope.people = ['Dan', 'Stephanie', 'Tim', 'George'];
	$scope.currentPerson = 'Dan';
})

;