app.controller('DestinationController', function($scope, $rootScope, $http){

	$rootScope.menu = {
		'destination' : true,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	function loadData(){
		$http({
			method: 'GET',
			url: BASE_URL + 'destination/list?token=' + $rootScope.token
		}).then(function successCallback(response){
			$scope.des = response.data;
		});
	}

	loadData();

	$scope.changeStatus = function(id, status){

		if(status == '1')
			status = 0;
		else status = 1;

		$http({
			method: 'POST',
			url: BASE_URL + 'destination/changeStatus?token=' + $rootScope.token + '&id=' + id + '&status=' + status
		}).then(function success(response){
			if(response.data.status == true){
				loadData();
			}
		});
	}
});