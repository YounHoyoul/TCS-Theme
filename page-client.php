<?php
/*
Template Name: Client
*/
?>
<?php get_header(); ?>

<!-- main content -->
<section class="container">
	
	<h1 class="page-title sixteen columns text-center">Our Client</h1>
	
	<!-- Client -->
	<div class="row">
		<h5 class="text-center" style="padding-left:100px;padding-right:100px;margin-bottom:30px;">The Creative Shop is an interactive marketing agency - focusing on bridging the worlds of digital and tangible</h5>
		<!-- LOOP -->
		<?php
		$args = array( 
			'post_type' => 'client',
			'post_status' => 'publish',
			'posts_per_page' => 100,
			"meta_key" => "PrintOrder",
			"orderby" => "meta_value_num",
			"order" => "ASC"
		);
		$loop = new WP_Query( $args );
		?>
		
		<?php $ndx = 0;?>
		<?php while ($loop->have_posts() ) : $loop->the_post();?>
			<div class="one-third column">
				<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
				<?php 
				$sql = "select a.id
						  from $wpdb->posts a
						  join $wpdb->postmeta b 
							on a.id = b.post_id
						   and b.meta_key = 'project_client'
						 where a.post_type = 'project'
						   and a.post_status = 'publish'
						   and b.meta_value in (".$post->ID.")";
				$postids=$wpdb->get_col($sql);
				?>
				<?php if(count($postids) > 0): ?>
					<?php $pjtpost = get_post($postids[0]); ?>
					<a href="<?php echo $pjtpost->guid?>"><img title="<?php the_title();?>" src="<?php echo $image[0];?>" class="grayscale" style="display:none;"></a>
				<?php else: ?>
					<img title="<?php the_title();?>" src="<?php echo $image[0];?>" class="grayscale" style="display:none;">
				<?php endif;?>
			</div>
		
		<?php endwhile; ?>
		<?php wp_reset_query(); ?>
	</div><!-- /services -->
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
