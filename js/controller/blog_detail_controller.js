app.controller('BlogDetailController', function ($scope, $http, $routeParams, $filter) {

	$('.carousel').carousel({
	    interval: 5000 //changes the speed
	});

	$scope.prevCarouel = function(){
		$('.carousel').carousel('prev');
	}

	$scope.nextCarouel = function(){
		$('.carousel').carousel('next');
	}

	var id = $routeParams.blog_id;

	$http({
		method: 'GET',
		url: BASE_URL + 'blog/getBlog/' + id
	}).then(function successCallback(response){
		$scope.blog = response.data.blog;
		$scope.imgs = response.data.imgs;

		$scope.blog.date_created = $filter('date')(new Date($scope.blog.date_created),'MMMM dd, yyyy');
	});
});