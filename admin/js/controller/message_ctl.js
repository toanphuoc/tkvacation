app.controller('MessageController', function($scope, $rootScope, $http, $filter, $routeParams){

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : true,
		'customize' : false,
		'blog': false
	};

	var page = $routeParams.page;
	if (page == undefined) page = 1;

	$scope.currentPage = page;

	function loadData(){
		$scope.loading = true;
		$http({
			method: 'GET',
			url : BASE_URL + 'contact/list?token=' + $rootScope.token + '&page=' + page
		}).then(function success(response){
			$scope.messages = response.data.contact;
			angular.forEach($scope.messages, function(value, key){
				value.date_created = $filter('date')(new Date(value.date_created),'MMM dd, yyyy');
			});

			$scope.pages = response.data.page;
		}).finally(function(){
			$scope.loading = false;
		});
	}

	loadData();

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	$scope.delete = function(id){
		var anwser = confirm('Do you want delete this message?');
		if(anwser){
			$http({
				method: 'PUT',
				url : BASE_URL + 'contact/delete?token=' + $rootScope.token + '&id=' + id
			}).then(function success(response){
				if(response.data.status){
					loadData();
				}
			});
		}
	}

	$scope.changeStatus = function(id, status){
		if(status == 1){
			return;
		}

		$http({
			method: 'PUT',
			url : BASE_URL + 'contact/updateIsRead?token=' + $rootScope.token + '&id=' + id
		}).then(function success(response){
			if(response.data.status){
				loadData();
			}
		});
	}

});