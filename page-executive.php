<?php
/*
Template Name: Executive
*/
?>

<?php get_header(); ?>

<!-- main content -->
<section class="container">
	<h1 class="page-title sixteen columns text-center">Our Executive Team</h1>
	
	<!-- row -->
	<div class="row">
		<h5 class="text-center" style="padding-left:100px;padding-right:100px;margin-bottom:30px;">If you are looking for the best marketing partner to create better business opportunities in the new digital environment, talk to The Creative Shop today</h5>
		<!-- LOOP -->
		<?php
		$args = array( 
			'post_type' => 'director',
			'posts_per_page' => 4,
			'meta_key' => 'PrintOrder',
			'orderby' => 'meta_value_num',
			'order' => 'ASC'
			);
		$loop = new WP_Query( $args );
		?>
		<?php $ndx = 0;?>
		<?php while ($loop->have_posts() ) : $loop->the_post();?>
			
			<?php if($ndx % 4 == 0) : ?>
				<div class="row">
			<?php endif;?>
			
			<div class="four columns">
				<!-- portfolio item -->
				<div class="port-item-container staff-member">
					<div id="EmptyDiv<?php echo $post->ID;?>"></div>
					<?php $cfields = get_post_custom($post->ID);?>
					
					<div class="port-box">
						<div class="zoom-holder">
							<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
							<img  src="<?php echo $image[0];?>">
							<?php $movie_url = get_post_meta($post->ID, 'project_movie', true);?>
							<a href="#" class="director" id="director_<?php echo $post->ID;?>" title="<?php the_title(); ?>">
								<div class="zoom">
									<div class="zoom-inner"></div>
								</div>
							</a>
							<div style="display:none">
								<div id="contents_<?php echo $post->ID;?>">
									<img src="<?php echo $image[0];?>" style="float:left;margin-right:10px;margin-bottom:10px;">
									<h3 style="float:left;margin-right:10px;"><?php the_title(); ?></h3>
									<h5 style="padding-top:10px;"><?php echo $cfields["Position"][0]; ?></h5>
									<p><?php the_content();?></p>
								</div>
							</div>
							
							<script>
							jQuery(document).ready(function($){
								$("#director_<?php echo $post->ID;?>").fancybox({
									maxWidth	: 710,
									maxHeight	: 700,
									fitToView	: false,
									width		: '70%',
									height		: '70%',
									autoSize	: false,
									closeClick	: false,
									openEffect	: 'elastic',
									closeEffect	: 'none',
									content 	: $("#contents_<?php echo $post->ID;?>").html()
								});
							});
							</script>
						</div>
					</div>
					
					<div class="port_item_title">
						<h4 class="staff-name"><?php the_title(); ?></h4>
						<p class="staff-title"><em><?php echo $cfields["Position"][0]; ?></em></p>
						<div style="height:200px;overflow:hidden;">
							<p><?php the_excerpt();?></p>
						</div>
						<div class="staff social">
							<a href="mailto:<?php echo $cfields["Email"][0]; ?>" class="tip plus" title="Email">Email</a>
							<a href="<?php echo $cfields["LinkedIn"][0]; ?>" class="tip linked" title="LinkedIn">LinkedIn</a>
							<a href="<?php echo $cfields["Facebook"][0]; ?>" class="tip facebook" title="Facebook">Facebook</a>
						</div>
					</div>
					
				</div><!-- /portfolio item -->
			</div>

			<?php if($ndx % 4 == 3) : ?>
				</div>
			<?php endif;?>
			<?php $ndx++; ?>
		<?php endwhile; ?>
	</div><!-- /row -->
	
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
