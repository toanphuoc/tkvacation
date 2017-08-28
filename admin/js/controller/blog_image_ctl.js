app.controller('BlogImagesController', function($scope, $rootScope, $http, $routeParams){

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

	function loadData(){
		$scope.loading = true;
		$http({
			url : BASE_URL + 'blog/getLogImage?token=' + $rootScope.token + '&id=' + id
		}).then(function success(response){
			$scope.imgs = response.data;
		}).finally(function(){
			$scope.loading = false;
		});
	}

	loadData();

	$scope.delete = function(id){
		var answer = confirm("Do you want to delete this image?");
		if(answer){
			$http({
				method: 'DELETE',
				url: BASE_URL + 'blog/delete?token=' + $rootScope.token + '&id=' +id
			}).then(function success(response){
				if(response.data.status){
					loadData();
				}
			}).finally(function(){

			});
		}
	}

	$scope.add = function(){
		$('#file').click();
	}

	$('#file').change(function() {
	    var file = document.getElementById('file').files[0];

	    var size = file.size/1000000;
	    console.log(size);
		if(size > 5){
            $scope.error = true;
            $scope.error_message = 'The maximum size of file is 5M';
            return;
        }

		var fd = new FormData();
        fd.append('blog_id', id);
    	fd.append('file', file);

    	$http({
    		method: 'POST',
    		url: BASE_URL + 'blog/addNewImageBlog?token=' + $rootScope.token,
    		data: fd,
    		headers: { 'Content-Type': undefined},
        	//prevents serializing payload.  don't do it.
       	 	transformRequest: angular.identity
    	}).then(function success(response){
    		if(response.data.status){

    			loadData();
    		}else{
                $scope.error = true;
                $scope.error_message = response.data.message;
            }
    	})
	});
		
});