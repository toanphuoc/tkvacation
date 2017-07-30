app.controller('DestinationDetailController', function($scope, $rootScope, $http, $routeParams, $window){

	$rootScope.menu = {
		'destination' : true,
		'tour' : false,
		'booking' : false,
		'message' : false,
		'customize' : false,
		'blog': false
	};

	$http({
		method: 'GET',
		url: BASE_URL + 'destination/getDestinationById/' + $routeParams.id
	}).then(function success(response){
		$scope.des = response.data;
	});

	$scope.update = function(){

		var url = BASE_URL + 'destination/update?id=' + $routeParams.id + '&token=' + $rootScope.token;

		var title = $scope.des.title;
		var file = $scope.myFile;

        var fd = new FormData();
        fd.append('file', file);
    	fd.append('title', title);

    	$http({
    		method: 'POST',
    		url: url,
    		data: fd,
    		headers: { 'Content-Type': undefined},
        	//prevents serializing payload.  don't do it.
       	 	transformRequest: angular.identity
    	}).then(function success(response){
    		if(response.data.status){
    			$window.location = '#!/';
    		}
    	}); 
    }

});

app.directive('fileModel', function($parse){
	return {
		restrict: 'A',
		link : function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
             	scope.$apply(function(){
             		var f = element[0].files[0];
                	modelSetter(scope, f);
                	$("img").fadeIn("fast").attr('src',URL.createObjectURL(f));
             	});
          	});
		}
	};
});