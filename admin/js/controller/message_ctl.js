app.controller('MessageController', function($scope, $rootScope, $http){

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : true,
		'customize' : false,
		'blog': false
	};

	$http({
		method: 'GET',
		url : BASE_URL + 'contact/list?token=' + $rootScope.token
	}).then(function success(response){
		$scope.messages = response.data.contact;
		$scope.pages = response.data.page;
	});

});