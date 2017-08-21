app.controller('TourDetailController', function($scope, $rootScope, $http, $routeParams, $filter, $window){
	$rootScope.menu = {
		'destination' : false,
		'tour' : true,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	//var overview = CKEDITOR.replace( 'overview' );
	//var price_detail = CKEDITOR.replace( 'price_detail' );
	$('#datepicker').datepicker({
		autoSize: true, 
		closeText: "Close", 
		dateFormat: 'M dd, yy'
	});

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/list?token=' + $rootScope.token
	}).then(function successCallback(response){
		$scope.des = response.data;
	});

	var id = $routeParams.tour_id;
	
	$http({
		url: BASE_URL + 'tour/getTourById/' + id
	}).then(function success(response){
		$scope.tour = response.data;
		$scope.tour.period =  parseInt($scope.tour.period);
		$scope.tour.price = parseInt($scope.tour.price);
		$scope.tour.price_vnd = parseInt($scope.tour.price_vnd);
		$scope.tour.availability = $filter('date')(new Date($scope.tour.availability),'MMM dd, yyyy');

		if($scope.tour.status == '1')
			$scope.checked = true;
		else $scope.checked = false;
	});

	$scope.edit = function(id){
		$scope.error = false;

		var url = BASE_URL + 'tour/edit?id=' + id + '&token=' + $rootScope.token;
		var name = $scope.tour.name;
		var period = $scope.tour.period;
		var price = $scope.tour.price;
		var price_vnd = $scope.tour.price_vnd;
		var dateTime = $("#datepicker").datepicker( 'getDate' );
		var availability =  dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
		var des = $('#tour_create .destination').val();

		var overview = $scope.tour.overview;
		var itinerary = $scope.tour.itinerary;
		var price_detail = $scope.tour.price_detail;
		var status = $scope.checked;

		if($scope.myFile != undefined){
			var img = $scope.myFile;
			var size = $scope.myFile.size/1000000;
			if(size > 5){
	            $scope.error = true;
	            $scope.error_message = 'The maximum size of file is 5M';
	            return;
	        }
		}
		

        if(status === true)
			status = 1;
		else if(status == false) status = 0;

		var fd = new FormData();
        fd.append('name', name);
    	fd.append('period', period);
    	fd.append('price', price);
    	fd.append('price_vnd', price_vnd);
    	fd.append('availability', availability);
    	fd.append('destination_id', des);
    	fd.append('itinerary', itinerary);
    	
    	if($scope.myFile != undefined)
    		fd.append('file', img);

    	fd.append('overview', overview);
    	fd.append('price_detail', price_detail);
    	fd.append('status', status);

    	$scope.loading = true;
    	$http({
    		method: 'POST',
    		url: url,
    		data: fd,
    		headers: { 'Content-Type': undefined},
        	//prevents serializing payload.  don't do it.
       	 	transformRequest: angular.identity
    	}).then(function success(response){
    		if(response.data.status){
    			$window.location = '#!tour/';
    		}else{
                $scope.error = true;
                $scope.error_message = response.data.message;
            }
    	}).finally(function(){
    		$scope.loading = false;
    	}); 
	}
});

app.directive('ckEditor', function () {
  	return {
	    require: '?ngModel',
	    link: function (scope, elm, attr, ngModel) {
	    
	      var ck = CKEDITOR.replace(elm[0]);
	      
	      if (!ngModel) return;
	      ck.on('instanceReady', function () {
	        ck.setData(ngModel.$viewValue);
	      });
	      function updateModel() {
	        scope.$apply(function () {
	          ngModel.$setViewValue(ck.getData());
	        });
	      }
	      ck.on('change', updateModel);
	      // ck.on('key', updateModel);
	      // ck.on('dataReady', updateModel);

	      ngModel.$render = function (value) {
	        ck.setData(ngModel.$viewValue);
	      };
	    }
  	};
});