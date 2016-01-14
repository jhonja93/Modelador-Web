function iniciar(){
	document.getElementById("botonLogin").addEventListener("click",autenticar,false);
}

function procesarInformacion(event) {
	var respond = event.target.responseText;
	var json = JSON.parse(respond);
	if(json.error!=null){
		alert(json.error);
	}
}


function autenticar(){
	var valid=document.autenticacion.checkValidity();
	if(valid){
		var inputUser=document.getElementById"#user");
		var inputUser=document.getElementById"#password");
		var request = new XMLHttpRequest();
		var url="/index";
		request.open("POST",url,true);
		request.addEventListener('load',procesarInformacionUsuario ,false);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		inputs=document.getElementById("formLogin").getElementsByTagName("input");
		usuario=inputs[0].value;
		password=inputs[1].value;
		request.send(JSON.stringify({usuario:usuario,contraseña:password}));
	}else{
		var inputs=document.querySelectorAll("#autenticacion div input");
		for(var i=0; i<inputs.length;i++){
			if(inputs[i].validity.valid==false){
				inputs[i].style.background="#ffccc0";//se cambia de color los inputs con campos incorrectos
			}
		}
		alert("Ingrese los campos correctamente");
	}
}


window.addEventListener('load',iniciar,false);
