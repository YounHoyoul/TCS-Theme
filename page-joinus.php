<?php
/*
Template Name: JoinUs
*/
?>
<?php get_header(); ?>

<!-- main content -->
<section class="container" >

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<!--<h1 class="page-title sixteen columns text-center"><?php the_title(); ?></h1>-->
		<?php // include (TEMPLATEPATH . '/inc/meta.php' ); ?>
		<h5 class="row sixteen columns pb25"><?php the_content(); ?></h5>
		<?php //wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>
		<?php // edit_post_link('Edit this entry.', '<p>', '</p>'); ?>
		<?php //comments_template(); ?>
	<?php endwhile; endif; ?>
	
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
