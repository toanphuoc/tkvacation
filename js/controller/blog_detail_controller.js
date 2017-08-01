app.controller('BlogDetailController', function ($scope, $http, $routeParams, $filter, $window, $route, $rootScope) {

	$rootScope.menu = {
		'home': false,
		'destination': false,
		'customize' : false,
		'find_tour': false,
		'blog' : true,
		'contact' : false,
		'about' : false
	}

	$('.carousel').carousel({
	    interval: 5000 //changes the speed
	});

	$scope.prevCarouel = function(){
		$('.carousel').carousel('prev');
	}

	$scope.nextCarouel = function(){
		$('.carousel').carousel('next');
	}

	$scope.id = $routeParams.blog_id;
	$scope.fbcomments = "http://www.tkvacation.com/#!/blog/" + $scope.id;

	$http({
		method: 'GET',
		url: BASE_URL + 'blog/getBlog/' + $scope.id
	}).then(function successCallback(response){
		$scope.blog = response.data.blog;
		$scope.imgs = response.data.imgs;

		$scope.blog.date_created = $filter('date')(new Date($scope.blog.date_created),'MMMM dd, yyyy');
	});

	$http({
		method: 'GET',
		url: BASE_URL + 'blog/other/' + $scope.id
	}).then(function successCallback(response){
		$scope.otherBlogs = response.data;

		angular.forEach($scope.otherBlogs, function(value, key){
			value.date_created = $filter('date')(new Date(value.date_created),'MMMM dd, yyyy');
		});
	});
});

app.directive('fbCommentBox', function() {
  function createHTML(href, numposts, colorscheme, width) {
  	var html = '<div class="fb-comments" ' +
      'data-href="' + href + '" ' +
      'data-numposts="' + numposts + '" ' +
      'data-colorsheme="' + colorscheme + '" ' +
      'data-width="' + width + '">' +
      '</div>';
      console.log(html);
    return html;
  }

  return {
    restrict: 'A',
    scope: {},
    link: function postLink(scope, elem, attrs) {
      attrs.$observe('pageHref', function(newValue) {
        var href = newValue;
        console.log(href);
        var numposts = attrs.numposts || 5;
        var colorscheme = attrs.colorscheme || 'light';
        var width = attrs.width || '100%';
        elem.html(createHTML(href, numposts, colorscheme, width));
        FB.XFBML.parse(elem[0]);
      });
    }
  };


});