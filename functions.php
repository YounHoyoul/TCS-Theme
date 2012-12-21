<?php
	
	add_theme_support('post-thumbnails');
	
	require( get_template_directory() . '/includes/custometype_news.php' );
	require( get_template_directory() . '/includes/custometype_projects.php' );
	require( get_template_directory() . '/includes/custometype_director.php' );
	require( get_template_directory() . '/includes/custometype_client.php' );
	
	// Add RSS links to <head> section
	automatic_feed_links();
	
	// Load jQuery
	if ( !is_admin() ) {
		//wp_deregister_script('jquery');
		//wp_register_script('jquery', ("http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"), false);
		//wp_enqueue_script('jquery');
	}
	
	// Clean up the <head>
	function tcs_removeHeadLinks() {
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
	}
	add_action('init', 'tcs_removeHeadLinks');
	remove_action('wp_head', 'wp_generator');

	if (function_exists('register_sidebar')) {
		register_sidebar(array(
			'name' => 'Sidebar Widgets',
			'id'   => 'sidebar-widgets',
			'description'   => 'These are widgets for the sidebar.',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2>',
			'after_title'   => '</h2>'
		));
		register_sidebar(array(
			'name' => 'Sidebar FB Widgets',
			'id'   => 'sidebar-fb-widgets',
			'description'   => 'This sidebar is for only FaceBook.',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2>',
			'after_title'   => '</h2>'
		));
	}

	register_nav_menu( 'primary', 'Primary Menu' );
	register_nav_menu( 'secondary', 'Secondary Menu' );
	
	$hasSubNav = true;
	function wp_nav_menu_remove_attributes( $menu ){
		global $hasSubNav;
		//return $menu = preg_replace('/ id=\"(.*)\" class=\"(.*)\"/iU', '', $menu );
		$menu = str_replace('sub-menu', 'level-2', $menu );
		$xml = new SimpleXMLElement($menu);
		foreach($xml->li as $li) {
			if($li->count() > 1){
				$menu = str_replace($li['class'], 'has-subnav', $menu );
			}
		}
		return $menu;
	}
	add_filter( 'wp_nav_menu', 'wp_nav_menu_remove_attributes' );
	
	add_filter('admin_init', 'tcs_general_settings_register_phone1');
	function tcs_general_settings_register_phone1()
	{
		register_setting('general', 'phone1', 'esc_attr');
		add_settings_field('phone1', '<label for="phone1">'.__('Phone#1' , 'tcs_theme' ).'</label>' , 'tcs_general_settings_phone1_html', 'general');
	}
	function tcs_general_settings_phone1_html()
	{
		$value = get_option( 'phone1', '' );
		echo '<input type="text" id="phone1" name="phone1" value="' . $value . '" />';
	}
	
	add_filter('admin_init', 'tcs_general_settings_register_phone2');
	function tcs_general_settings_register_phone2()
	{
		register_setting('general', 'phone2', 'esc_attr');
		add_settings_field('phone2', '<label for="phone2">'.__('Phone#2' , 'tcs_theme' ).'</label>' , 'tcs_general_settings_phone2_html', 'general');
	}
	function tcs_general_settings_phone2_html()
	{
		$value = get_option( 'phone2', '' );
		echo '<input type="text" id="phone2" name="phone2" value="' . $value . '" />';
	}
	
	add_filter('admin_init', 'tcs_general_settings_register_addr1');
	function tcs_general_settings_register_addr1()
	{
		register_setting('general', 'addr1', 'esc_attr');
		add_settings_field('addr1', '<label for="addr1">'.__('Address#1' , 'tcs_theme' ).'</label>' , 'tcs_general_settings_addr1_html', 'general');
	}
	function tcs_general_settings_addr1_html()
	{
		$value = get_option( 'addr1', '' );
		echo '<input type="text" id="addr1" name="addr1" value="' . $value . '" size="40" />';
	}
	
	add_filter('admin_init', 'tcs_general_settings_register_addr2');
	function tcs_general_settings_register_addr2()
	{
		register_setting('general', 'addr2', 'esc_attr');
		add_settings_field('addr2', '<label for="addr2">'.__('Address#2' , 'tcs_theme' ).'</label>' , 'tcs_general_settings_addr2_html', 'general');
	}
	function tcs_general_settings_addr2_html()
	{
		$value = get_option( 'addr2', '' );
		echo '<input type="text" id="addr2" name="addr2" value="' . $value . '" size="40" />';
	}
	
	add_filter('admin_init', 'tcs_general_settings_register_addr3');
	function tcs_general_settings_register_addr3()
	{
		register_setting('general', 'addr3', 'esc_attr');
		add_settings_field('addr3', '<label for="addr3">'.__('Address#3' , 'tcs_theme' ).'</label>' , 'tcs_general_settings_addr3_html', 'general');
	}
	function tcs_general_settings_addr3_html()
	{
		$value = get_option( 'addr3', '' );
		echo '<input type="text" id="addr3" name="addr3" value="' . $value . '" size="40" />';
	}
	
	add_filter('admin_init', 'tcs_general_settings_register_company_info');
	function tcs_general_settings_register_company_info()
	{
		register_setting('general', 'companyinfo', 'esc_attr');
		add_settings_field('companyinfo', '<label for="companyinfo">'.__('Company Info' , 'tcs_theme' ).'</label>' , 'tcs_general_settings_companyinfo_html', 'general');
	}
	function tcs_general_settings_companyinfo_html()
	{
		$value = get_option( 'companyinfo', '' );
		echo '<textarea type="text" id="companyinfo" name="companyinfo" cols="50" rows="5">'.$value.'</textarea>';
	}
?>