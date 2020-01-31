# Einrichtung der App

**Einrichtung der Datenbank**

Zuerst sollte XAMPP oder eine vergleichbare Software installiert werden. Nach dem Starten der Konsole muss Apache und MySQL gestartet werden. Apache muss dabei für die App unter dem Port :8080 laufen. Nach dem Aufruf von der phpMyAdmin Konsole im Browser sollte zunächst eine neue Datenbank mit dem Namen *angular-nativescript-programmentwurf* erstellt und ausgewählt werden. Nach diesem Schritt kann über den Reiter ,importieren`und Auswahl des SQL Skriptes (angular-nativescript-programmentwurf.sql) die Datenbank inklusive der Datensätze importiert werden.

**Einrichtung der App**

Nach der Navigation in das git Repository müssen zunächst die nötigen Abhängigkeiten geladen werden.

**npm install**

Zum Ausführen der nativen Variante der App mit einer Entwicklerkonsole (in diesem Fall iOS und ein macOS Gerät notwendig):

**ns debug ios --inspector**

_Für den funktionalen Vergleich die Webversion für den Browser (http://localhost:4200)_

*ng serve*

_Das Styling ist in dieser Version nicht verfügbar_

Der Benutzername und das Passwort lauten Testuser/Testuser.