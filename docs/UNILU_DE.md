# WeRoFleet — Erste Schritte (Universität Luxemburg)

Diese Anleitung führt Sie Schritt für Schritt durch alles — von der Installation
bis zur Verwaltung Ihrer echten Flotte von Webex-Raumgeräten (Room Kits, Room
Bars, Boards).

WeRoFleet ist eine **100 % lokale Web-Konsole**: eine einzige HTML-Datei, die in
Ihrem Browser läuft. Es werden keine Daten irgendwohin gesendet — Ihr
Webex-Token bleibt auf Ihrem Rechner und spricht nur mit den Servern von Webex.

> Auch verfügbar in: [Français](UNILU_FR.md) · [English](UNILU_EN.md) · [Lëtzebuergesch](UNILU_LB.md)

---

## Überblick in 5 Schritten

1. `WeRoFleet.zip` herunterladen und entpacken.
2. Den **CORS-Proxy** für Ihr Betriebssystem starten.
3. Ihr **Webex-Zugriffstoken** unter developer.webex.com holen.
4. Das **HTML-Bundle** öffnen und verbinden (Token + Proxy-Adresse).
5. Die Konsole nutzen: Überwachung, Deployment, Einstellungen.

---

## Schritt 1 — WeRoFleet herunterladen

1. Öffnen Sie die Seite der neuesten Version:
   **https://github.com/Ascol57/WeRoFleet/releases/latest**
2. Laden Sie **`WeRoFleet.zip`** herunter.
3. **Entpacken Sie es** in einen Ordner Ihrer Wahl (Desktop, Dokumente…).

Darin finden Sie:

- das **HTML-Bundle** (`WeRoFleet.html`) — die Anwendung selbst;
- einen Ordner **`proxy/`** mit den Proxy-Startern für jedes Betriebssystem:
  - `webex-proxy.command` — **macOS**
  - `start-proxy.cmd` (+ `webex-proxy.ps1`) — **Windows**
  - `webex-proxy.sh` — **Linux / Debian**

---

## Schritt 2 — Den CORS-Proxy starten

> **Warum?** Die Webex-API erlaubt keine direkten Aufrufe aus dem Browser (keine
> CORS-Header). Dieser kleine Proxy läuft auf Ihrem Rechner, leitet Anfragen an
> Webex weiter und ergänzt die fehlenden Header. Ihr Token geht nur
> **Browser → localhost → Webex**: nichts wird hochgeladen.
>
> Jeder Starter nutzt **nur das, was Ihr Betriebssystem bereits mitbringt** —
> keine Installation, kein Node, keine zusätzliche Abhängigkeit.

Öffnen Sie den Ordner `proxy/` und starten Sie das Skript für **Ihr** System:

### macOS (eingebautes Ruby)
1. Doppelklicken Sie auf **`webex-proxy.command`**.
   - Falls macOS das erste Mal die Ausführung verweigert: Rechtsklick →
     **Öffnen**, oder im Terminal:
     `chmod +x webex-proxy.command && ./webex-proxy.command`
2. **Lassen Sie das Fenster offen**, solange Sie die Konsole nutzen.

### Windows (eingebautes PowerShell)
1. Doppelklicken Sie auf **`start-proxy.cmd`**.
   - (Es führt `webex-proxy.ps1` mit einer nur für diesen Lauf geltenden
     Ausnahme der Ausführungsrichtlinie aus.)
2. **Lassen Sie das Fenster offen.**

### Linux / Debian (bash + eingebautes python3)
1. In einem Terminal, aus dem Ordner `proxy/`:
   ```bash
   chmod +x webex-proxy.sh   # nur beim ersten Mal
   ./webex-proxy.sh          # oder: bash webex-proxy.sh
   ```
2. **Lassen Sie das Terminal offen.** Port ändern: `PORT=9000 ./webex-proxy.sh`.

Nach dem Start lauscht der Proxy auf **`http://localhost:8788`**.
Zum Beenden, wenn Sie fertig sind: **Strg + C** (oder Fenster schließen).

