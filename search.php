<?php get_header(); ?>
<?php
$keyword = $_GET['s'];
$sql = "select a.id
		  from $wpdb->posts a
		 where a.post_type = 'project'
		   and a.post_title like '%".$keyword."%'
		 union
		select a.id
		  from $wpdb->posts a
		  join $wpdb->postmeta b 
			on a.id = b.post_id
		   and b.meta_key = 'project_client'
		 where a.post_type = 'project'
		   and a.post_status = 'publish'
		   and b.meta_value in (
				select x.id
				  from $wpdb->posts x
				 where x.post_type = 'client'
				   and x.post_status = 'publish'
				   and x.post_title like '%".$keyword."%'
				)";				
$postids=$wpdb->get_col($sql);
$args = array(
	'post_type' => 'project',
	'post_status' => 'publish',
	'post__in' => $postids,
	'meta_key' => 'project_order',
	'orderby' => 'meta_value_num',
	'order' => 'DESC');

$args = array_merge( $wp_query->query,$args);
query_posts( $args );
?>
<?php if (have_posts()) : ?>

	<!-- portfolio surround -->
	<section class="container">
	
		<h1 class="page-title sixteen columns text-center">Search Result</h1>

		<!-- portfolio sorting navigation -->
		<div class="row mb0">
			<div id="navsort" >
				<?php get_search_form(); ?>	
			</div>	
		</div><!-- /portfolio sorting navigation -->
		
		<?php include (TEMPLATEPATH . '/inc/portfolio.php' ); ?>

	</section><!-- /portfolio surround -->

	<?php //include (TEMPLATEPATH . '/inc/nav.php' ); ?>
	
<?php else : ?>

	<!-- portfolio surround -->
	<section class="container portfolio-content">
	
		<h1 class="page-title sixteen columns text-center">Nothing found</h1>
		
	</section><!-- /portfolio surround -->

<?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
<script>
	var global_filter = "*";
</script>
