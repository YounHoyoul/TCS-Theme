<?php get_header(); ?>

<!-- main content -->
<section class="container">
		<?php if (have_posts()) : ?>

 			<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>

			<?php /* If this is a category archive */ if (is_category()) { ?>
				<h2>Archive for the &#8216;<?php single_cat_title(); ?>&#8217; Category</h2>

			<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				<h2>Posts Tagged &#8216;<?php single_tag_title(); ?>&#8217;</h2>

			<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h2>Archive for <?php the_time('F jS, Y'); ?></h2>

			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h2>Archive for <?php the_time('F, Y'); ?></h2>

			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h2 class="pagetitle">Archive for <?php the_time('Y'); ?></h2>

			<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h2 class="pagetitle">Author Archive</h2>

			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2 class="pagetitle">Blog Archives</h2>
			
			<?php } ?>

			<?php // include (TEMPLATEPATH . '/inc/nav.php' ); ?>

			<!-- portfolio surround -->
			<section class="container portfolio-content">
            
				<h1 class="page-title sixteen columns text-center">Our Work</h1>

				<?php $ndx = 0;?>
				<?php while (have_posts()) : the_post(); ?>
					
					<?php if($ndx % 4 == 0) : ?>
						<div class="row">
					<?php endif;?>
					
					<div class="four columns">
					<!-- portfolio item -->
					<div class="port-item-container video">
						<div class="port-box">
							<div class="zoom-holder">
								<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
								<img  src="<?php echo $image[0];?>" width="224" height="166">
								<?php $movie_url = get_post_meta($post->ID, 'project_movie', true);?>
								<a href="<?php echo $movie_url."?feature=player_embedded&autoplay=1&controls=1&autohide=1&loop=1&fs=1&version=3&enablejsapi=1&rel=0&showinfo=0&showsearch=0";?>" class="various fancybox.iframe" title="<?php the_title(); ?>">
									<div class="zoom">
										<div class="zoom-inner"></div>
									</div>
								</a>
							</div>
						</div>

						<div class="port-item-title">
							<h6 id="post-<?php the_ID(); ?>"><a rel="bookmark" title="Permalink to Project Title" href="<?php the_permalink() ?>"><?php the_title(); ?></a></h6>
							<?php
								$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "names"));
								//print_r($term_list);
								$cat_list = implode("/", $term_list);
							?>
							<span><?php echo $cat_list; ?></span>
						</div>
						
					</div><!-- /portfolio item -->
					</div>

					<?php if($ndx % 4 == 3) : ?>
						</div>
					<?php endif;?>
					<?php $ndx++; ?>
				<?php endwhile; ?>
				
				<?php $ndx--; ?>
				<?php if($ndx % 4 != 3) : ?>
					</div>
				<?php endif;?>

			</section><!-- /portfolio surround -->

			<?php //include (TEMPLATEPATH . '/inc/nav.php' ); ?>
			
	<?php else : ?>

		<h2>Nothing found</h2>

	<?php endif; ?>

	</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
