app.controller('TourImagesController', function($scope, $rootScope, $http, $routeParams){

	$rootScope.menu = {
		'destination' : false,
		'tour' : true,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	function loadData(){
		$scope.loading = true;
		$http({
			url : BASE_URL + 'tour/getAllTourImages?tour_id=' + $routeParams.tour_id
		}).then(function success(response){
			$scope.imgs = response.data;
		}).finally(function(){
			$scope.loading = false;
		});
	}

	loadData();


	$scope.add = function(){
		$('#file').click();
	}

	$('#file').change(function() {
		var file = document.getElementById('file').files[0];

	    var size = file.size/1000000;
	    
		if(size > 5){
           	alert('The maximum size of file is 5M');
            return;
        }
        var fd = new FormData();
        fd.append('tour_id', $routeParams.tour_id);
    	fd.append('file', file);

    	$scope.loading = true;
        $http({
        	url: BASE_URL + 'tour/createTourImages?token=' + $rootScope.token,
        	method: 'POST',
        	data: fd,
    		headers: { 'Content-Type': undefined},
        	//prevents serializing payload.  don't do it.
       	 	transformRequest: angular.identity
        }).then(function success(response){
        	if(response.data.status){
        		loadData();
        	}
        }).finally(function(){
			$scope.loading = false;
		});
	});

	$scope.delete = function(id){
		var ansewer = confirm("Do you want to delete this image?");
		if(ansewer){
			$http({
				url: BASE_URL + 'tour/deleteTourImages?token=' + $rootScope.token + '&id=' + id,
				method: 'POST'
			}).then(function success(response){
				if(response.data.status){
					loadData();
				}
			});
		}
	}
});