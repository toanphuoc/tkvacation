app.controller('EmailNotificationController', function($scope, $rootScope, $http){

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false,
		'about': false,
		'notify': true
	};

	function loadData(){
		$http({
			url : BASE_URL + 'about/getEmailNotification?token=' + $rootScope.token
		}).then(function success(response){
			$scope.data = response.data;
		});
	}

	loadData();

	$scope.edit = function(model){

		$scope.emailNofify = model;

		$('#myModal').modal('show');
	}

	$scope.save = function(model){
		$http({
			method: 'POST',
			url : BASE_URL + 'about/editEmailNotification?token=' + $rootScope.token,
			data : $.param({id: model.id, email: model.email, first_name: model.first_name, last_name: model.last_name}),
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).then(function success(response){
			if(response.data.status){
				$('#myModal').modal('hide');
			}
		});
	}
});