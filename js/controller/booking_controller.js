app.controller('BookingController', function ($scope, $routeParams, $http, $location, $routeParams, $rootScope) {

	$rootScope.menu = {
		'home': false,
		'destination': true,
		'customize' : false,
		'find_tour': false,
		'blog' : false,
		'contact' : false,
		'about' : false
	}

	var id = $routeParams.tourId;
	var start_date = $routeParams.start_date;
	var number_of_people = $routeParams.number_of_people;

	$http({
		method: 'GET',
		url : BASE_URL + 'tour/getTourById/' + id
	}).then(function successCallback(response){
		$scope.tour = response.data;
	});

	$scope.booking = {tour_id: id, start_date: start_date, number_of_people: number_of_people};

	$scope.submitBooking = function(){
		$scope.submitted = true;

		if(!$scope.booking_form.$valid) {
	       	return;
	    }

	    $scope.loading = true;
	    $http({
	    	method: 'POST',
	    	url: BASE_URL + 'booking/create',
	    	data: $.param($scope.booking),
 			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
	    }).then(function success(response){
	    	if(response.data.status){
	    		$location.path('/booking_success');
	    	}
	    }).finally(function(){
	    	$scope.loading = false;
	    });
	}
});