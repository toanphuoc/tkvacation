app.controller('BlogController', function($scope, $rootScope, $http, $routeParams, $filter){
	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': true, 
		'about' : false
	};

	var page = $routeParams.page;
	if (page == undefined) page = 1;

	$scope.currentPage = page;

	loadData();

	function loadData(){
		$scope.loading = true;
		$http({
			url : BASE_URL + 'blog/getList?token=' + $rootScope.token + '&page=' + page
		}).then(function success(response){
			$scope.blogs = response.data.blogs;

			angular.forEach($scope.blogs, function(value, key){
				value.date_created = $filter('date')(new Date(value.date_created),'MMM dd, yyyy');
			});
			$scope.pages = response.data.page;
		}).finally(function(){
			$scope.loading = false;
		});
	}

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	$scope.changeStatus = function(id, status){
		if(status == '1')
			status = 0;
		else status = 1;

		$http({
			method: 'PUT',
			url : BASE_URL + 'blog/changeStatus?token=' + $rootScope.token + '&id=' + id + '&status=' + status
		}).then(function  success(response){
			if(response.data.status){
				loadData();
			}
		});
	}
});