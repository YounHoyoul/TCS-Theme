<?php
/**
Plugin Name: TCS Backend Customer Post Type For Director
Plugin URI: 
Description: a plugin to create backend modules
Version: 1.0
Author: Luis Hoyoul Youn
Author URI: 
License: GPL2
*/
?>
<?php
function tcs_hp_custom_post_Director() {
	$labels = array(
		'name'               => _x( 'Director', 'post type general name' ),
		'singular_name'      => _x( 'Director', 'post type singular name' ),
		'add_new'            => _x( 'Add New Director', 'Director' ),
		'add_new_item'       => __( 'Add New Director' ),
		'edit_item'          => __( 'Edit Director' ),
		'new_item'           => __( 'New Director' ),
		'all_items'          => __( 'All Director' ),
		'view_item'          => __( 'View Director' ),
		'search_items'       => __( 'Search Director' ),
		'not_found'          => __( 'No Director found' ),
		'not_found_in_trash' => __( 'No Director found in the Trash' ),
		'parent_item_colon'  => '',
		'menu_name'          => 'Director'
	);
	$args = array(
		'labels'        => $labels,
		'description'   => 'Holds our Director and Director specific data',
		'public'        => true,
		'rewrite'       => array('slug' => 'Director'),
		'menu_position' => 5,
		'supports'      => array( 'title', 'editor', 'excerpt', 'custom-fields', 'comments', 'thumbnail', 'revision' ),
		'has_archive'   => true,
		//'taxonomies'    => array( 'post_tag', 'category'),
		//'taxonomies'    => array( 'post_tag'),
	);
	register_post_type( 'director', $args );
}
add_action( 'init', 'tcs_hp_custom_post_Director' );

function tcs_hp_updated_messages_Director( $messages ) {
	global $post, $post_ID;
	$messages['director'] = array(
		0 => '',
		1 => sprintf( __('Director updated. <a href="%s">View Director</a>'), esc_url( get_permalink($post_ID) ) ),
		2 => __('Custom field updated.'),
		3 => __('Custom field deleted.'),
		4 => __('Director updated.'),
		5 => isset($_GET['revision']) ? sprintf( __('Director restored to revision from %s'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Director published. <a href="%s">View Director</a>'), esc_url( get_permalink($post_ID) ) ),
		7 => __('Director saved.'),
		8 => sprintf( __('Director submitted. <a target="_blank" href="%s">Preview Director</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
		9 => sprintf( __('Director scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Director</a>'), date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post_ID) ) ),
		10 => sprintf( __('Director draft updated. <a target="_blank" href="%s">Preview Director</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
	);
	return $messages;
}
add_filter( 'post_updated_messages', 'tcs_hp_updated_messages_Director' );

?>