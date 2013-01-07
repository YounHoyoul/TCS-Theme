<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7 "> <![endif]-->
<!--[if IE 7]><html class="no-js lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]><html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"> <!--<![endif]-->
<head profile="http://gmpg.org/xfn/11">
	<!-- Basic Page Needs
	================================================== -->
	<meta charset="<?php bloginfo('charset'); ?>">
	<?php if (is_search()) { ?>
		<meta name="robots" content="noindex, nofollow" /> 
	<?php } ?>

	<title>
	<?php
		if (function_exists('is_tag') && is_tag()) {
			single_tag_title("Tag Archive for &quot;"); echo '&quot; - '; }
		elseif (is_archive()) {
			wp_title(''); echo ' Archive - '; }
		elseif (is_search()) {
			echo 'Search for &quot;'.wp_specialchars($s).'&quot; - '; }
		elseif (!(is_404()) && (is_single()) || (is_page())) {
			wp_title(''); echo ' - '; }
		elseif (is_404()) {
			echo 'Not Found - '; }
		if (is_home()) {
			bloginfo('name'); echo ' - '; bloginfo('description'); }
		else {
			bloginfo('name'); }
		if ($paged>1) {
			echo ' - page '. $paged; }
	?>
	</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="images/favicon.ico">
	<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

	<!-- CSS
	================================================== -->
	<link href='http://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" />
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/stylesheets/base.css" type="text/css" />
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/stylesheets/style1.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/javascripts/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script> 
	<![endif]-->

	<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>
	
	<script src="<?php bloginfo('template_directory'); ?>/javascripts/jquery-1.7.2.min.js" type="text/javascript" ></script>
	<script src="http://ajax.microsoft.com/ajax/jquery.validate/1.7/jquery.validate.pack.js" type="text/javascript" ></script>
	<script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.js" type="text/javascript" ></script>
	<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript" ></script>
	
	<?php wp_head(); ?>
	
</head>
<body <?php body_class(); ?>>
<div class="boxed" >
	<!-- header tagline, social -->
	<div class="header-social-container">
		<div class="container">
			<div class="eight columns">
				<p class="tagline">
				<a href="<?php echo get_option('home'); ?>/"><image src="<?php bloginfo('template_directory'); ?>/images/tcs_logo_gray_text.png" height="23px" /></a>
				</p>
			</div>

			<div class="eight columns">
				<div class="social">
					
					<!--<a href="#" class="tip dribbble" title="Dribbble">Dribbble</a>-->
					<!--<a href="#" class="tip stumble" title="Stumble Upon">Stumble Upon</a>-->
					<!--<a href="#" class="tip vimeo" title="Vimeo">Vimeo</a>-->
					<!--<a href="#" class="tip pin" title="Pinterest">Pinterest</a>-->
					<!--<a href="#" class="tip plus" title="Google+">Google+</a>-->
					<a href="https://twitter.com/thecreativeshop" class="tip twitter" title="Twitter">Twitter</a>
					<a href="http://www.flickr.com/photos/65195433@N07/" class="tip flickr" title="Flickr">Flickr</a>
					<a href="http://www.facebook.com/TheCreativeShopAustralia?fref=ts" class="tip facebook" title="Facebook">Facebook</a>
				</div>
			</div>
		
		</div>

		<div class="head-stitch"></div>
	</div><!-- /header tagline, social -->


	<!-- header -->
	<header class="container">
		<div class="sixteen columns">
			
			<!-- logo -->
			<!--
			<h1 id="logo">
				<a href="<?php echo get_option('home'); ?>/"><?php bloginfo('name'); ?></a>
			</h1>
			-->
			<!-- /logo -->

			<!-- main navigation -->
			<!--
			<div id="pattern" class="pattern row mt25">
		 
				<a href="#menu" class="menu-link">Menu</a>
				<nav id="menu" class="menu">
					<ul class="level-1">

						<li class="has-subnav">
							<a href="#">About TCS</a>
							<ul class="level-2" >
								<li><a href="index-video.html">Business Silos</a></li>
								<li><a href="index-video.html">Executives</a></li>
								<li><a href="index-video.html">Client</a></li>
							</ul>
						</li>
						
						<li class="has-subnav">
							<a href="#">Works</a>
							<ul class="level-2" >
								<li><a href="index-video.html">ALL</a></li>
								<li><a href="index-video.html">Brand Activation</a></li>
								<li><a href="index-video.html">Bespoke Solution</a></li>
								<li><a href="index-video.html">Digital Platform</a></li>
							</ul>
						</li>
						
						<li class="has-subnav">
							<a href="#">Products</a>
							<ul class="level-2" >
								<li><a href="index-video.html">ALL</a></li>
								<li><a href="index-video.html">Rental</a></li>
								<li><a href="index-video.html">Semi-Permanent</a></li>
								<li><a href="index-video.html">Permanent</a></li>
							</ul>
						</li>
						
						<li><a href="contact.php">News</a></li>
						
						<li class="has-subnav">
							<a href="#">Contact Us</a>
							<ul class="level-2" >
								<li><a href="index-video.html">Business Inquiry</a></li>
								<li><a href="index-video.html">Location & Contact</a></li>
								<li><a href="index-video.html">Current Recruitment</a></li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
			-->
			<!-- /main navigation -->
			<div id="pattern" class="pattern row mt25">
				<a href="#menu" class="menu-link">Menu</a>
				<nav id="menu" class="menu">
				<?php $defaults = array(
						'theme_location'  => 'primary',
						'menu'            => '', 
						'container'       => false, 
						//'container_class' => 'menu-{menu slug}-container', 
						//'container_id'    => '',
						'menu_class'      => 'level-1', 
						'menu_id'         => '',
						'echo'            => true,
						//'fallback_cb'     => 'wp_page_menu',
						'before'          => '',
						'after'           => '',
						'link_before'     => '',
						'link_after'      => '',
						'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
						'depth'           => 0,
						'walker'          => ''
					); ?>
				<?php wp_nav_menu( $defaults ); ?>

				</nav>
			</div>
		</div> 
	</header><!-- /header -->


