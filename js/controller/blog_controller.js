app.controller('BlogController', function ($scope, $http, $routeParams, $filter) {

	var page = $routeParams.page;
	if (page == undefined) page = 1;

	$scope.currentPage = page;
	
	$http({
		method: 'GET',
		url: BASE_URL + 'blog/list?page=' + page
	}).then(function successCallback(response){
		$scope.blogs = response.data.blogs;
		angular.forEach($scope.blogs, function(value, key){
			value.date_created = $filter('date')(new Date(value.date_created),'MMMM dd, yyyy');
		});

		$scope.pages = response.data.page;
	});
});