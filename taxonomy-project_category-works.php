<?php get_header(); ?>

<?php
global $wp_query;
$args = array( 
	'post_type' => 'project',
	'post_status' => 'publish',
	'posts_per_page' => 100,
	'meta_key' => 'project_order',
	'orderby' => 'meta_value_num',
	'order' => 'DESC');
$args = array_merge( $wp_query->query,$args);
query_posts( $args );
?>

<?php if (have_posts()) : ?>

	<!-- portfolio surround -->
	<section class="container">
	
		<h1 class="page-title sixteen columns text-center">Our Work</h1>

		<!-- portfolio sorting navigation -->
		<div class="row mb0">
			<div id="navsort" >
				<ul style="float:left;">
					<li><a href="" id="cat_all" title="*">All</a></li>
					<li><a href="" id="cat_barnd" title="brand-activation">Brand Activation</a></li>
					<li><a href="" id="cat_bespoke" title="bespoke-solution">Bespoke Solution</a></li>
					<li><a href="" id="cat_digital" title="digital-platform">Digital Platform</a></li>
				</ul>
				
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
