app.controller('DestinationController', function ($scope, $http) {

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