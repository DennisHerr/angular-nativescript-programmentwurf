<?php

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  header("HTTP/1.1 200 ");
  exit;}

function __autoload($class_name) {
  require_once $class_name . '.php';
}

// body Parameter entgegenehmen
$parameterJSON = file_get_contents('php://input');
$parameterARRAY = json_decode($parameterJSON, true);

$function = $parameterARRAY['function'];

__autoload('class.Backend');

$s = new Backend();

switch ($function) {
    case 'login':
        $s->login($parameterARRAY['benutzername'], $parameterARRAY['passwort']);
        break;
    case 'getEinzahlung':
        $s->getEinzahlung($parameterARRAY['benutzer']);
        break;
    case 'updateEinzahlung':
        $s->updateEinzahlung($parameterARRAY['benutzer'], $parameterARRAY['betrag'], $parameterARRAY['typ'], $parameterARRAY['beleg']);
        break;
    case 'getEinzahlungstermin':
        $s->getEinzahlungstermin();
        break;
    case 'getKonsum':
        $s->getKonsum($parameterARRAY['benutzer']);
        break;
    case 'updateKonsum':
        $s->updateKonsum($parameterARRAY['benutzer']);
        break;
    default:
       echo '{fehlermeldung: "kein gültiger Aufruf!"}';
}

?>
