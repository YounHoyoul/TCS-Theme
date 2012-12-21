<?php
/**
Plugin Name: TCS Backend Customer Post Type For News
Plugin URI: 
Description: a plugin to create backend modules
Version: 1.0
Author: Luis Hoyoul Youn
Author URI: 
License: GPL2
*/
?>
<?php
function tcs_hp_custom_post_News() {
	$labels = array(
		'name'               => _x( 'News', 'post type general name' ),
		'singular_name'      => _x( 'News', 'post type singular name' ),
		'add_new'            => _x( 'Add New News', 'news' ),
		'add_new_item'       => __( 'Add New News' ),
		'edit_item'          => __( 'Edit News' ),
		'new_item'           => __( 'New News' ),
		'all_items'          => __( 'All News' ),
		'view_item'          => __( 'View News' ),
		'search_items'       => __( 'Search News' ),
		'not_found'          => __( 'No News found' ),
		'not_found_in_trash' => __( 'No News found in the Trash' ),
		'parent_item_colon'  => '',
		'menu_name'          => 'News'
	);
	$args = array(
		'labels'        => $labels,
		'description'   => 'Holds our News and News specific data',
		'public'        => true,
		'rewrite'       => array('slug' => 'news'),
		'menu_position' => 5,
		'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revision' ),
		'has_archive'   => true,
		//'taxonomies'    => array( 'post_tag', 'category'),
		'taxonomies'    => array( 'post_tag'),
	);
	register_post_type( 'news', $args );
}
add_action( 'init', 'tcs_hp_custom_post_News' );

