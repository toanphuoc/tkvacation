app.controller('DestinationController', function($scope, $rootScope, $http){

	$rootScope.menu = {
		'destination' : true,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list'
	}).then(function successCallback(response){
		$scope.des = response.data;
	});
});