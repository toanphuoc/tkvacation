app.controller('DestinationController', function ($scope, $http, $rootScope) {

	$rootScope.menu = {
		'home': false,
		'destination': true,
		'customize' : false,
		'find_tour': false,
		'blog' : false,
		'contact' : false,
		'about' : false
	}

 	$http({
		method: 'GET',
		url: BASE_URL + 'destination/listAvailable'
	}).then(function successCallback(response){
		$scope.des = response.data;
	});

	$scope.showAllTours = function($event){
 		var ele = $event.currentTarget;
 		$(ele).find('.category-head-animate').removeClass('hidden');
 		$(ele).find('.category-overlay').removeClass('hidden');
 	}

 	$scope.hiddenAllTours = function($event){
 		var ele = $event.currentTarget;
 		$(ele).find('.category-head-animate').addClass('hidden');
 		$(ele).find('.category-overlay').addClass('hidden');
 	}

});