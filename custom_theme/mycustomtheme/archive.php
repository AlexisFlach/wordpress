<?php
get_header();

if ( have_posts() ) :
	while ( have_posts() ) : the_post();
		the_title( '<h2>', '</h2>' );
		the_post_thumbnail();
		the_excerpt();
		?>
<a href="<?php echo the_permalink(); ?>">Link to Post</a> <?php

	endwhile;
else:
	_e( 'Sorry, no posts matched your criteria.', 'textdomain' );
endif;

get_footer();