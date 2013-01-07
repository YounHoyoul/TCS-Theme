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
				<h5 class="pb15"><strong class="item-title"><?php the_title(); ?></strong></h5>

				<h6>DATE</h6>
				<h5 class="pb15"><strong><?php echo get_post_meta($post->ID, 'project_date', true); ?></strong></h5>
				
				<h6>CLIENT</h6>
				<?php $cid = get_post_meta($post->ID, 'project_client', true); ?>
				<?php $cpost = get_post($cid); ?>
				<h5 class="pb15"><strong><?php echo $cpost->post_title;?></strong></h5>
				
				<h6>PRODUCT</h6>
				<?php
					$term_list = wp_get_post_terms($post->ID, 'product_category', array("fields" => "names"));
					$cat_list = implode("/", $term_list);
				?>
				<h5 class="pb15"><strong><?php echo $cat_list; ?></strong></h5>
				
				<h6>CATEGORY</h6>
				<?php
					$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "names"));
					$cat_list = implode("/", $term_list);
				?>
				<h5 class="pb15"><strong><?php echo $cat_list; ?></strong></h5>
				
				<!--<a href="#" class="button medium">Facebook</a>-->
				<span class='st_facebook' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' displayText='facebook'></span>
				<span class='st_email' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' displayText='email'></span>
				<span class='st_sharethis' st_title='<?php the_title(); ?>' st_url='<?php the_permalink(); ?>' displayText='sharethis'></span>
			</div>  
		</div>
		
		<?php the_content(); ?>
	
		<!-- project photo-->
		<?php
		$photos = array('project_photo1','project_photo2','project_photo3','project_photo4');
		$isfound = false;
		foreach($photos as $photo){
			$photo_url = get_post_meta($post->ID, $photo, true);
			if(!empty($photo_url)){
				$isfound = true;
			}
		}
		?>
		<?php if($isfound) :?>
			<h2 class="sub-title"><span class="inverse" style="font-style:italic;">Project Photo</span></h2>
			<?php foreach($photos as $photo) :?>
				<?php $photo_url = get_post_meta($post->ID, $photo, true);?>
				<?php if(!empty($photo_url)) :?><img src="<?php echo $photo_url;?>"><?php endif;?>
			<?php endforeach;?>
			<p class="pb20">&nbsp;</p>
		<?php endif;?>	
		<!-- project photo-->
		
	<?php endwhile; endif; ?>
	
	<!-- LOOP -->
	<?php
	$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "ids"));
	
	//print_r($term_list);echo "<br/>";
	
	$args = array(
		'posts_per_page' => 1000,
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
	
	
	wp_reset_query();
	//echo "term:";print_r($postid1);echo "<br/>";
	
	$clientid = get_post_meta($post->ID, 'project_client', true);
	$sql = "select a.id
			  from $wpdb->posts a
			 where a.post_type = 'project'
			   and a.post_status = 'publish'
			   and b.meta_value = ".$clientid;
			   
	$postid2=$wpdb->get_col($sql);
	
	//echo "client:";print_r($postid2);echo "<br/>";
	
	$tmp_postids = array_unique(array_merge($postid1,$postid2));
	$postids = array();
	foreach($tmp_postids as $id){
		if($id != $post->ID){
			$postids[] = $id;
		}
	}

	//echo $post->ID; print_r($postids);
	
	$args = array(
		'post_type' => 'project',
		'posts_per_page' => 1000,
		'post_status' => 'publish',
		'post__in' => $postids,
		'meta_key' => 'project_order',
		'orderby' => 'meta_value_num',
		'order' => 'DESC');
	$loop = new WP_Query( $args );

	?>
	
	<?php if($loop->have_posts()):?>
		<!-- projects -->
		<h2 class="sub-title"><span class="inverse" style="font-style:italic;">Related Projects</span></h2>
	  
		<!-- row -->
		<div class="row">
			<?php $ndx = 0;?>
			<?php while ($loop->have_posts() ) : $loop->the_post();?>
				
				<?php if($ndx % 4 == 0) : ?>
					<div class="row">
				<?php endif;?>
				
				<div class="four columns">
					<!-- portfolio item -->
					<?php include (TEMPLATEPATH . '/inc/portfolio-item.php' ); ?>
					<!-- /portfolio item -->
				</div>

				<?php if($ndx % 4 == 3) : ?>
					</div>
				<?php endif;?>
				<?php $ndx++; ?>
			<?php endwhile; ?>
			
		</div><!-- /row -->
		<!-- /projects -->     
	<?php endif;?>
	
	<?php wp_reset_query(); ?>
	
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>