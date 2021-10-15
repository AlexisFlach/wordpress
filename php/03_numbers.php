<?php

$a = 5;
$b = 4;
$c = 1.2;

$a += $b;

if(is_int($a)) {
    echo "$a is an int\n";
}

$strNumber = '12.34';
$number = (int)$strNumber;

$num = 123456789.12345;
number_format($num, 2, '.', ' ');