---

## Schritt 3 — Ihr Webex-Zugriffstoken holen

1. Öffnen Sie **https://developer.webex.com/**.
2. Melden Sie sich mit Ihrem Konto an (oben rechts).
3. **Klicken Sie auf Ihr Avatar**: Ihr persönliches **Bearer-Token** wird
   angezeigt. Klicken Sie auf **Copy**, um es zu kopieren.

> Dieses persönliche Token ist **vorübergehend** (~12 Std.) und an Ihre
> eigenen Rechte gebunden. Für Tests genügt es. Für den dauerhaften Einsatz
> erstellen Sie besser eine *Integration* mit den passenden Berechtigungen.
>
> **Erforderliche Scopes:**
> `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands`

---

## Schritt 4 — Die Konsole öffnen und verbinden

1. Öffnen Sie **`WeRoFleet.html`** in einem modernen Browser (ein
   Doppelklick genügt — es ist eine vollständig eigenständige Datei).
2. Das Fenster **„Connect to Webex"** erscheint.
3. Fügen Sie unter **Webex access token** das in Schritt 3 kopierte Token ein
   (ohne das Präfix `Bearer `).
4. *(Optional)* **Organization ID**: leer lassen — standardmäßig wird die
   Organisation des Token-Inhabers verwendet.
5. Aktivieren Sie den Schalter **„Advanced — custom API base / proxy"** und geben
   Sie ein:
   ```
   http://localhost:8788/v1
   ```
6. Klicken Sie auf **Connect**.

Ihre echten Räume werden geladen.

> **Tipp** — Sie können auch auf **„Use demo data"** klicken, um die
> Oberfläche ohne Verbindung mit einem fiktiven Datensatz zu erkunden.
>
> Ihr Token wird **nur** im lokalen Speicher dieses Browsers abgelegt und
> direkt an Webex gesendet. Nichts wird zu WeRoFleet hochgeladen.

---

## Schritt 5 — Die Konsole nutzen

Nach dem Verbinden stehen mehrere Bildschirme zur Verfügung (Menü links).

### Overview (Übersicht)
Das Flotten-Dashboard:
- Kennzahlen: **Geräte gesamt, online, im Anruf, Aufmerksamkeit nötig**;
- eine **Flotten-Gesundheitsleiste** nach Betriebszustand;
- eine **„Needs attention"**-Liste (beeinträchtigte oder kritische Geräte);
- eine **Export**-Verknüpfung.

### Devices (Geräte)
Die detaillierte Tabelle aller Geräte:
- **Filter** (Alle / Aufmerksamkeit nötig / Im Anruf) und **Suche**;
- Filterung nach **Standort**;
- **Mehrfachauswahl** für Sammelaktionen: **Neustart (Reboot)**, **Branding**
  anwenden, **taggen**;
- Klick auf ein Gerät → **Detailbereich**: Identität, Zustand, Live-xAPI-Status,
  Peripherie, Verlauf und eine **Reboot**-Schaltfläche.

> Der Neustart prüft zuerst, ob das Gerät **in einem Anruf** ist, bevor er
> ausgeführt wird.

### Workspaces (Arbeitsbereiche) — Deployment
Um eine **Konfiguration auf viele Räume gleichzeitig** anzuwenden:
1. Haken Sie die gewünschten Räume an (filterbar nach **Gebäude** + Suche).
2. Wählen Sie ein **Preset** aus der Liste.
3. Klicken Sie auf **Apply preset**.

Nur **geeignete Geräte** (Zielmodelle) erhalten die Konfiguration. Ein
Fortschrittsfenster zeigt das Ergebnis (Erfolge / Fehler) in Echtzeit.

Nach Abschluss des Laufs klicken Sie auf **Download PDF**, um einen
**Bereitstellungsbericht** zu speichern — eine Zeile pro Raum (`Raum: OK` oder
`Raum — Fehler:` gefolgt von den genauen Gründen), damit Fehler leicht zu
erkennen, aufzubewahren und zu teilen sind.

