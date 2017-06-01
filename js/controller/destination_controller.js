app.controller('DestinationController', function ($scope, $http) {

 	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list'
	}).then(function successCallback(response){
		$scope.des = response.data;
	});

	$scope.showAllTours = function($event){
 		var ele = $event.currentTarget;
 		$(ele).find('.category-head-animate').removeClass('hidden', 2500);
 		$(ele).find('.category-overlay').removeClass('hidden', 2500);
 	}

 	$scope.hiddenAllTours = function($event){
 		var ele = $event.currentTarget;
 		$(ele).find('.category-head-animate').addClass('hidden', 2500);
 		$(ele).find('.category-overlay').addClass('hidden', 2500);
 	}

});