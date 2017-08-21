app.controller('BookingDetailController', function ($scope, $rootScope, $http, $routeParams){
	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : true,
		'message' : false,
		'customize' : false,
		'blog': false,
		'about' : false
	};

	var id = $routeParams.id;

	$http({
		url : BASE_URL + 'booking/GetBookingById?id=' + id + '&token=' + $rootScope.token
	}).then(function success(response){
		$scope.booking = response.data;
	});
	
});