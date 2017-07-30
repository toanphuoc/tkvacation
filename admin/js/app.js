var app = angular.module('tkadmin',["ngRoute", "ngSanitize"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: 'view/destination.html',
		controller: 'DestinationController'
	}).
	when('/destination/:id', {
		templateUrl: 'view/destination_detail.html',
		controller: 'DestinationDetailController'
	}).
	when("/tour", {
		templateUrl: 'view/tour.html',
		controller: 'TourController'
	}).
	when("/booking", {
		templateUrl: 'view/booking.html',
		controller: 'BookingController'
	}).
	when('/message', {
		templateUrl: 'view/contact_message.html',
		controller: 'MessageController'
	}).
	when('/customize_tour', {
		templateUrl: 'view/customize_tour.html',
		controller: 'CustomizeTourController'
	}).
	when('/blog', {
		templateUrl: 'view/blog.html',
		controller: 'BlogController'
	}).
	otherwise({ redirectTo: '/' })
});


var TOKEN = $.cookie('token');
var USER = $.cookie('user');

if(TOKEN == undefined || USER == undefined){
	window.location.href = 'login.html';
}