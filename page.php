<?php get_header(); ?>

<!-- main content -->
<section class="container">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<h1 class="page-title sixteen columns text-center"><?php the_title(); ?></h1>
		<?php // include (TEMPLATEPATH . '/inc/meta.php' ); ?>
		<h5 class="row sixteen columns text-center pb25"><?php the_content(); ?></h5>
		<?php //wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>
		<?php // edit_post_link('Edit this entry.', '<p>', '</p>'); ?>
		<?php //comments_template(); ?>
	<?php endwhile; endif; ?>
	
	<!-- services -->
	<div class="row">

		<div class="one-third column service">
			<h2 class="serv"><a href="?project_category=digital-platform" class="platform"><span></span>PLATFORM</a></h2>
			<?php 
				$term = get_term_by( 'slug', 'brand-activation', 'project_category' ); 
				$description = preg_replace('/\n/','<br/>',$term->description);
			?>
			<p><?php echo $description; ?></p>
			<a href="?project_category=brand-activation" class="gotobtn">Go to related work
				<span><img src="<?php bloginfo('template_directory'); ?>/images/related_work_arrow.png"></span>
			</a>
		</div>

		<div class="one-third column service">
			<h2 class="serv"><a href="?project_category=bespoke-solution" class="bespoke"><span></span>BESPOKE</a></h2>
			<?php 
				$term = get_term_by( 'slug', 'bespoke-solution', 'project_category' ); 
				$description = preg_replace('/\n/','<br/>',$term->description);
			?>
			<p><?php echo $description; ?></p>
			<a href="?project_category=bespoke-solution" class="gotobtn">Go to related work 
				<span><img src="<?php bloginfo('template_directory'); ?>/images/related_work_arrow.png"></span></a>
		</div>

		<div class="one-third column service">
			<h2 class="serv"><a href="?project_category=rental" class="rental"><span></span>RENTAL</a></h2>
			<?php 
				$term = get_term_by( 'slug', 'rental', 'project_category' ); 
				$description = preg_replace('/\n/','<br/>',$term->description);
			?>
			<p><?php echo $description; ?></p>
			<a href="?project_category=rental" class="gotobtn">Go to related work 
				<span><img src="<?php bloginfo('template_directory'); ?>/images/related_work_arrow.png"></span></a>
		</div>
		
	</div><!-- /services -->
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
