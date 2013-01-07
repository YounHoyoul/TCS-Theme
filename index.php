<?php get_header(); ?>

<!-- slider surround -->
<div class="container">

	<!-- slider -->
	<script src="<?php bloginfo('template_directory'); ?>/javascripts/slider-scripts/slider.js"></script>
	<script src="<?php bloginfo('template_directory'); ?>/javascripts/slider-scripts/script-rotate.js"></script>

	<div class="row slider-surround sixteen columns"> 

		<div id="wowslider-container1">
			<div class="ws_images">
				<ul>
					<li><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/images/slide1.jpg" alt="Hey there!" title="Hey there!" id="slide1_0"/>Welcome to Hipster!</li>
					<li><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/images/slide2.jpg" alt="Total" title="Total" id="slide1_1"/>Responsive awesomeness!</li>
					<li><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/images/slide3.jpg" alt="Twitter Feed" title="Twitter Feed" id="slide1_2"/>And Instagram Too!</li>
					<li><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/images/slide5.jpg" alt="Responsive Slider.." title="Responsive Slider.." id="slide1_3"/>With Tons of Effects!</li>
					<li><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/images/slide4.jpg" alt="Retina Icons, Staff Page," title="Retina Icons, Staff Page," id="slide1_4"/>and so much more!!</li>
				</ul>
			 </div>

			<div class="ws_bullets">
				<div>
					<a href="#" title="Hey there!"><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/tooltips/slide1.jpg" alt="Hey there!"/>1</a>
					<a href="#" title="Total"><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/tooltips/slide2.jpg" alt="Total"/>2</a>
					<a href="#" title="Twitter Feed"><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/tooltips/slide3.jpg" alt="Twitter Feed"/>3</a>
					<a href="#" title="Responsive Slider.."><img src="<?php bloginfo('template_directory'); ?>/images/demo/slider/tooltips/slide5.jpg" alt="Responsive Slider.."/>4</a>
					<a href="#" title="Retina Icons, Staff Page,"><img src="<?php bloginfo('template_directory'); ?>/mages/demo/slider/tooltips/slide4.jpg" alt="Retina Icons, Staff Page,"/>5</a>
				</div>
			</div>

			<div class="ws_shadow"></div>
		
		</div>
	
	</div><!-- /slider -->

</div><!-- /slider surround -->
	
<!-- main content -->
<section class="container">
	
	<!-- hipster title -->
	<div class="row sixteen columns">  
		<div class="star-row"></div>
			<h2 class="home-title" >We're <span>The Creative Shop</span>,<br/>An amazing creative agency.</h2>
		<div class="star-row mb25"></div>
	</div><!-- /hipster title -->
			
	<!-- services -->
	<!--
	<div class="row">

		<div class="one-third column service">
			<h2 class="serv"><a href="?project_category=digital-platform" class="mix"><span></span>PLATFORM</a></h2>
		</div>

		<div class="one-third column service">
			<h2 class="serv"><a href="?project_category=bespoke-solution" class="users"><span></span>BESPOKE</a></h2>
		</div>

		<div class="one-third column service">
			<h2 class="serv"><a href="?project_category=rental" class="files"><span></span>RENTAL</a></h2>
		</div>
		
	</div>
	-->
	<!-- /services -->
				
	<!-- projects -->
	<h2 class="sub-title"><span class="inverse" style="font-style:italic;">Latest Projects</span></h2>
  
	<!-- row -->
	<div class="row">

		<!-- LOOP -->
		<?php
		$args = array( 
			'post_type' => 'project', 
			'post_status' => 'publish',
			'posts_per_page' => 4,
			'meta_key' => 'project_order',
			'orderby' => 'meta_value_num',
			'order' => 'DESC' );
		$loop = new WP_Query( $args );
		?>
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
		<?php wp_reset_query(); ?>
		
	</div><!-- /row -->
	<!-- /projects -->               
	
	<?php $ndx--; ?>
	<?php if($ndx % 4 != 3) : ?>
		</div>
	<?php endif;?>
</section><!-- /main content -->

<?php get_sidebar(); ?>

<?php get_footer(); ?>
