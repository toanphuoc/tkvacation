app.controller('SearchController', function ($scope, $location, $routeParams, $http) {

	var page = $routeParams.page;
	if(page === undefined) page = 1;
	$scope.currentPage = page;

	$http({
		method: 'GET',
		url : BASE_URL + 'tour/getList/' + page
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
		
	};
});