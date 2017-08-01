app.controller('ContactController', function ($scope, $http, $rootScope) {

	$rootScope.menu = {
		'home': false,
		'destination': false,
		'customize' : false,
		'find_tour': false,
		'blog' : false,
		'contact' : true,
		'about' : false
	}

	$scope.contact = {};
 	$scope.sendContact = function(){
 		var regExpPhoneNumber = /^[0-9()-]+$/;
 		var regExpEmail = /^.+@.+\..+$/;
 		if($scope.contact.name == undefined || $scope.contact.name === ''){
 			$scope.full_name_error = true;
 			return;
 		}else $scope.full_name_error = false;

 		if($scope.contact.number == undefined || $scope.contact.number === '' || !$scope.contact.number.match(regExpPhoneNumber)){
 			$scope.number_error = true;
 			return;
 		}else $scope.number_error = false;

 		if($scope.contact.email == undefined || $scope.contact.email === '' || !$scope.contact.email.match(regExpEmail)){
 			$scope.email_error = true;
 			return;
 		}else $scope.email_error = false;

 		if($scope.contact.message == undefined || $scope.contact.message === ''){
 			$scope.message_error = true;
 			return;
 		}else $scope.message_error = false;

 		$http({
 			method: 'POST',
 			url : BASE_URL + 'contact/create',
 			data: $.param($scope.contact),
 			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
 		}).then(function success(data){
 			if(data.data.status){
 				$scope.contact = {};
 				$scope.message_success = true;

 				setTimeout(function(){ $('.message_success').addClass('hidden'); }, 5000);
 			}
 		});
 	}
});