app.controller('DestinationTourController', function ($scope, $routeParams, $http, $rootScope) {

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
	});

	//Get other destination

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/getOtherDestination/' + id
	}).then(function successCallback(response){
		$scope.otherDes = response.data;
	});
});