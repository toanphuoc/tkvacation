app.controller('BookingController', function($scope, $rootScope, $http, $routeParams, $filter){

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : true,
		'message' : false,
		'customize' : false,
		'blog': false,
		'about' : false
	};
	var page = $routeParams.page;
	if (page == undefined) page = 1;

	$scope.currentPage = page;

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	loadData();

	function loadData(){

		$scope.loading = true;
		$http({
			url : BASE_URL + 'booking/getList?token=' + $rootScope.token + '&page=' + page
		}).then(function success(response){
			$scope.bookings = response.data.booking;

			angular.forEach($scope.bookings, function(value, key){
					value.date_created = $filter('date')(new Date(value.date_created),'MMM dd, yyyy');
				});
			$scope.pages = response.data.page;
		}).finally(function(){
			$scope.loading = false;
		});
	}

	$scope.delete = function(id){

		var anwser = confirm('Do you want delete this booking?');
		if(anwser){
			$http({
				method: 'DELETE',
				url : BASE_URL + 'booking/delete?token=' + $rootScope.token + '&id=' + id
			}).then(function success(response){
				if(response.data.status){
					loadData();
				}
			});
		}
		
	}
	
});