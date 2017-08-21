app.controller('AboutController', function ($scope, $rootScope, $http){

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false, 
		'about' : true
	};

	$http({
		url : BASE_URL + 'about/getAboutContent'
	}).then(function (response){
		$scope.about = response.data;
	});

	$scope.edit = function(id){
		console.log(id);
		var content = $scope.about.content;

		$http({
			url : BASE_URL + 'about/editAboutContent?id=' + id + '&token=' + $rootScope.token,
			data : $.param({content: content}),
			method: "POST",
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).then(function (response){
			if(response.data.status){
				alert('Save about content is successful.')
			}
		});
	}
});