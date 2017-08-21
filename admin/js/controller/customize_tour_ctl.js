app.controller('CustomizeTourController', function($scope, $rootScope, $http, $routeParams){

	var page = $routeParams.page;
	if (page == undefined) page = 1;

	$scope.currentPage = page;

	$rootScope.menu = {
		'destination' : false,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : true,
		'blog': false
	};

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	function loadData(){

		$scope.loading = true;
		$http({
			url : BASE_URL_CUSTOMIZE_TOUR + 'getList?token=' + $rootScope.token + '&page=' + page
		}).then(function success(response){
			$scope.data = response.data.data;
			$scope.pages = response.data.page;
		}).finally(function(){
			$scope.loading = false;
		});
	}

	loadData();

	$scope.delete = function(id){
		var anwser = confirm('Do you want delete this customize tour?');
		if(anwser){
			$http({
				method: 'POST',
				url: BASE_URL_CUSTOMIZE_TOUR + 'delete?token=' + $rootScope.token + '&id=' + id
			}).then(function success(response){
				if(response.data.status){
					loadData();
				}
			});
		}
		
	}
});