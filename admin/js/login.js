jQuery(document).ready(function($) {
	

	$('#login-submit').bind('click', function(event) {
		var user = $('#username').val();
		var password = $('#password').val();
		if(user === '' || user.length == 0){
			return;
		}

		if(password === '' || password.length == 0){
			return;
		}

		$.ajax({
			url: BASE_URL + 'user/login',
			type: 'POST',
			dataType: 'json',
			data: {username: user, password: password},
			success: function(response){
				if(response.status){
					$.cookie('token', response.token, { expires: 1 });
					$.cookie('user', user, { expires: 1 });

					window.location.href = '/admin'
				}else{
					alert('User or password is not match.');
				}
			}
		});
		
	});
});