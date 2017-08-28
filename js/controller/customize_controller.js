app.controller('CustumizeTourController', function ($scope, $http, $rootScope) {

	$rootScope.menu = {
		'home': false,
		'destination': false,
		'customize' : true,
		'find_tour': false,
		'blog' : false,
		'contact' : false,
		'about' : false
	}

	$('#datepicker').datepicker({
		autoSize: true, 
		closeText: "Close", 
		defaultDate: new Date(),
		dateFormat: 'yy-mm-dd'
	});

	$scope.customize = {};

	$scope.send = function(){
		$scope.submitted = true;
		if(!$scope.customize_form.$valid) {
	       return;
	    }

	    $scope.loading = true;
		$http({
			method: 'POST',
 			url : BASE_URL_CUSTOMIZE_TOUR + 'create',
 			data: $.param($scope.customize),
 			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).then(function success(response){
			if(response.data.status){
 				$scope.customize = {};
 				$scope.message_success = true;
 				$scope.submitted = false;

 				setTimeout(function(){ $('.message_success').addClass('hidden'); }, 5000);
 			}
		}).finally(function(){
			$scope.loading = false;
		});
	}
});