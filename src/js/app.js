$(document).ready(function() {
  $('#site-header #site-nav ul#nav-menu li a .effect').each(function() {
		$(this).attr('data-hover', $(this).html());
	});
});