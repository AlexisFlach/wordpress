### Grundläggande PHP

PHP står för **PHP: Hypertext Preprocessor** och är ett **Server-side Programming/Scripting Language**. 

En stor fördel, som vi kommer att se när vi arbetar med WordPress, är att PHP kan bäddas in direkt i HTML.

```php+HTML
<h1><?php echo "Hello World"; ?></h1>
```

###### Hur fungerar PHP?

<img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/LAMPP_Architecture.png" style="zoom:50%;" />

En användare skickar en requst, säg till index.php. Server processar requesten och använder sig då av en PHP Interpretor. Medans PHP:n processas kan den arbeta med en Databas. Därefter skickas responsen tillbaka. Responsen innehåller dock inte PHP, utan resultat av processandet, vilket brukar vara HTML.

###### Installation

https://www.php.net/manual/en/install.php

#### Generella regler

PHP andvänder semikolon för att separera statements

```
echo "Hello World";
```



#### Comments

```
<?php

// Single Line Comment

# Another Single Line Comment

/*
Multi
Line
Comments
*/
```

###### Variablar

Variabelnamn börjar alltid med ett dollartecken. 

```
<?php

$name = "John";
$age = 53;
$isMale = true;
$height = 1.85;
$salary = null;

is_bool($isMale);
isset($name);

const PI = 3.14;
```

###### Numbers

```
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
```

###### Strings

```
<?php
$name = "Alex";
$string = 'Hello World';
$string2 = "Hello World";

echo $string.'<br>';

$string = 'Hello '.$name.'. How are you?';
$string2 = "Hello I am $name. I am good";

if(is_string($string)) {
    echo "$string is a string\n".'<br>';
}

echo strlen($string).'<br>';
echo strtolower($string2).'<br>';

$string2 = str_replace("Alex", "Alexito", $string2);
echo strtoupper($string2).'<br>';
```

###### Arrays

```
<?php

$fruits = ["Banana", "Apple", "Orange"];
$fruits[0] = "Peach";

$fruits[] = "Banana";

array_push($fruits, "foo");
array_pop($fruits);
array_unshift($fruits, "bar");

echo count($fruits).'<br>';

sort($fruits);

foreach ($fruits as $fruit) {
    echo $fruit.'<br>';
}

# array_shift($fruits);

$person = [
    'name' => 'Alex',
    'hobbies' => 'Tennis'
];

foreach ($person as $me => $hobby) {
    echo "$me: $hobby".'<br>';
}
```

###### Conditionals

```
<?php

$age = 0;
$salary = 300000;

if($age == 20) echo "1".'<br>';

echo $age < 22 ? 'yes' : 'no';

$myAge = $age ?: '18';

$myName = isset($name) ? $name : 'John';

$myName = $name ?? 'John';

// Switch

$userRole = 'users';

switch ($userRole) {
    case 'admin':
        echo 'admin';
        break;
    case 'user':
        echo 'user';
        break;
    default:
        echo 'Invalid role';
}
```

###### Loops

```
<?php

$counter = 0;
// while($counter < 10) {
//    echo $counter.'<br>';
//    $counter++;

do {
    echo $counter.'<br>';
    $counter++;
} while ($counter < 10);

for ($i = 0; $i < 10; $i++) {
    echo $i.'<br>';
}

$fruits = ["Banana", "Apple", "Orange"];

foreach ($fruits as $fruit) {
      echo $fruit.'<br>';
}

foreach ($fruits as $i => $fruit) {
        echo $i .': '. $fruit.'<br>';
}

$person = [
    'name' => 'Alex',
    'hobbies' => ['Tennis', 'Chess']
];

foreach ($person as $key => $value) {
      if(is_array($value)) {
        echo $key .' '. implode(", ", $value).'<br>';
      }
      else {
        echo $key .' '. $value.'<br>';
      }
}
```

###### Functions

```
<?php

function hello() {
    echo "Hello World";
}

hello();

function msg($name) {
    echo 'Hello ' .' '.  $name.'<br>';
}

msg("Alex");

function sum($a, $b) {
    return $a + $b;
}

echo sum(4, 5);

function manyArgs(...$nums) {
    $sum = 0;
    foreach ($nums as $n) {
        $sum += $n;
    }
    return $sum;
}

echo manyArgs(1,2,3,4);

function manyArgs2(...$nums) {
   return array_reduce($nums, fn($carry, $n) => $carry + $n);
}

echo manyArgs2(1,2,3);
```

###### OOP

**index.php**

```
<?php

require_once 'Person.php';
require_once 'Student.php';

$person = new Person("Alex");
$person2 = new Person('King');

$student = new Student("Brad", 1);

echo '<pre>';
var_dump($person);
echo '</pre>';
echo '<pre>';
var_dump($student);
echo '</pre>';
echo Person::getCounter();
```

**Person.php**

```
<?php
class Person {
    public string $name;
    private ?int $age;
    public static int $counter = 0;

    public function __construct($name) {
        $this->name = $name;
        self::$counter++;
    }

    public function setName($name): void
    {
        $this->name = $name;
    }

    public function getAge()
    {
        return $this->age;
    }

    public static function getCounter() {
        return self::$counter;
}
}
```

**Student.php**

```
<?php

require_once 'Person.php';

class Student extends Person {
    public int $studentId;

    public function __construct($name, $studentId)
    {
        $this->studentId = $studentId;
        parent::__construct($name);
    }
}
```

#### PHP med WordPress

```
<?php
while(have_posts()) {
	the_post(); ?>
	<h2><?php the_title(); ?></h2>
	<p><?php the_content(); ?></p>
	<a href="<?php the_permalink()?>"</a>>
}
```

