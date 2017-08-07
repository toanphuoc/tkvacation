app.controller('TourCreateController', function($scope, $rootScope, $http){
	$rootScope.menu = {
		'destination' : false,
		'tour' : true,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	CKEDITOR.replace( 'overview' );
	CKEDITOR.replace( 'price_detail' );

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list?token=' + $rootScope.token
	}).then(function successCallback(response){
		$scope.des = response.data;
	});
});