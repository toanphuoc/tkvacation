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
	when("/booking/:id", {
		templateUrl: 'view/booking_detail.html',
		controller: 'BookingDetailController'
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
	when('/blog/:blog_id', {
		templateUrl: 'view/blog_detail.html',
		controller: 'BlogDetailController'
	}).
	when('/create_blog', {
		templateUrl: 'view/blog_create.html',
		controller: 'BlogCreateController'
	}).
	when('/blog_imgs/:blog_id', {
		templateUrl: 'view/blog_images.html',
		controller: 'BlogImagesController'
	}).
	when('/create_destination', {
		templateUrl: 'view/destination_create.html',
		controller: 'DestinationCreateController'
	}).
	when('/create_tour', {
		templateUrl: 'view/tour_create.html',
		controller: 'TourCreateController'
	}).
	when('/tour/:tour_id', {
		templateUrl: 'view/tour_detail.html',
		controller: 'TourDetailController'
	}).
	when('/about', {
		templateUrl: 'view/about.html',
		controller: 'AboutController'
	}).
	when('/customize_tour_detail/:id', {
		templateUrl: 'view/customize_tour_detail.html',
		controller: 'CustomizeTourDetailController'
	}).
	when('/email_notification', {
		templateUrl: 'view/email_notification.html',
		controller: 'EmailNotificationController'
	}).
	when('/profile', {
		templateUrl: 'view/profile.html',
		controller: 'ProfileController'
	}).
	otherwise({ redirectTo: '/' })
});


var TOKEN = $.cookie('token');
var USER = $.cookie('user');

if(TOKEN == undefined || USER == undefined){
	window.location.href = 'login.html';
}