$(document).ready(function(){

$('.login-form').hide();
$('.espol').click(function(e){
  e.preventDefault();
  $('.login-form').show().animate({'top':'-300px'},250);
  $('.social').slideUp("slow");
  $('.modal-backdrop.fade.in').css("z-index","0");
});
$('.form-close').click(function(e){
  e.preventDefault();
  $('.login-form').animate({'top':'-50%'},300).hide();
  $('.social').show().animate({'top':'300'},250);
});

	jQuery(window).load(function() {
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$('.page-scroll a').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});

});
