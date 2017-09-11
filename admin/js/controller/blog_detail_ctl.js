app.controller('BlogDetailController', function($scope, $rootScope, $http, $routeParams, $window){
	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': true, 
		'about' : false
	};

	var id = $routeParams.blog_id;

	$http({
		url :BASE_URL + 'blog/getBlog/' + id
	}).then(function success(response){
		$scope.blog = response.data.blog;
		if($scope.blog.status == '1')
			$scope.checked = true;
		else $scope.checked = false;
	});

	$scope.edit = function(id){

		if($scope.blog.blog_name.trim() === ""){
			alert("Please type the blog name.");
			return;
		}

		$scope.error = false;
		var url = BASE_URL + 'blog/edit?id=' + id + '&token=' + $rootScope.token;

		var fd = new FormData();
		var name = $scope.blog.blog_name;
        fd.append('blog_name', name);

	
		if($scope.myFile != undefined){
			var img = $scope.myFile;
			var size = $scope.myFile.size/1000000;
			if(size > 5){
	            $scope.error = true;
	            $scope.error_message = 'The maximum size of file is 5M';
	            return;
	        }

	        fd.append('file', img);
		}
		var overview = $scope.blog.overview;
		fd.append('overview', overview);

		var status = $scope.checked;
		if(status === true)
			status = 1;
		else if(status == false) status = 0;
		fd.append('status', status);
		
		$scope.loading = true;
		$http({
			method : 'POST',
			url:url,
			data: fd,
    		headers: { 'Content-Type': undefined},
        	//prevents serializing payload.  don't do it.
       	 	transformRequest: angular.identity
		}).then(function success(response){
			if(response.data.status){
    			$window.location = '#!blog/';
    		}else{
                $scope.error = true;
                $scope.error_message = response.data.message;
            }
		}).finally(function(){
			$scope.loading = false;
		});
       	
	}
});