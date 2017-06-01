app.controller('DestinationTourController', function ($scope, $routeParams, $http) {
	var id = $routeParams.destinationId;
	
	$http({
		method: 'GET',
		url: BASE_URL + 'tour/GetTourByDestination/' + id
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