function tcs_hp_updated_messages_news( $messages ) {
	global $post, $post_ID;
	$messages['news'] = array(
		0 => '',
		1 => sprintf( __('News updated. <a href="%s">View news</a>'), esc_url( get_permalink($post_ID) ) ),
		2 => __('Custom field updated.'),
		3 => __('Custom field deleted.'),
		4 => __('News updated.'),
		5 => isset($_GET['revision']) ? sprintf( __('News restored to revision from %s'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('News published. <a href="%s">View news</a>'), esc_url( get_permalink($post_ID) ) ),
		7 => __('News saved.'),
		8 => sprintf( __('News submitted. <a target="_blank" href="%s">Preview news</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
		9 => sprintf( __('News scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview news</a>'), date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post_ID) ) ),
		10 => sprintf( __('News draft updated. <a target="_blank" href="%s">Preview news</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
	);
	return $messages;
}
add_filter( 'post_updated_messages', 'tcs_hp_updated_messages_news' );

function tcs_hp_contextual_help_news( $contextual_help, $screen_id, $screen ) {
	if ( 'news' == $screen->id ) {
		$contextual_help = '<h2>News</h2>
		<p>News show the details of the items that we have made so far. You can see a list of them on this page in reverse chronological order - the latest one we added is first.</p>
		<p>You can view/edit the details of each news by clicking on its name, or you can perform bulk actions using the dropdown menu and selecting multiple items.</p>';
	} elseif ( 'edit-news' == $screen->id ) {
		$contextual_help = '<h2>Editing News</h2>
		<p>This page allows you to view/modify news details. Please make sure to fill out the available boxes with the appropriate details.</p>';
	}
	return $contextual_help;
}
add_action( 'contextual_help', 'tcs_hp_contextual_help_news', 10, 3 );

/*
function tcs_hp_taxonomies_news() {
	$labels = array(
		'name'              => _x( 'News Categories', 'taxonomy general name' ),
		'singular_name'     => _x( 'News Category', 'taxonomy singular name' ),
		'search_items'      => __( 'Search News Categories' ),
		'all_items'         => __( 'All News Categories' ),
		'parent_item'       => __( 'Parent News Category' ),
		'parent_item_colon' => __( 'Parent News Category:' ),
		'edit_item'         => __( 'Edit News Category' ),
		'update_item'       => __( 'Update News Category' ),
		'add_new_item'      => __( 'Add New News Category' ),
		'new_item_name'     => __( 'New News Category' ),
		'menu_name'         => __( 'News Categories' ),
	);
	$args = array(
		'labels' => $labels,
		'hierarchical' => true,
	);
	register_taxonomy( 'news_category', 'news', $args );
}
add_action( 'init', 'tcs_hp_taxonomies_news', 0 );
*/

//Post Meta Boxes
add_action( 'add_meta_boxes', 'tcs_hp_news_additional_box' );
function tcs_hp_news_additional_box() {
	add_meta_box(
		'tcs_hp_news_additional_box',
		__( 'News Additional Information', 'tcs_theme' ),
		'tcs_hp_news_additional_box_content',
		'news',
		'normal',
		'high'
	);
}

function tcs_hp_news_additional_box_content($argpost){
?>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
	<style> .media-upload h2 { font-weight: bold; } 
		.tcs_hp_news_textarea {
			width:100%;
			height:80px;
		}
		.tcs_hp_news_input {
			width:80%;
		}
		.tcs_hp_additional{
			display:none;
		}
	</style>
	<script>
	( function( $ ) {
		$(document).ready(function(){
			$( "#news_date" ).datepicker({ dateFormat: "yy-mm-dd" });
		});
	})( jQuery );
	</script>
<?php
	wp_nonce_field( plugin_basename( __FILE__ ), 'tcs_hp_news_additional_box_content' );
	/*
	echo '<p><label for="news_order">Order :</label>';
	echo '<input type="text" maxlength="4" id="news_order" name="news_order" placeholder="Enter the Order" value="'.get_post_meta($argpost->ID,'news_order',true).'"></p>';
	*/
	
	echo '<p><label for="news_date">Date :</label>';
	echo '<input type="text" maxlength="4" id="news_date" name="news_date" placeholder="Enter the year" value="'.get_post_meta($argpost->ID,'news_date',true).'"></p>';
	
	echo '<p><label for="news_ref">Referrence :</label>';
	echo '<input type="text" id="news_ref" name="news_ref" placeholder="enter a url of referrence" value="'.get_post_meta($argpost->ID,'news_ref',true).'" class="tcs_hp_news_input"></p>';
	
	echo '<p><label for="news_movie">Movie :</label>';
	echo '<input type="text" id="news_movie" name="news_movie" placeholder="enter a url of moive" value="'.get_post_meta($argpost->ID,'news_movie',true).'" class="tcs_hp_news_input"></p>';

	echo '<p><label for="news_photo1">Photo1 :</label>';
	echo '<input type="text" id="news_photo1" name="news_photo1" placeholder="enter a url of photo" value="'.get_post_meta($argpost->ID,'news_photo1',true).'" class="tcs_hp_news_input"></p>';
	echo '<p><label for="news_photo2">Photo2 :</label>';
	echo '<input type="text" id="news_photo2" name="news_photo2" placeholder="enter a url of photo" value="'.get_post_meta($argpost->ID,'news_photo2',true).'" class="tcs_hp_news_input"></p>';
	echo '<p><label for="news_photo3">Photo3 :</label>';
	echo '<input type="text" id="news_photo3" name="news_photo3" placeholder="enter a url of photo" value="'.get_post_meta($argpost->ID,'news_photo3',true).'" class="tcs_hp_news_input"></p>';
	echo '<p><label for="news_photo4">Photo4 :</label>';
	echo '<input type="text" id="news_photo4" name="news_photo4" placeholder="enter a url of photo" value="'.get_post_meta($argpost->ID,'news_photo4',true).'" class="tcs_hp_news_input"></p>';

}

add_action( 'save_post', 'tcs_hp_news_additional_box_save' );
function tcs_hp_news_additional_box_save( $post_id ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
	return;
	if ( !wp_verify_nonce( $_POST['tcs_hp_news_additional_box_content'], plugin_basename( __FILE__ ) ) )
	return;
	if ( 'news' == $_POST['post_type'] ) {
		if ( !current_user_can( 'edit_page', $post_id ) )
		return;
	} else {
		if ( !current_user_can( 'edit_post', $post_id ) )
		return;
	}

	//news_date
	//update_post_meta( $post_id, 'news_order', $_POST['news_order'] );
	
	//news_date
	update_post_meta( $post_id, 'news_date', $_POST['news_date'] );
	
	//news_ref
	update_post_meta( $post_id, 'news_ref', $_POST['news_ref'] );
	
	//news_movie
	update_post_meta( $post_id, 'news_movie', $_POST['news_movie'] );
	
	//news_photo
	update_post_meta( $post_id, 'news_photo1', $_POST['news_photo1'] );
	update_post_meta( $post_id, 'news_photo2', $_POST['news_photo2'] );
	update_post_meta( $post_id, 'news_photo3', $_POST['news_photo3'] );
	update_post_meta( $post_id, 'news_photo4', $_POST['news_photo4'] );
	
}
?>