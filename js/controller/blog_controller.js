app.controller('BlogController', function ($scope) {
	$('#blog').find('img').each(function(index, el) {

		var img = $(el);
		
		// console.log(img.naturalHeight,    img.naturalWidth);
		// console.log($("#img1").height(),  $("#img1").width());

		var theImage = new Image();
		theImage.src = $(el).attr("src");
		console.log(theImage.height);
		console.log(theImage.width);
		// console.log(theImage.naturalHeight);
		// console.log(theImage.naturalWidth);
		// if(theImage.height > theImage.width){
		// 	$(el).addClass('rotate');
		// }
	});
});