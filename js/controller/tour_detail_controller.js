app.controller('TourController', function ($scope, $routeParams, $http, $location) {
	var id = $routeParams.tourId;

	$http({
		method: 'GET',
		url : BASE_URL + 'tour/getTourById/' + id
	}).then(function successCallback(response){
		$scope.tour = response.data.tour;
		$scope.itineraries = response.data.itinerary;
	});

	$scope.showItinerayTab = function(){
		$('#itineray').tab('show');
	}

	$scope.showOverviewTab = function(){
		$('#overview').tab('show');
	}

	$scope.showPriceTab = function(){
		$('#prices').tab('show');
	}



	$('#datepicker').datepicker({
		autoSize: true, 
		closeText: "Close", 
		defaultDate: new Date(),
		dateFormat: 'mm-dd-yy'
	});

	$scope.booking = {};
 	$scope.bookingTour = function(){
 		$scope.submitted = true;
 		if(!$scope.booking_form.$valid) {
	       	return;
	    }

	    $location.path('/booking').search({tourId: id, start_date: $scope.booking.start_date, number_of_people: $scope.booking.number_of_people});
 	}
});