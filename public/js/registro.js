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

		request.done(function(msg) {
			div.text(msg.message[0]);
			div.attr("class","alert alert-danger");
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

		request.done(function(msg) {
			div.text(msg.message[0]);
			div.attr("class","alert alert-danger");
		});
	});

});
