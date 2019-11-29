<?php
class Backend
{
  // Variablen deklarieren
  protected $dsn = 'mysql:dbname=angular-nativescript-programmentwurf;host=localhost:3306';
  protected $user = 'root';
  protected $password = '';

    // Funktion: Konsum pro User
    public function getKonsum($benutzerid)
    {
      try{
        $dbc = new PDO($this->dsn, $this->user, $this->password);
        $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $dbc->query("SELECT Monat, Jahr, Striche FROM `Konsum`
                             WHERE `BenutzerID` = '$benutzerid'");

        if ($stmt->rowCount() > 0) {
          $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $json = json_encode($results);

          // JSON
          echo '{ "ergebnis": {
              "monate":';
          echo $json;
          echo ' }
                   }';
          }

        else {
          echo '{fehlermeldung: "keine Daten gefunden"}';
        }
      }
      catch (Exception $e) {
          echo 'Exception abgefangen: ',  $e->getMessage(), "\n";
      }
    }

    // Funktion: neue Einzahlung speichern
    public function updateEinzahlung($benutzerid, $betrag, $typ, $beleg)
    {
      try{
        $dbc = new PDO($this->dsn, $this->user, $this->password);
        $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $dbc->query("INSERT INTO `Einzahlung`(`BenutzerID`, `Betrag`, `Typ`, `Beleg`, `Zeitpunkt`) VALUES ('$benutzerid',50.69,'$typ',null,NOW())");

        $this->getEinzahlung('1');

      }
      catch (Exception $e) {
          echo 'Exception abgefangen: ',  $e->getMessage(), "\n";
      }
    }

    // Funktion: Konsum pro User
    public function getEinzahlung($benutzerid)
    {
      try{
        $dbc = new PDO($this->dsn, $this->user, $this->password);
        $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $isnull = 'ISNULL(`Beleg`)';
        
        $stmt = $dbc->query("SELECT `Betrag`, `Typ`,`Zeitpunkt`, `Beleg` IS NOT NULL AS 'Beleg'
                             FROM `Einzahlung` 
                             WHERE `BenutzerID` = '$benutzerid'
                             ORDER BY `Zeitpunkt` ASC");

        if ($stmt->rowCount() > 0) {
          $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $json = json_encode($results);

        // JSON 
        echo '{ "ergebnis": {
            "einzahlungen":';
        echo $json;
        echo ' }
                 }';

          }

        else {
          echo "{fehlermeldung: 'keine Daten gefunden'}";
        }
      }
      catch (Exception $e) {
          echo 'Exception abgefangen: ',  $e->getMessage(), "\n";
      }
    }

    // Funktion: Strich bei bestimmten User hinzufügen
    public function updateKonsum($benutzerid)
    {
      try{
        $dbc = new PDO($this->dsn, $this->user, $this->password);
        $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $monate = array(1=>'Januar',
                        2=>'Februar',
                        3=>'März',
                        4=>'April',
                        5=>'Mai',
                        6=>'Juni',
                        7=>'Juli',
                        8=>'August',
                        9=>'September',
                        10=>'Oktober',
                        11=>'November',
                        12=>'Dezember');
       
        $zeitstempel = new \DateTime('now');
        $monat = $zeitstempel->format('m');
        $monat = $monate[$monat];
        $jahr = $zeitstempel->format('Y');
        echo $monat;
        echo $jahr;

        $stmt = $dbc->query("UPDATE `Konsum` SET `Striche` = `Striche` + 1
                             WHERE `BenutzerID` = $benutzerid
                             AND Jahr = $jahr
                             AND Monat = '$monat'");

        $this->getKonsum($benutzerid);
          }

      catch (Exception $e) {
        echo 'Exception abgefangen: ',  $e->getMessage(), "\n";
      }
    }

    // Funktion: Nächster Termin für eine Einzahlung
    public function getEinzahlungstermin()
    {
      try{
        $dbc = new PDO($this->dsn, $this->user, $this->password);
        $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $dbc->query("SELECT Datum FROM `Einzahlungstermin`");

        if ($stmt->rowCount() > 0) {
          $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $json = json_encode($results);

          // JSON 
          echo '{ "ergebnis": {
            "Termine":';
          echo $json;
          echo ' }
                 }';

          
        }
      }

        catch (Exception $e) {
          echo 'Exception abgefangen: ',  $e->getMessage(), "\n";
        }
      }
}
?>