app.controller('AboutController', function ($scope, $rootScope, $http) {

	$rootScope.menu = {
		'home': false,
		'destination': false,
		'customize' : false,
		'find_tour': false,
		'blog' : false,
		'contact' : false,
		'about' : true
	}

	$http({
		url : BASE_URL + 'about/getAboutContent'
	}).then(function (response){
		$scope.about = response.data;
	});
});