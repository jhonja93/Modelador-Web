$(document).ready(function(){
  $('div.dropdown-menu.dropdown-menu-right').on('click', function(event){
	    event.stopPropagation();
	});

	$('.diagrama').on('click', function(event){
		window.open('draw.html','_blank','','')
	});
});

function closethumbnail(object){
  var name = $(object).parents('a').children('.nameDiagram').text();
  if (confirm("Proceed to remove the diagram?") == true) {
    //Primero elimino de la base de datos
    var request = new XMLHttpRequest();
    console.log(name);
    request.open("DELETE","/diagram/"+name, true);
    request.send(null);
    //Luego elimino en el cliente
    $(object).parents('li').remove();
  }
}
