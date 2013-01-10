<div class="navigation" id="page_nav">
	<!--
	<div class="next-posts" id="next-posts"><?php // next_posts_link('&laquo; Older Entries') ?></div>
	-->
	<?php 
	$big = 999999999; // need an unlikely integer

	echo paginate_links( array(
		'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
		'format' => '?post_type=news&paged=%#%',
		'current' => max( 1, get_query_var('paged') ),
		'total' => $wp_query->max_num_pages
	) );
	?>
	<!--
	<div class="prev-posts" id="prev-posts"><?php // previous_posts_link('Newer Entries &raquo;') ?></div>
	-->
</div>