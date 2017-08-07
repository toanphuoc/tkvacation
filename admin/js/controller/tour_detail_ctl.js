app.controller('TourDetailController', function($scope, $rootScope, $http, $routeParams){
	$rootScope.menu = {
		'destination' : false,
		'tour' : true,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	var overview = CKEDITOR.replace( 'overview' );
	var price_detail = CKEDITOR.replace( 'price_detail' );

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list?token=' + $rootScope.token
	}).then(function successCallback(response){
		$scope.des = response.data;
	});

	var id = $routeParams.tour_id;
	
	$http({
		url: BASE_URL + 'tour/getTourById/' + id
	}).then(function success(response){
		$scope.tour = response.data.tour;
		$scope.tour.period =  parseInt($scope.tour.period);
		$scope.tour.price = parseInt($scope.tour.price);
		$scope.tour.price_vnd = parseInt($scope.tour.price_vnd);
		// $scope.tour.destination_id = parseInt($scope.tour.destination_id);

		overview.setData($scope.tour.overview);
		price_detail.setData($scope.tour.price_detail);

		if($scope.tour.status == '1')
			$scope.checked = true;
		else $scope.checked = false;
	});
});