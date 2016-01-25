$(document).ready(function(){
	$('#botonLogin').on("click",function(e){
		var div = $(".messageL").empty();
		console.log("click");
		e.preventDefault();
		var request = $.ajax({
			method: "POST",
			url: "/auth/login",
			//dataType : "application/json",
			data:{ user: $('#user').val(), password: $('#password').val() }
		});

		request.done(function(json) {
			if(json.message != undefined){
				console.log(json.message);
				alert(json.message);
			}else{
				window.location.href = "/user/local/"+json.user;
			}

			//var json = JSON.stringify(msg);
			//console.log(json);
  		// div.text(json.message);
			// div.attr("class","alert alert-danger");
		});
	});

	$('#botonRegistrar').on("click",function(e){
		var div = $(".messageR").empty();
		e.preventDefault();
		var request = $.ajax({
			method: "POST",
			url: "/auth/signup",
			//dataType : "application/json",
			data:{ user: $('#userR').val(), password: $('#passwordR').val() }
		});

		request.done(function(json) {
			if(json.message != undefined){
				console.log(json.message);
				alert(json.message);
			}else{
				window.location.href = "/user/local/"+json.user;
			}
		});
	});

});
