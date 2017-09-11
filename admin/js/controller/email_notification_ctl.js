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

	$scope.create = function(){
		$('#createModal').modal('show');
		$scope.newEmail = {
			'email' : '',
			'first_name': '', 
			'last_name' : ''
		}
	}

	$scope.createNewEmail = function(){
		if($scope.newEmail.email == ''){
			alert('Please type email.');
			return;
		}

		if($scope.newEmail.first_name == ''){
			alert('Please type first_name.');
			return;
		}

		if($scope.newEmail.last_name == ''){
			alert('Please type last_name.');
			return;
		}

		$http({
			method: 'POST',
			url : BASE_URL + 'about/createEmailNotify?token=' + $rootScope.token,
			data : $.param({email: $scope.newEmail.email, first_name: $scope.newEmail.first_name, last_name: $scope.newEmail.last_name}),
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).then(function success(response){
			if(response.data.status){
				$('#createModal').modal('hide');
				loadData();
			}
		});
		
	}

	$scope.edit = function(model){

		$scope.emailNofify = model;

		$('#myModal').modal('show');
	}

	$scope.delete = function(id){
		var answer = confirm('Do you want to delete this email?');
		if(answer){
			$http({
				method: 'DELETE',
				url: BASE_URL + 'about/deleteEmailNotify?id=' + id + '&token=' + $rootScope.token
			}).then(function success(response){
				if(response.data.status){
					loadData();
				}
			});
		}
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