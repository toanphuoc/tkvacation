app.controller('DestinationDetailController', function($scope, $rootScope, $http, $routeParams, $window){

	$rootScope.menu = {
		'destination' : true,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false, 
		'notify': false
	};

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/getDestinationById/' + $routeParams.id
	}).then(function success(response){
		$scope.des = response.data;
		if(response.data.status == '1')
			$scope.checked = true;
		else $scope.checked = false;
	});

	$scope.update = function(){
		$scope.error = false;
		var url = BASE_URL + 'destination/update?id=' + $routeParams.id + '&token=' + $rootScope.token;

		var title = $scope.des.title;
		var file = $scope.myFile;
		var status = $scope.checked;

		if(file != undefined){
			var size = $scope.myFile.size/1000000;
        
	        if(size > 5){
	            $scope.error = true;
	            $scope.error_message = 'The maximum size of file is 5M';
	            return;
	        }
		}
		

		if(status === true)
			status = 1;
		else if(status == false) status = 0;

        var fd = new FormData();
        fd.append('file', file);
    	fd.append('title', title);
    	fd.append('status', status);
    	$scope.loading = true;
    	$http({
    		method: 'POST',
    		url: url,
    		data: fd,
    		headers: { 'Content-Type': undefined},
        	//prevents serializing payload.  don't do it.
       	 	transformRequest: angular.identity
    	}).then(function success(response){
    		if(response.data.status){
    			$window.location = '#!/';
    		}else{
                $scope.error = true;
                $scope.error_message = response.data.message;
            }
    	}).finally(function(){
    		$scope.loading = false;
    	}); 
    }

});

app.directive('fileModel', function($parse){
	return {
		restrict: 'A',
		link : function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
             	scope.$apply(function(){
             		var f = element[0].files[0];
                	modelSetter(scope, f);
                	$("img").fadeIn("fast").attr('src',URL.createObjectURL(f));
             	});
          	});
		}
	};
});