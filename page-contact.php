<?php
/*
Template Name: Contact
*/
?>
<?php get_header(); ?>

<!-- main content -->
<section class="container" >
	<!-- map -->
	<div id="map"></div>
	
	<div class="container">
		<!-- left column -->
		<div class="eleven columns">

			<h4>Should you have any business inquiry or any other general inquiry Please send us email to below.</h4>
			<div id="contactWrapper">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<?php the_content(); ?>
			<?php endwhile; endif; ?>
			</div>

		</div><!-- /left column -->
		
		<!-- right column -->
		<aside class="four columns offset-by-one">
			<div class="widget-box">
				<div class="widget-box-content">
					<h3>Full Info</h3>
		
					<p><strong>The Creative Shop</strong><br />
					<?php echo get_option( "addr1", "Suite 6.06 -6.07, Level 6," ); ?><br />
					<?php echo get_option( "addr2", "55 Miller Street," ); ?><?php echo get_option( "addr3", "Pyrmont NSW 2009" ); ?></p>

					<p>Tel<?php echo get_option( "phone1", "+61 2 9692 9777" ); ?></p>

					<p><a href="mailto:<?php echo get_option( "admin_email", "info@thecreativeshop.com.au" ); ?>"><?php echo get_option( "admin_email", "info@thecreativeshop.com.au" ); ?></a></p>
				</div>
			</div>
		</aside><!-- /right column -->	 
	</div>
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
