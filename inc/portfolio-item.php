<div class="port-item-container hover">
	<div class="port-box">
		<div class="zoom-holder">
			<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
			<a href="<?php the_permalink() ?>"><img  src="<?php echo $image[0];?>" width="224" height="166"></a>
			<?php $movie_url = get_post_meta($post->ID, 'project_movie', true);?>
			<!--
			<a href="<?php echo $movie_url."?feature=player_embedded&autoplay=1&controls=1&autohide=1&loop=1&fs=1&version=3&enablejsapi=1&rel=0&showinfo=0&showsearch=0";?>" class="various" title="<?php the_title(); ?>">
			-->
			<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
				<div class="zoom">
					<div class="zoom-inner"></div>
				</div>
			</a>
		</div>
	</div>

	<div class="port-item-title">
		<h6 id="post-<?php the_ID(); ?>">
			<a rel="bookmark" title="<?php the_title(); ?>" href="<?php the_permalink() ?>">
			<?php 
			$title = trim(get_the_title());
			if(strlen($title) > 24){
				echo trim(substr($title,0,21))."...";
			}else{
				echo $title;
			}
			?>
			</a>
		</h6>
		<?php
			$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "names"));
			//print_r($term_list);
			$cat_list = implode("/", $term_list);
		?>
		<div style="margin-top:-5px;">
			<span>
			<?php 
			if(strlen($cat_list) > 30){
				echo trim(substr($cat_list,0,27))."...";
			}else{
				echo $cat_list;
			}
			?></span>
		</div>
	</div>
	
</div>