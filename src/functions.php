<?php
show_admin_bar(false);

function headerImports () {
  if ($GLOBALS['pagenow'] !== 'wp-login.php') {
    wp_deregister_script('jquery');
    wp_register_script('jquery', get_template_directory_uri() . '/js/lib/jquery.min.js', array(), '3.3.1');

    wp_register_script('custom-script', get_template_directory_uri() . '/js/app.js', array('jquery'), '1.0.0');
   
    wp_enqueue_script('custom-script');
  }
}
add_action('wp_head', 'headerImports');

