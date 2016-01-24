$(document).ready(function(){
	$('#botonLogin').click(function(){
		alert($('#user').val());
		var request = $.ajax({
			method: "POST",
			url: "/auth/login",
			//dataType : "application/json",
			data:{ user: $('#user').val(), password: $('#password').val() }
		});

		request.done(function(msg) {
			console.log(msg.message[0]);
			// var $div = $('<div></div>')
			// 	 .append("<strong></strong>")
			// 	 .append(msg);
			// $div.insertBefore(".modal-title .title");
		});
	});
});