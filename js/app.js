var app = angular.module("vacation", ["ngRoute", "ngSanitize"]);
app.config(function($routeProvider) {
    $routeProvider
	.when("/", {
        templateUrl : "views/home.html",
        controller: "HomeController"
    }).
	when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutController'
	}).
	when('/contact', {
		templateUrl: 'views/contact.html', 
		controller: 'ContactController'
	}).
	when('/destinations', {
		templateUrl: 'views/destinations.html', 
		controller: 'DestinationController'
	}).
	when('/tours/:destinationId', {
		templateUrl: 'views/tour_destanation.html',
		controller: 'DestinationTourController'
	}).
	when('/tour/:tourId', {
		templateUrl: 'views/tour.html',
		controller: 'TourController'
	}).
	when('/booking', {
		templateUrl: 'views/booking.html',
		controller: 'BookingController'
	}).
	when('/search', {
		templateUrl: 'views/search.html',
		controller: 'SearchController'
	}).
	when('/custumize_tour', {
		templateUrl: 'views/customize_tour.html',
		controller: 'CustumizeTourController'
	}).
	when('/booking_success',{
		templateUrl: 'views/booking_success.html',
		controller: 'BookingSuccessController'
	}).
	when('/blog', {
		templateUrl: 'views/blog.html',
		controller: 'BlogController'
	}).
    otherwise({ redirectTo: '/' })
});

// app.directive('menu', function(){
// 	 return function(scope, element, attrs) {
// 	    var clickingCallback = function() {
// 	      	$(element).addClass('active');
// 	    };
// 	    element.bind('click', clickingCallback);
// 	}
// })

