<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Awesome Site</title>
    <?php wp_head(); ?>
</head>
<body>
<header>
    <?php
    wp_nav_menu(
            array(
                    'theme_location' => 'main-menu',
                    'menu_class' => 'main-menu'
            )
    )
    ?>
</header>