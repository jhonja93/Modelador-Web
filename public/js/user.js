$(document).ready(function(){
    $('div.dropdown-menu.dropdown-menu-right').on('click', function(event){
	    event.stopPropagation();
	});
	$('.diagrama').on('click', function(event){
		window.open('draw.html','_blank','','')
	});
	$('.close').click(function(){
	  $(this).parents('.thumbnail').remove();
	})
});