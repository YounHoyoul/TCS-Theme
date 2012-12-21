<?php get_header(); ?>

<!-- main content -->
<section class="container">
	<div class="sixteen columns">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<h1 class="page-title"><?php the_title(); ?></h1>
			
			<!-- meta info -->
			<header class="blog-meta" style="position:relative;top:-20px;">
				<span class="icon-cal">
					<?php echo get_post_meta($post->ID, 'news_date', true);?>
				</span>
			</header>
			<!-- /meta info -->
							
			<?php $image=get_post_meta($post->ID,"news_photo1",true);?>
			<?php if(!empty($image)):?>
				<img src="<?php echo $image;?>">
			<?php endif;?>
			<?php the_content(); ?>
			<?php $ref=get_post_meta($post->ID,"news_ref",true);?>
			<?php if(!empty($ref)):?>
				<a href="<?php echo $ref;?>">REFERRENCE</a>
			<?php endif;?>
			
			<?php $news_date = get_post_meta($post->ID, 'news_date', true);?>
			
			<?php
			function filter_next_post_join($join) {
				$join = "join wp_postmeta m on p.id = m.post_id and m.meta_key = 'news_date' ";
				return $join;
			}

			function filter_previous_post_join($join) {
				$join = "join wp_postmeta m on p.id = m.post_id and m.meta_key = 'news_date' ";
				return $join;
			}

			function filter_next_post_sort($sort) {
				$sort = "ORDER BY m.meta_value DESC LIMIT 1 ";
				return $sort;
			}

			function filter_previous_post_sort($sort) {
				$sort = "ORDER BY m.meta_value ASC LIMIT 1 ";
				return $sort;
			}

			function filter_next_post_where($where) {
				global $news_date;
				$where = "where p.post_type = 'news' and p.post_status = 'publish' and m.meta_value < '".$news_date."' ";
				return $where;
			}

			function filter_previous_post_where($where) {
				global $news_date;
				$where = "where p.post_type = 'news' and p.post_status = 'publish' and m.meta_value > '".$news_date."' ";
				return $where;
			}

			add_filter('get_next_post_join',   'filter_next_post_join');
			add_filter('get_next_post_sort',   'filter_next_post_sort');
			add_filter('get_next_post_where',  'filter_next_post_where');

			add_filter('get_previous_post_join',  'filter_previous_post_join');
			add_filter('get_previous_post_sort',  'filter_previous_post_sort');
			add_filter('get_previous_post_where', 'filter_previous_post_where');
			?>
			
			<div id="news_post_nav">
				<div id="news_next-posts"><?php next_post_link('%link', '&laquo; Older News'); ?></div>
				<div id="news_prev-posts"><?php previous_post_link('%link', 'Newer News &raquo;'); ?></div>
			</div>
			<div style="margin-bottom:10px;clear:both;"></div>
		<?php endwhile; endif; ?>
		
	</div>
</section><!-- /main content -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>