<?php
/**
Plugin Name: TCS Backend Customer Post Type For Client
Plugin URI: 
Description: a plugin to create backend modules
Version: 1.0
Author: Luis Hoyoul Youn
Author URI: 
License: GPL2
*/
?>
<?php
function tcs_hp_custom_post_Client() {
	$labels = array(
		'name'               => _x( 'Client', 'post type general name' ),
		'singular_name'      => _x( 'Client', 'post type singular name' ),
		'add_new'            => _x( 'Add New Client', 'Client' ),
		'add_new_item'       => __( 'Add New Client' ),
		'edit_item'          => __( 'Edit Client' ),
		'new_item'           => __( 'New Client' ),
		'all_items'          => __( 'All Client' ),
		'view_item'          => __( 'View Client' ),
		'search_items'       => __( 'Search Client' ),
		'not_found'          => __( 'No Client found' ),
		'not_found_in_trash' => __( 'No Client found in the Trash' ),
		'parent_item_colon'  => '',
		'menu_name'          => 'Client'
	);
	$args = array(
		'labels'        => $labels,
		'description'   => 'Holds our Client and Client specific data',
		'public'        => true,
		'rewrite'       => array('slug' => 'Client'),
		'menu_position' => 5,
		'supports'      => array( 'title', 'editor','thumbnail', 'custom-fields' ,'revision' ),
		'has_archive'   => true,
		//'taxonomies'    => array( 'post_tag', 'category'),
		//'taxonomies'    => array( 'post_tag'),
	);
	register_post_type( 'client', $args );
}
add_action( 'init', 'tcs_hp_custom_post_Client' );

function tcs_hp_updated_messages_Client( $messages ) {
	global $post, $post_ID;
	$messages['Client'] = array(
		0 => '',
		1 => sprintf( __('Client updated. <a href="%s">View Client</a>'), esc_url( get_permalink($post_ID) ) ),
		2 => __('Custom field updated.'),
		3 => __('Custom field deleted.'),
		4 => __('Client updated.'),
		5 => isset($_GET['revision']) ? sprintf( __('Client restored to revision from %s'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Client published. <a href="%s">View Client</a>'), esc_url( get_permalink($post_ID) ) ),
		7 => __('Client saved.'),
		8 => sprintf( __('Client submitted. <a target="_blank" href="%s">Preview Client</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
		9 => sprintf( __('Client scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Client</a>'), date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post_ID) ) ),
		10 => sprintf( __('Client draft updated. <a target="_blank" href="%s">Preview Client</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
	);
	return $messages;
}
add_filter( 'post_updated_messages', 'tcs_hp_updated_messages_Client' );

?>