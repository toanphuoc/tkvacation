app.controller('TourController', function($scope, $rootScope, $http, $filter, $routeParams){
		$rootScope.menu = {
		'destination' : false,
		'tour' : true,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	var page = $routeParams.page;
	if (page == undefined) page = 1;

	$scope.currentPage = page;

	function loadData(){
		$http({
			method: 'GET',
			url : BASE_URL + 'tour/getList?token=' + $rootScope.token + '&page=' + $scope.currentPage
		}).then(function success(response){
			$scope.tours = response.data.tours;

			angular.forEach($scope.tours, function(value, key){
				value.date_created = $filter('date')(new Date(value.date_created),'MMM dd, yyyy');
			});

			$scope.pages = response.data.page;
		});
	}

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	//Get all destination available
	$http({
		method:'GET',
		url : BASE_URL + 'destination/listAvailable'
	}).then(function success(response){
		$scope.des = response.data;
	});

	$('#des').bind('change', function(event) {
		var id = this.value;
		if(id == 0){
			loadData();
		}else{
			$http({
				url : BASE_URL + 'tour/tourByDestination?destinationId=' + id + '&token=' + $rootScope.token + '&page=' + $scope.currentPage
			}).then(function success(response){
				$scope.tours = response.data.tours;

				angular.forEach($scope.tours, function(value, key){
					value.date_created = $filter('date')(new Date(value.date_created),'MMM dd, yyyy');
				});

				$scope.pages = response.data.page;
			});
		}
	});

	loadData();


});