app.controller('BlogCreateController', function($scope, $rootScope, $http, $window){
	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': true, 
		'about' : false
	};

	$scope.checked = true;

	$scope.create = function(){
		$scope.error = false;

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
		}else{
			$scope.error = true;
            $scope.error_message = 'Please select blog picture.';
            return;
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
			method: 'POST',
			url: BASE_URL + 'blog/create?token=' + $rootScope.token,
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