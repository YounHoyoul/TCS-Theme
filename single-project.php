<?php get_header(); ?>

<!-- main content -->
<section class="container">
	
	<!--
	<h1 class="page-title sixteen columns">Single Portfolio <span>video</span></h1>
	-->
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="row pb25">
			<div class="ten columns">
				<?php $movie_url = get_post_meta($post->ID, 'project_movie', true);?>
				<iframe src="<?php echo $movie_url."?feature=player_embedded&autoplay=1&controls=1&autohide=1&loop=1&fs=1&version=3&enablejsapi=1&rel=0&showinfo=0&showsearch=0";?>" width="400" height="225" frameborder="0"></iframe>
			</div>     
		
			<div class="six columns">
				<h5 class="pb15"><strong><?php the_title(); ?><strong></h5>

				<h6>Year</h6>
				<h5 class="pb15"><?php echo get_post_meta($post->ID, 'project_date', true); ?></h5>
				
				<h6>Client</h6>
				<?php $cid = get_post_meta($post->ID, 'project_client', true); ?>
				<?php $cpost = get_post($cid); ?>
				<h5 class="pb15"><?php echo $cpost->post_title;?></h5>
				
				<h6>Product</h6>
				<?php
					$term_list = wp_get_post_terms($post->ID, 'product_category', array("fields" => "names"));
					$cat_list = implode("/", $term_list);
				?>
				<h5 class="pb15"><?php echo $cat_list; ?></h5>
				
				<h6>Category</h6>
				<?php
					$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "names"));
					$cat_list = implode("/", $term_list);
				?>
				<h5 class="pb15"><?php echo $cat_list; ?></h5>
				
				<!--<a href="#" class="button medium">Facebook</a>-->
				<span class='st_facebook' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' displayText='facebook'></span>
				<span class='st_email' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' displayText='email'></span>
				<span class='st_sharethis' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' displayText='sharethis'></span>
			</div>  
		</div>
		
		<?php the_content(); ?>
	
		<!-- projects -->
		<h2 class="sub-title"><span class="inverse" style="font-style:italic;">Project Photo</span></h2>
		<?php $photos = array('project_photo1','project_photo2','project_photo3','project_photo4');?>
		<?php foreach($photos as $photo) :?>
			<?php $photo_url = get_post_meta($post->ID, $photo, true);?>
			<?php if(!empty($photo_url)) :?><img src="<?php echo $photo_url;?>"><?php endif;?>
		<?php endforeach;?>
		
	<?php endwhile; endif; ?>
	
	<!-- projects -->
	<h2 class="sub-title"><span class="inverse" style="font-style:italic;">Related Projects</span></h2>
  
	<!-- row -->
	<div class="row">
		<!-- LOOP -->
		<?php
		$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "ids"));
		
		$args = array(
			'tax_query' => array(
				array(
					'taxonomy' => 'project_category',
					'field' => 'id',
					'terms' => $term_list
				)
			)
		);
		$query = new WP_Query( $args );
		
		$postid1 = array();
		while ($query->have_posts() ) : $query->the_post();
			$postid1[] = $post->ID;
		endwhile;
		
		$clientid = get_post_meta($post->ID, 'project_client', true);
		$sql = "select a.id
				  from $wpdb->posts a
				 where a.post_type = 'project'
				   and a.post_status = 'publish'
				   and b.meta_value = ".$clientid;
				   
		$postid2=$wpdb->get_col($sql);
		
		$tmp_postids = array_unique(array_merge($postid1,$postid2));
		$postids = array();
		foreach($tmp_postids as $id){
			if($id != $post->ID){
				$postids[] = $id;
			}
		}
		
		$args = array(
			'post_type' => 'project',
			'post_status' => 'publish',
			'post__in' => $postids,
			'meta_key' => 'project_order',
			'orderby' => 'meta_value_num',
			'order' => 'DESC');
		$loop = new WP_Query( $args );
		?>
		<?php $ndx = 0;?>
		<?php while ($loop->have_posts() ) : $loop->the_post();?>
			
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
					<h6 id="post-<?php the_ID(); ?>" style="height:40px;"><a rel="bookmark" title="<?php the_title(); ?>" href="<?php the_permalink() ?>"><?php the_title(); ?></a></h6>
					<?php
						$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "names"));
						//print_r($term_list);
						$cat_list = implode("/", $term_list);
					?>
					<div style="height:40px;">
						<span><?php echo $cat_list; ?></span>
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
	<!-- /projects -->     

</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>