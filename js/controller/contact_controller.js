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
 		
 		$scope.submitted = true;
		if(!$scope.sentMessage.$valid) {
	       return;
	    }

 		$http({
 			method: 'POST',
 			url : BASE_URL + 'contact/create',
 			data: $.param($scope.contact),
 			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
 		}).then(function success(data){
 			if(data.data.status){
 				$scope.contact = {};
 				$scope.message_success = true;
 				$scope.submitted = false;
 				setTimeout(function(){ $('.message_success').addClass('hidden'); }, 5000);
 			}
 		});
 	}
});