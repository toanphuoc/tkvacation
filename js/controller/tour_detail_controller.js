app.controller('TourController', function ($scope, $routeParams, $http, $location, $rootScope, $filter) {

	$rootScope.menu = {
		'home': false,
		'destination': true,
		'customize' : false,
		'find_tour': false,
		'blog' : false,
		'contact' : false,
		'about' : false
	}

	$('.carousel').carousel({
	    interval: 5000 //changes the speed
	});

	var id = $routeParams.tourId;

	$http({
		method: 'GET',
		url : BASE_URL + 'tour/getTourById/' + id
	}).then(function successCallback(response){
		$scope.tour = response.data;
		$scope.tour.availability = $filter('date')(new Date($scope.tour.availability.replace(/-/g, "/")),'MMM dd, yyyy');

		$scope.tour.itinerary =  $scope.tour.itinerary == 'null' ? '' : $scope.tour.itinerary;
		$scope.tour.price_detail =  $scope.tour.price_detail == 'null' ? '' : $scope.tour.price_detail;


		$scope.itineraries = response.data.itinerary;
	});

	$scope.showItinerayTab = function(){
		$('#itineray').tab('show');
	}

	$scope.showImagesTab = function(){
		$('#images').tab('show');
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

 	$http({
 		url : BASE_URL + 'tour/getAllTourImages?tour_id=' + id
 	}).then(function success(response){
 		$scope.imgs = response.data;
 	});

 	$scope.prevCarouel = function(){
		$('.carousel').carousel('prev');
	}

	$scope.nextCarouel = function(){
		$('.carousel').carousel('next');
	}


});