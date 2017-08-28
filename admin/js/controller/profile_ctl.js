app.controller('ProfileController', function($scope, $http, $rootScope){

	$scope.profile = {

	};

	$scope.change = function(){

		if($scope.profile.current_password == undefined || $scope.profile.current_password == null){
			alert('Please type the current password.');
			return;
		}

		if($scope.profile.new_password == undefined || $scope.profile.new_password == null){
			alert('Please type the new password.');
			return;
		}

		if($scope.profile.new_password != $scope.profile.confirm_new_password){
			alert('The new password and confirm new password are not match.');
			return;
		}

		$http({
			method: 'POST',
			url : BASE_URL + 'user/changePassword?token=' + $rootScope.token,
			data: $.param({'currentPassword' : $scope.profile.current_password, 'newPassword': $scope.profile.new_password}),
 			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).then(function success(response){
			if(response.data.status){

				$.cookie('token', response.data.token, { expires: 1 });
				$rootScope.token = response.data.token;
				$scope.profile = {

				};

				alert('Change password is successfully.');
			}else{
				alert(response.data.message);
			}
		});
	}
});