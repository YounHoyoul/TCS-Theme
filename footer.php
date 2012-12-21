<?php
/*
function fetchUrl($url){
     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($ch, CURLOPT_TIMEOUT, 20);
 
     $retData = curl_exec($ch);
     curl_close($ch); 
 
     return $retData;
}

$profile_id = "100001919044204";
 
//App Info, needed for Auth
$app_id = "413551428717241";
$app_secret = "9d0175fb2590dbd516e83459685c9be9	";
 
//retrieve a new Auth token
//echo "https://graph.facebook.com/oauth/access_token?type=client_cred&client_id={$app_id}&client_secret={$app_secret}";
$authToken = fetchUrl("https://graph.facebook.com/oauth/access_token?type=client_cred&client_id={$app_id}&client_secret={$app_secret}");

echo "HERE=".$authToken;

// fetch profile feed with the Auth token appended
//$data['feed_data'] = fetchUrl("https://graph.facebook.com/{$profile_id}/feed?{$authToken}");
*/
?>

	<!-- footer -->
	<footer class="footerContainer">
		<div class="stitch"></div>
		
		<div class="container footer">
		
			<!-- footer col 1 -->
			<div class="four columns">
				<h3><a href="?page_id=29">Company Description</a></h3>
				<div class="footPadd">
					<?php echo str_replace("\n","<br/>",get_option( "companyinfo", "" )); ?> 
				</div>
			</div><!-- /footer col 1 -->
			
			<!-- footer col 2 -->
			<div class="four columns">
				<h3>Our Culture</h3>
				<div class="footPadd">
					<!--<div class="insta"></div>-->
					<div id="flickr_images"></div>
				</div>
			</div><!-- /footer col 2 -->
	  
			<!-- footer col 3 -->
			<div class="four columns">
				<h3><a href="http://www.facebook.com/TheCreativeShopAustralia?fref=ts">Facebook Talk</a></h3>
				<div class="footPadd">
					<!--<div id="jstwitter"></div>-->
					<div id="facebook_feed">I have to develop this after upload source to server.</div>
					<?php //get_sidebar("fb"); ?>
				 </div>
			</div><!-- footer col 3 -->
		
			<!-- footer col 4 -->
			<div class="four columns">
				<h3><a href="?page_id=100">Contact Us</a></h3>
				<div class="footPadd">
					<p class="address">
					<?php echo get_option( "addr1", "Suite 6.06 -6.07, Level 6," ); ?> <br/>
					<?php echo get_option( "addr2", "55 Miller Street," ); ?><br/>
					<?php echo get_option( "addr3", "Pyrmont NSW 2009" ); ?></p>
				
					<p class="phone"><?php echo get_option( "phone1", "+61 2 9692 9777" ); ?><br />
					<?php echo get_option( "phone2", "+61 2 9660 0400" ); ?></p>
				
					<p class="email" style="padding-top:12px;"><a href="mailto:<?php echo get_option( "admin_email", "info@thecreativeshop.com.au" ); ?>"><?php echo get_option( "admin_email", "info@thecreativeshop.com.au" ); ?></a></p>
					
					
					<?php
					get_currentuserinfo() ;
					global $user_level;
					if ($user_level > 0) {
						echo "<p>Statistics</p>";
						echo "Today Visit: ".wp_statistics_today()."<br/>";
						echo "Yesterday Visit: ".wp_statistics_yesterday()."<br/>";
						echo "Week Visit: ".wp_statistics_week()."<br/>";
						echo "Month Visit: ".wp_statistics_month()."<br/>";
						
						echo "Google: ".wp_statistics_searchengine('google')."<br/>";
						echo "Yahoo: ".wp_statistics_searchengine('yahoo')."<br/>";
						echo "Bing: ".wp_statistics_searchengine('bing')."</p>";
					} else {
						//echo "<p>Welcome Visitor or Subscriber</p>";
					}
					?>

				</div>
			</div><!-- footer col 4 -->
		</div>
	</footer><!-- /footer -->

	<!-- footer credits -->
	<footer class="footCreditsContainer">
		<div class="container footerCredits">
			<div class="eight columns">
     			<p class="creditsLeft">&nbsp;</p>
     		</div>
			<div class="eight columns">
				<p class="creditsRight">Copyright &copy;<script type="text/javascript">document.write(new Date().getFullYear())</script> The Creative Shop Pty Ltd.</p>
			</div>
		</div>  
	</footer><!-- /footer credits -->
	
</div>

<?php wp_footer(); ?>

<!-- JS
================================================== -->
<script src="<?php bloginfo('template_directory'); ?>/javascripts/jquery.gmap.min.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/javascripts/scripts.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/javascripts/screen.js"></script>

</body>
</html>
