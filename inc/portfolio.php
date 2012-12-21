<!-- portfolio content -->
		<div id="portfolio-content" class="sort fourcol">
		<?php while (have_posts() ) : the_post();?>
			
			<?php
				$term_list = wp_get_post_terms($post->ID, 'project_category', array("fields" => "slugs"));
				$class_list = implode(" ", $term_list);
			?>
			<!-- category -->
			<div class="<?php echo $class_list; ?>">
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
						<h6 id="post-<?php the_ID(); ?>" style="height:40px;"><a rel="bookmark" title="Permalink to Project Title" href="<?php the_permalink() ?>"><?php the_title(); ?></a></h6>
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
			</div><!-- /category -->
		<?php endwhile; ?>
		</div>