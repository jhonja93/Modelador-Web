$(document).ready(function(){
	$('#formLogin').validate({
		rules: {
            user: {
                minlength:"5",
								maxlength:"10",
								required: true
            },
            password: {
                required: true,
                minlength:"6",
								maxlength: "20"
            }
        }
	});

	$('#botonLogin').on("click",function(e){
		var $user = $('#user');
		var $password = $('#password');

		$user.keypress(function(){
			$user.css("border","");
		});
		$password.keypress(function(){
				$password.css("border","");
		});

		if($user.val()=="" || $password.val()==""){
			$('.alerts:first').empty();
			var html = '<div data-alert class="alert-box alert alert-danger round" style="margin-bottom: 0px;">'
				 + "Please fill the required fields" + '</div>';
			$('.alerts:first').append(html);

			if($user.val() == "") {$user.css("border","2px solid red");}
			if($password.val() == "") {$password.css("border","2px solid red");}

			return false;
		}else{
			$('.alerts:first').empty();
		}

		e.preventDefault();
		var request = $.ajax({
			method: "POST",
			url: "/auth/login",
			//dataType : "application/json",
			data:{ user: $user.val(), password: $password.val() }
		});

		request.done(function(json) {
			$('.alerts:first').empty();
			if(json.message != undefined ){
				var html = '<div data-alert class="alert-box alert alert-danger round" style="margin-bottom: 0px;">'
					 + json.message + '</div>';

				console.log(json.message);
				$user.val("");
				$password.val("");
				$('.alerts:first').append(html);
			}else{
				window.location.href = "/user/local/"+json.user;
			}

		});
	});

		$('#formRegistro').validate({
			rules: {
						userR: {
								minlength:"5",
								maxlength:"10",
								required: true
						},
						passwordR: {
								minlength:"6",
								maxlength: "20",
								required: true
						}
					}
		});

	$('#botonRegistrar').on("click",function(e){
		var $user = $('#userR');
		var $password = $('#passwordR');

		$user.keypress(function(){
			$user.css("border","");
		});
		$password.keypress(function(){
				$password.css("border","");
		});

		if($user.val()=="" || $password.val()==""){
			$('.alerts:nth-child(2)').empty();
			var html = '<div data-alert class="alert-box alert alert-danger round" style="margin-bottom: 0px;">'
				 + "Please fill the required fields" + '</div>';
			$('.alerts:nth-child(2)').append(html);

			if($user.val() == "") {$user.css("border","2px solid red");}
			if($password.val()=="") {$password.css("border","2px solid red");}

			return false;
		}else{
			$('.alerts:nth-child(2)').empty();
		}

		e.preventDefault();
		var request = $.ajax({
			method: "POST",
			url: "/auth/signup",
			//dataType : "application/json",
			data:{ user: $user.val(), password: $password.val() }
		});

		request.done(function(json) {
			$('.alerts:nth-child(2)').empty();
			if(json.message != undefined ){
				var html = '<div data-alert class="alert-box alert alert-danger round" style="margin-bottom: 0px;">'
					 + json.message + '</div>';

				console.log(json.message);
				$user.val("");
				$password.val("");
				$('.alerts:nth-child(2)').append(html);
				//alert(json.message);
			}else{
				window.location.href = "/user/local/"+json.user;
			}
		});
	});

});
