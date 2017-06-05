app.controller('HomeController', function ($scope, $location, $http) {
	$('.carousel').carousel({
	    interval: 5000 //changes the speed
	});

	$scope.prevCarouel = function(){
		$('.carousel').carousel('prev');
	}

	$scope.nextCarouel = function(){
		$('.carousel').carousel('next');
	}

	$scope.search = function(){
		$location.path('/search').search({'key': 'Sapa'});
	}
	
	/**
		Get popular desetination
	*/
	$http({
		method: 'GET',
		url: BASE_URL + 'destination/getPopularDestination'
	}).then(function successCallback(response){
		$scope.des = response.data;
	});

	/**
		Get popular tours
	*/
	$http({
		method: 'GET',
		url: BASE_URL + 'tour/getPopularTour'
	}).then(function successCallback(response){
		$scope.popularTours = response.data;
	});

	/**
		Get all destination
	*/
	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list'
	}).then(function success(response){
		$scope.destinations = response.data;
	});

	$scope.showAllTours = function($event){
		var ele = $event.currentTarget;
		$(ele).find('.view-all').removeClass("hidden");
	}

	$scope.hiddenAllTours = function($event){
		var ele = $event.currentTarget;
		$(ele).find('.view-all').addClass("hidden");
	}



});