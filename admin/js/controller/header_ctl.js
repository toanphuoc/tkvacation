app.controller('HeaderController', function($scope, $http, $rootScope){

	$rootScope.token = TOKEN;
	$rootScope.user = USER;

	$scope.logout = function(){
		$http({
			method: 'POST',
			url: BASE_URL + 'user/logout?token=' + $rootScope.token
		}).then(function success(response){
			if(response.data.status === true){
				$.removeCookie('token');
				$.removeCookie('user');

				delete $rootScope.user;

				delete $rootScope.token;
				window.location.href = 'login.html';
			}
		});
	}

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};
});