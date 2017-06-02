app.controller('TourController', function ($scope, $routeParams, $http) {
	var id = $routeParams.tourId;

	$http({
		method: 'GET',
		url : BASE_URL + 'tour/getTourById/' + id
	}).then(function successCallback(response){
		$scope.tour = response.data.tour;
		$scope.itineraries = response.data.itinerary;
	});

	$scope.scrollToOverview = function($event){
		$('.overview').addClass('active');
		$('.itinerary').removeClass('active');
        $('html, body').animate({
            scrollTop: $(".info-overview").offset().top - 90
        }, 500);
	}
	

	$scope.scrollToItinerary = function($event){
		$('.itinerary').addClass('active');
		$('.overview').removeClass('active');
		$('html, body').animate({
            scrollTop: $(".info-itenirary").offset().top - 90
        }, 500);
	}
});