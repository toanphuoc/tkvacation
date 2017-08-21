app.controller('TourCreateController', function($scope, $rootScope, $http, $window){
	$rootScope.menu = {
		'destination' : false,
		'tour' : true,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	$scope.checked = true;

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

	$scope.create = function(){

		$scope.error = false;

		var name = $scope.tour.name;
		var period = $scope.tour.period;
		var price = $scope.tour.price;
		var price_vnd = $scope.tour.price_vnd;
		var des = $('#tour_create .destination').val();
		var overview = $scope.tour.overview;
		var price_detail = $scope.tour.price_detail;
		var itinerary = $scope.tour.itinerary;
		var status = $scope.checked;

		var dateTime = $("#datepicker").datepicker( 'getDate' );
		if(dateTime == undefined){
			$scope.error = true;
            $scope.error_message = 'Please select tour availability.';
            return;
		}

		var availability =  dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();

		if($scope.myFile != undefined){
			var img = $scope.myFile;
			var size = $scope.myFile.size/1000000;
			if(size > 5){
	            $scope.error = true;
	            $scope.error_message = 'The maximum size of file is 5M';
	            return;
	        }
		}else{
			$scope.error = true;
            $scope.error_message = 'Please select tour picture.';
            return;
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
    	
    	if($scope.myFile != undefined)
    		fd.append('file', img);

    	fd.append('overview', overview);
    	fd.append('price_detail', price_detail);
    	fd.append('itinerary', itinerary);
    	fd.append('status', status);

    	var url = BASE_URL + 'tour/create?token=' + $rootScope.token

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