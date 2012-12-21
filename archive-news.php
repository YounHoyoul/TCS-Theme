<?php get_header(); ?>

<?php
global $wp_query;
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array( 
	'post_type' => 'news',
	'posts_per_page' => 3,
	'post_status' => 'publish',
	'meta_key' => 'news_date',
	'orderby' => 'meta_value',
	'order' => 'DESC');
$args = array_merge( $wp_query->query,$args);
query_posts( $args );

//print_r($wp_query);

?>

<!-- main content -->
<section class="container">
	<div class="sixteen columns">
		<h1 class="page-title text-center">News</h1>
		
		<?php if (have_posts()) : ?>

			<?php while (have_posts()) : the_post(); ?>
				<!-- blog entry --> 
				<article class="post">
					<div >
						<div class="news_image" style="float:left;width:130px;height;130px;">
							<a title="Read the full post" style="display:inline;" href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail(); ?>   
							</a>
						</div>
						<div class="news_contents" style="">
							<h4 class="entry-title" >
								<a href="<?php the_permalink(); ?>" title="Read the full post"><?php the_title();?></a>
							</h4>
							<hr style="margin:0px 0px 10px 0px;">
							<!-- meta info -->
							<header class="blog-meta" >
								<span class="icon-cal">
									<?php echo get_post_meta($post->ID, 'news_date', true);?>
								</span>
							</header>
							<!-- /meta info -->

							<p class="excerpt" ><?php echo get_the_excerpt();?> <a href="<?php the_permalink(); ?>" title="Read More!">[...]</a></p>
						</div>
						<div style="clear:both;height:0px;padding:0px;margin:0px;"></div>
					</div>
				</article><!-- /blog entry --> 
			<?php endwhile; ?>
			
			<?php include (TEMPLATEPATH . '/inc/nav.php' ); ?>
			<div style="margin-bottom:10px;clear:both;"></div>
		<?php else : ?>
			<h2>Nothing found</h2>
		<?php endif; ?> 
	</div>
</section><!-- /main content -->
<?php get_sidebar(); ?>

<?php get_footer(); ?>
