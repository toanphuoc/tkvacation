app.controller('CustomizeTourDetailController', function($scope, $rootScope, $http, $routeParams, $filter){
	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : true,
		'blog': false
	};

	var id = $routeParams.id;

	$http({
		url :BASE_URL_CUSTOMIZE_TOUR + 'getCustomizeTourById?token=' + $rootScope.token + '&id=' + id
	}).then(function success(response){
		$scope.customizetour = response.data;
		$scope.customizetour.estimate_date_start = $filter('date')(new Date($scope.customizetour.estimate_date_start),'MMM dd, yyyy');
	});

});