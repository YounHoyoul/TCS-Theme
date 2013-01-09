<!-- portfolio content -->
<div id="portfolio-content" class="sort fourcol">
<?php while (have_posts() ) : the_post();?>
	
	<?php
		$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "slugs"));
		$class_list = implode(" ", $term_list);
	?>
	<!-- category -->
	<div class="<?php echo $class_list; ?> projects" style="display:none;">
		<!-- portfolio item -->
		<?php include (TEMPLATEPATH . '/inc/portfolio-item.php' ); ?>
		<!-- /portfolio item -->
	</div><!-- /category -->
<?php endwhile; ?>
</div>