### Config presets (wiederverwendbare Konfigurationen)
Erstellen Sie wiederverwendbare **Konfigurationspakete**:
- **Branding** (*Halfwake*-Logo, Hintergrundbild im Anruf — automatisch
  skaliert), **eigene Nachricht**, **Anruf-Schaltflächen**;
- **Standard-Hintergrundbild** — eines der im Gerät integrierten
  **Hintergrundbild-Bundles** aktivieren, ausgewählt **nach Name** (oder erstes /
  letztes / Positionsnummer);
- **Import / Export als JSON** (pro Preset oder alle auf einmal) zum Teilen oder
  Archivieren Ihrer Konfigurationen;
- **duplizieren / bearbeiten / löschen**.

Jedes Preset entspricht denselben Webex-Routen (`Branding.Upload`,
`CustomMessage`, `UserInterface.Features.Call.*`,
`UserInterface.WallpaperBundle.Set`). Sie **erstellen sie hier** und **wenden sie
dann aus Workspaces an**.

> Der geräteweise **Branding**-Editor (Geräte-Schublade) kann außerdem die
> **eigenen Hintergrundbilder des Geräts auflisten** und Sie eines direkt
> auswählen lassen.

### Settings (Einstellungen)
- **Sprache** der Oberfläche: **EN · FR · DE · LB** (pro Browser gespeichert,
  beim ersten Start automatisch erkannt).
- **Webex API rate limit**: max. Anfragen pro Sekunde (Standard **3/s**,
  konservativ). Bei `429 Too Many Requests` **verlangsamt sich die Konsole und
  wiederholt automatisch**, danach steigt die Rate wieder.
- **Fleet auto-refresh**: Intervall zwischen vollständigen Status-Durchläufen
  (10 s bis 120 s).
- **Connection**: die verbundene Organisation ansehen oder **Disconnect** (löscht
  das Token und kehrt zu Demo-Daten zurück).

---

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| „Could not reach Webex" / Netzwerkfehler | Der Proxy läuft nicht oder die Adresse ist falsch | Prüfen Sie, dass das Proxy-Fenster **offen** ist und Advanced auf `http://localhost:8788/v1` zeigt |
| „Invalid token" | Abgelaufenes oder falsch eingefügtes Token | Kopieren Sie ein frisches Token von developer.webex.com (ohne `Bearer `) |
| „Missing scope" | Dem Token fehlen die richtigen Berechtigungen | Token mit `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands` verwenden |
| „Rate limited" (429) | Zu viele Anfragen | Normal: Die Konsole reguliert sich selbst. Sie können die Rate in **Settings** senken |
| Keine Geräte angezeigt | Organisation ohne Geräte oder falsche Organisation | **Organization ID** im Verbindungsfenster eintragen |
| Proxy startet nicht (Port belegt) | Port 8788 ist belegt | Auf einem anderen Port neu starten (`PORT=9000 …`) und die Advanced-Adresse entsprechend anpassen |

> Der Proxy bewahrt den `Retry-After`-Header, sodass das automatische
> 429-Backoff der Konsole auch über ihn funktioniert.

---

## Bewährte Vorgehensweise

- **Lassen Sie den Proxy** während der ganzen Sitzung offen; schließen Sie ihn
  (Strg + C), wenn Sie fertig sind.
- **Testen Sie zuerst im Demo-Modus** („Use demo data"), um sich vertraut zu
  machen, bevor Sie an echten Geräten arbeiten.
- **Bereiten Sie Ihre Presets** im Voraus vor und verteilen Sie sie dann
  gebündelt aus **Workspaces**.
- **Trennen Sie die Verbindung** (Settings → Disconnect) an einem gemeinsam
  genutzten Rechner, um das gespeicherte Token zu löschen.

---

*WeRoFleet ist ein unabhängiges Projekt, nicht mit Webex oder Cisco verbunden.
Nutzungs- und Änderungsrechte werden der Universität Luxemburg für ihre
institutionellen Zwecke gewährt (siehe LICENSE).*
