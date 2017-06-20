app.controller('SearchController', function ($scope, $location, $routeParams, $http) {

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

	var page = $routeParams.page;

	$scope.searchObj = {};

	if(page === undefined) page = 1;
	$scope.currentPage = page;
	$scope.searchObj.key = $routeParams.keySearch;
	console.log($routeParams.keySearch);
	// if($scope.searchObj.key == '')
	// 	$scope.searchObj.key = undefined;

	$scope.searchObj.des = $routeParams.desId;

	$scope.periodMin = $routeParams.periodMin;
	$scope.periodMax = $routeParams.periodMax;

	$scope.priceMin = $routeParams.priceMin;
	$scope.priceMax = $routeParams.priceMax;



	$scope.searchObj.period = '0';
	for (var i = 0; i < $scope.durations.length; i++) {
		if($scope.periodMin == $scope.durations[i].min && $scope.periodMax == $scope.durations[i].max){
			$scope.searchObj.period = $scope.durations[i].id;
		}
	}

	for (var i = 0; i < $scope.prices.length; i++) {
		if($scope.priceMin == $scope.prices[i].min && $scope.priceMax == $scope.prices[i].max){
			$scope.searchObj.price = $scope.prices[i].id;
		}
	}

	$scope.priceMin = $routeParams.priceMin;
	$scope.priceMax = $routeParams.priceMax;

	var url = BASE_URL + 'tour/searchTour?keySearch=' + $scope.searchObj.key
							+ '&desId=' + $scope.searchObj.des
							+ '&periodMin=' + $scope.periodMin
							+ '&periodMax=' + $scope.periodMax
							+ '&priceMin=' + $scope.priceMin
							+ '&priceMax=' + $scope.priceMax
							+ '&page=' + page
	$http({
		method: 'GET',
		url: url
	}).then(function success(response){
		$scope.tours = response.data.tours;
		$scope.pagin = new Array(response.data.page.totalPage);
	});

	/**
	Load destination
	*/
	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list'
	}).then(function success(response){
		$scope.destinations = response.data;
	});

	
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
		
		$location.search({page: 1, 
			keySearch: $scope.searchObj.key != undefined && $scope.searchObj.key.trim() != '' ? $scope.searchObj.key : undefined, 
			desId: $scope.searchObj.des != '' ? $scope.searchObj.des : undefined, 
			periodMin: period_min, 
			periodMax: period_max, 
			priceMin: min_price, 
			priceMax: max_price
		});
	};

	$scope.navigate = function(pageIndex){
		$location.search({
			page: pageIndex,
			keySearch: $scope.searchObj.key != undefined && $scope.searchObj.key.trim() != '' ? $scope.searchObj.key : undefined, 
			desId: $scope.searchObj.des != '' ? $scope.searchObj.des : undefined, 
			periodMin: $scope.periodMin, 
			periodMax: $scope.periodMax, 
			priceMin: $scope.priceMin, 
			priceMax: $scope.priceMax
		});
	}
});