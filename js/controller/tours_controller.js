app.controller('DestinationTourController', function ($scope, $routeParams, $http, $rootScope, $filter) {

	$rootScope.menu = {
		'home': false,
		'destination': true,
		'customize' : false,
		'find_tour': false,
		'blog' : false,
		'contact' : false,
		'about' : false
	}

	var id = $routeParams.destinationId;
	
	$http({
		method: 'GET',
		url: BASE_URL + 'tour/getTourByDestination/' + id
	}).then(function successCallback(response){
		$scope.data = response.data;

		angular.forEach($scope.data.data, function(value, key){
			value.availability = $filter('date')(new Date(value.availability.replace(/-/g, "/")),'MMM dd, yyyy');
		});
	});

	//Get other destination

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/getOtherDestination/' + id
	}).then(function successCallback(response){
		$scope.otherDes = response.data;
	});
});