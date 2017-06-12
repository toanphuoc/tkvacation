app.controller('ContactController', function ($scope, $http) {

	$scope.contact = {};
 	$scope.sendContact = function(){
 		$http({
 			method: 'POST',
 			url : BASE_URL + 'contact/create',
 			data: $.param($scope.contact),
 			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
 		}).then(function success(data){
 			if(data.data.status){
 				$scope.contact = {};
 			}
 		});
 	}
});