<?php

function __autoload($class_name) {
  require_once $class_name . '.php';
}

__autoload('class.Backend');

$s = new Backend();
echo '1<br />';
$s->getKonsum('1');
echo '<br />';
$s->updateKonsum('1');
echo '<br />2 <br />';
$s->getEinzahlung('1');
echo '<br />2 <br />';
$s->updateEinzahlung('1', 50.69, 'Einzahlung', null, null);
echo '<br />2 <br />';
$s->getEinzahlungstermin();

?>
