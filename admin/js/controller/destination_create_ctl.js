app.controller('DestinationCreateController', function($scope, $rootScope, $http, $window){

	$scope.checked = true;
	$scope.create = function(){

		if($scope.myFile == undefined || $scope.title == undefined || $scope.title.length == 0){
			alert('Ban chua dien du thong tin');
			return;
		}
		
		if($scope.checked === true)
			$scope.checked = 1;
		else if($scope.checked == false) $scope.checked = 0;

		var fd = new FormData();
		fd.append('file', $scope.myFile);
    	fd.append('title', $scope.title);
    	fd.append('status', $scope.checked);

    	var url = BASE_URL + '/destination/create?token=' + $rootScope.token
    

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
    		}
    	}); 
	}
});