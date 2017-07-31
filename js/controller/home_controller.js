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
		url: BASE_URL + 'destination/listAvailable'
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

	//For searching
	$scope.durations = [
		{
			'id' : '1',
			'min' : '1',
			'max' : '1',
			'text' : '1 Day Tour'
		}, {
			'id' : '2',
			'min' : '2',
			'max' : '4',
			'text' : '2 - 4 Days Tour'
		}, {
			'id' : '3',
			'min' : '5',
			'max' : '7',
			'text' : '5 - 7 Days Tour'
		}, {
			'id' : '4',
			'min' : '7',
			'max' : undefined,
			'text' : '7+ Days Tour'
		}
	];

	$scope.prices = [
		{
			'id' : '1',
			'min' : '0',
			'max' : '100',
			'text' : '$0 - $100'
		},
		{
			'id' : '2',
			'min' : '100',
			'max' : '200',
			'text' : '$100 - $200'
		},
		{
			'id' : '3',
			'min' : '200',
			'max' : '500',
			'text' : '$200 - $500'
		},
		{
			'id' : '4',
			'min' : '550',
			'max' : undefined,
			'text' : '$500 +'
		}
	];
	$scope.searchObj = {};

	$scope.search = function(){
		var period_min = undefined;
		var period_max = undefined;

		var min_price = undefined;
		var max_price = undefined;
		if($scope.searchObj.period >= 1){
			period_min = $scope.durations[$scope.searchObj.period - 1].min;
			period_max = $scope.durations[$scope.searchObj.period - 1].max;
		}
		
		if($scope.searchObj.price >= 1){
			min_price = $scope.prices[$scope.searchObj.price - 1].min;
			max_price = $scope.prices[$scope.searchObj.price - 1].max;
		}

		$location.path('/search').search({
			page: 1,
			keySearch: $scope.searchObj.key != undefined && $scope.searchObj.key.trim() != '' ? $scope.searchObj.key : undefined,
			desId: $scope.searchObj.des != '' ? $scope.searchObj.des : undefined,
			periodMin: period_min, 
			periodMax: period_max, 
			priceMin: min_price, 
			priceMax: max_price
		});
	}

});