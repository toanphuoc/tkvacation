app.controller('DestinationCreateController', function($scope, $rootScope, $http, $window){
            $rootScope.menu = {
        'destination' : true,
        'tour' : false,
        'booking' : false,
        'message' : false,
        'customize' : false,
        'blog': false
    };
	$scope.checked = true;
	$scope.create = function(){
        $scope.error = false;
		if($scope.myFile == undefined || $scope.title == undefined || $scope.title.length == 0){
			alert('Ban chua dien du thong tin');
			return;
		}
		
		if($scope.checked === true)
			$scope.checked = 1;
		else if($scope.checked == false) $scope.checked = 0;

        var size = $scope.myFile.size/1000000;
        
        if(size > 5){
            $scope.error = true;
            $scope.error_message = 'The maximum size of file is 5M';
            return;
        }

		var fd = new FormData();
		fd.append('file', $scope.myFile);
    	fd.append('title', $scope.title);
    	fd.append('status', $scope.checked);

    	var url = BASE_URL + '/destination/create?token=' + $rootScope.token
    
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