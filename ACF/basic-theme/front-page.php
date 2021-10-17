<?php get_header();
$title = get_field('page_title');
$description = get_field('description');
$getImage = get_field('backgroundimage');
$image = $getImage['sizes']['large'];
?>

<section class="page">
    <div class="container">

                <h1><?php the_title();?></h1>

                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                <?php the_content(); ?>

                <?php endwhile; else: endif; ?>

        <?php
        if($title): ?>
            <h1><?php echo $title; ?></h1>
        <?php endif;

        if($description): ?>
        <p><?php echo nl2br($description); ?></>
        <?php endif;  ?>

        <?php echo '<br>'; ?>
        <?php
         # var_dump($image);
         ?>
        <img src="<?php echo $image; ?>" class="img-fluid">


    </div>
</section>

<?php get_footer();?>