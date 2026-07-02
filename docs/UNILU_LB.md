# WeRoFleet — Lass leeën (Universitéit Lëtzebuerg)

Dëse Guide begleet Iech Schrëtt fir Schrëtt, vun der Installatioun bis zur
richteger Gestioun vun ärer Flott vu Webex-Raumgeräter (Room Kits, Room Bars,
Boards).

WeRoFleet ass eng **100 % lokal Web-Konsol**: eng eenzeg HTML-Datei, déi an ärem
Browser leeft. Et gi keng Donnéeën iergendwouhin geschéckt — äre Webex-Token
bleift op ärem Apparat a schwätzt nëmme mat de Serveren vu Webex.

> Och verfügbar op: [Français](UNILU_FR.md) · [English](UNILU_EN.md) · [Deutsch](UNILU_DE.md)

---

## Iwwerbléck a 5 Schrëtt

1. `WeRoFleet.zip` eroflueden an auspaken.
2. De **CORS-Proxy** fir äert Betribssystem starten.
3. Äre **Webex-Zougrëffstoken** op developer.webex.com huelen.
4. De **HTML-Bundle** opmaachen a verbannen (Token + Proxy-Adress).
5. D'Konsol benotzen: Iwwerwaachung, Deployment, Astellungen.

---

## Schrëtt 1 — WeRoFleet eroflueden

1. Gitt op d'Säit vun der leschter Versioun:
   **https://github.com/Ascol57/WeRoFleet/releases/latest**
2. Luet **`WeRoFleet.zip`** erof.
3. **Pakt et aus** an en Dossier no ärer Wiel (Desktop, Dokumenter…).

Dran fannt Dir:

- de **HTML-Bundle** (`WeRoFleet.html`) — d'Applikatioun selwer;
- en Dossier **`proxy/`** mat de Proxy-Starter fir all Betribssystem:
  - `webex-proxy.command` — **macOS**
  - `start-proxy.cmd` (+ `webex-proxy.ps1`) — **Windows**
  - `webex-proxy.sh` — **Linux / Debian**

---

## Schrëtt 2 — De CORS-Proxy starten

> **Firwat?** D'Webex-API erlaabt keng direkt Uriff aus engem Browser (keng
> CORS-Header). Dëse klenge Proxy leeft op ärem Apparat, leet d'Ufroen op Webex
> weider an ergänzt déi feelend Header. Äre Token geet nëmme
> **Browser → localhost → Webex**: et gëtt näischt eropgelueden.
>
> All Starter benotzt **nëmmen dat, wat äert Betribssystem scho matbréngt** —
> keng Installatioun, keen Node, keng zousätzlech Ofhängegkeet.

Maacht den Dossier `proxy/` op a start de Skript fir **äert** System:

### macOS (agebaute Ruby)
1. Duebelklickt op **`webex-proxy.command`**.
   - Wann macOS dat éischt Mol d'Ausféierung refuséiert: Riets-Klick →
     **Open**, oder am Terminal:
     `chmod +x webex-proxy.command && ./webex-proxy.command`
2. **Loosst d'Fënster op**, soulaang Dir d'Konsol benotzt.

### Windows (agebaute PowerShell)
1. Duebelklickt op **`start-proxy.cmd`**.
   - (Et leeft `webex-proxy.ps1` mat enger Ausnam vun der Ausféierungspolitik,
     déi nëmme fir dëse Laf gëllt.)
2. **Loosst d'Fënster op.**

### Linux / Debian (bash + agebaute python3)
1. An engem Terminal, aus dem Dossier `proxy/`:
   ```bash
   chmod +x webex-proxy.sh   # nëmmen dat éischt Mol
   ./webex-proxy.sh          # oder: bash webex-proxy.sh
   ```
2. **Loosst den Terminal op.** Fir de Port z'änneren: `PORT=9000 ./webex-proxy.sh`.

Eemol gestart, lauschtert de Proxy op **`http://localhost:8788`**.
Fir en ze stoppen, wann Dir fäerdeg sidd: **Ctrl + C** (oder d'Fënster zoumaachen).

---

## Schrëtt 3 — Äre Webex-Zougrëffstoken huelen

1. Gitt op **https://developer.webex.com/**.
2. Mellt Iech mat ärem Kont un (uewe riets).
3. **Klickt op äre Avatar**: äre perséinlechen **Bearer-Token** gëtt
   ugewisen. Klickt op **Copy** fir en ze kopéieren.

> Dëse perséinlechen Token ass **temporär** (~12 St.) a mat ären eegene
> Rechter verbonnen. Fir Tester duer en. Fir e dauerhaften Asaz maacht Dir besser
> eng *Integration* mat de passende Berechtegungen.
>
> **Néideg Scopes:**
> `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands`

---

## Schrëtt 4 — D'Konsol opmaachen a verbannen

1. Maacht **`WeRoFleet.html`** an engem modernen Browser op (en
   Duebelklick duer — et ass eng komplett eegestänneg Datei).
2. D'Fënster **„Connect to Webex"** erschéngt.
3. Bei **Webex access token** fügt Dir den Token an, deen Dir am Schrëtt 3
   kopéiert hutt (ouni de Präfix `Bearer `).
4. *(Optional)* **Organization ID**: eidel loossen — par défaut gëtt
   d'Organisatioun vum Token-Besëtzer benotzt.
5. Aktivéiert de Schalter **„Advanced — custom API base / proxy"** a gitt an:
   ```
   http://localhost:8788/v1
   ```
6. Klickt op **Connect**.

Är richteg Raim ginn gelueden.

> **Tipp** — Dir kënnt och op **„Use demo data"** klicken, fir d'Interface
> ouni Verbindung mat engem fiktiven Datesaz z'entdecken.
>
> Äre Token gëtt **nëmmen** am lokale Späicher vun dësem Browser behalen an
> direkt op Webex geschéckt. Et gëtt näischt op WeRoFleet eropgelueden.

---

## Schrëtt 5 — D'Konsol benotzen

Eemol verbonnen, stinn e puer Bildschirmer zur Verfügung (Menü lénks).

### Overview (Iwwerbléck)
Den Dashboard vun der Flott:
- Schlësselzuelen: **Apparater am Ganzen, online, am Uruff, brauch Opmierksamkeet**;
- eng **Flott-Gesondheets-Bar** no Betribszoustand;
- eng **„Needs attention"**-Lëscht (degradéiert oder kritesch Apparater);
- eng **Export**-Ofkierzung.

### Devices (Apparater)
Déi detailléiert Tabell vun alle Apparater:
- **Filteren** (All / Brauch Opmierksamkeet / Am Uruff) an **Sich**;
- Filtere no **Site**;
- **Méifachauswiel** fir Sammelaktiounen: **Nei starten (Reboot)**, **Branding**
  uwenden, **taggen**;
- Klick op en Apparat → **Detailberäich**: Identitéit, Gesondheet,
  Live-xAPI-Status, Peripherie, Historik an e **Reboot**-Knäppchen.

> De Reboot kontrolléiert fir d'éischt, ob den Apparat **an engem Uruff** ass,
> ier en handelt.

### Workspaces (Aarbechtsraim) — Deployment
Fir eng **Konfiguratioun op vill Raim op eemol** unzewenden:
1. Haakt déi gewënschte Raim un (filterbar no **Gebai** + Sich).
2. Wielt e **Preset** aus der Lëscht.
3. Klickt op **Apply preset**.

Nëmmen **passend Apparater** (Zilmodeller) kréien d'Konfiguratioun. Eng
Fortschrëttsfënster weist d'Resultat (Succès / Echecen) live.

Um Enn vum Laf klickt op **Download PDF** fir e **Deploymentsbericht** ze
späicheren — eng Zeil pro Raum (`Raum: OK`, oder `Raum — Feeler:` gefollegt vun
de genaue Grënn), sou datt Feeler einfach z'erkennen, ze behalen an ze deele
sinn.

### Config presets (erëmverwennbar Konfiguratiounen)
Erstellt erëmverwennbar **Konfiguratiounspäck**:
- **Branding** (*Halfwake*-Logo, Hannergrond am Uruff — automatesch
  ugepasst), **eege Message**, **Uruff-Knäppercher**;
- **Standard-Hannergrondbild** — ee vun den am Apparat integréierten
  **Hannergrondbild-Päck** aktivéieren, ausgewielt **no Numm** (oder éischten /
  leschten / Positiounsnummer);
- **Import / Export als JSON** (pro Preset oder all op eemol) fir är
  Konfiguratiounen ze deelen oder z'archivéieren;
- **duplizéieren / änneren / läschen**.

All Preset entsprécht deene selwechte Webex-Routen (`Branding.Upload`,
`CustomMessage`, `UserInterface.Features.Call.*`,
`UserInterface.WallpaperBundle.Set`). Dir **baut se hei** a **wennt se dann aus
Workspaces un**.

> Den apparateweisen **Branding**-Editeur (Apparat-Tirang) kann och
> **d'eege Hannergrondbiller vum Apparat oplëschten** an iech een direkt
> auswiele loossen.

### Settings (Astellungen)
- **Sprooch** vun der Interface: **EN · FR · DE · LB** (pro Browser gespäichert,
  beim éischte Start automatesch erkannt).
- **Webex API rate limit**: max. Ufroen pro Sekonn (Standard **3/s**,
  konservativ). Bei `429 Too Many Requests` **verlangsamt sech d'Konsol a
  probéiert automatesch nei**, duerno klëmmt d'Rate erëm.
- **Fleet auto-refresh**: Intervall tëscht komplette Status-Duerchgäng
  (10 s bis 120 s).
- **Connection**: déi verbonnen Organisatioun kucken oder **Disconnect** (läscht
  den Token a geet zréck op Demo-Donnéeën).

---

## Problemer léisen

| Symptom | Wahrscheinlech Ursaach | Léisung |
|---|---|---|
| „Could not reach Webex" / Netzwierkfeeler | De Proxy leeft net oder d'Adress ass falsch | Kontrolléiert, datt d'Proxy-Fënster **op** ass an datt Advanced op `http://localhost:8788/v1` weist |
| „Invalid token" | Ofgelafenen oder falsch agefügten Token | Kopéiert e frësche Token vun developer.webex.com (ouni `Bearer `) |
| „Missing scope" | Dem Token feelen déi richteg Berechtegungen | E Token mat `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands` benotzen |
| „Rate limited" (429) | Ze vill Ufroen | Normal: d'Konsol reguléiert sech selwer. Dir kënnt d'Rate an **Settings** erofsetzen |
| Keng Apparater ugewisen | Organisatioun ouni Apparater oder falsch Organisatioun | **Organization ID** an der Verbindungsfënster aginn |
| De Proxy start net (Port belaascht) | De Port 8788 ass besat | Op engem anere Port nei starten (`PORT=9000 …`) an d'Advanced-Adress entspriechend upassen |

> De Proxy hält den `Retry-After`-Header, sou datt de automateschen 429-Backoff
> vun der Konsol och duerch en funktionéiert.

---

## Bewäert Praktiken

- **Loosst de Proxy** während der ganzer Sessioun op; maacht en zou (Ctrl + C),
  wann Dir fäerdeg sidd.
- **Testt fir d'éischt am Demo-Modus** („Use demo data"), fir Iech vertraut ze
  maachen, ier Dir op richtegen Apparater schafft.
- **Preparéiert är Presets** am Viraus an deployéiert se dann am Päck aus
  **Workspaces**.
- **Trennt d'Verbindung** (Settings → Disconnect) op engem gedeelten Apparat, fir
  de gespäicherten Token ze läschen.

---

*WeRoFleet ass en onofhängegt Projet, net mat Webex oder Cisco verbonnen. Notz-
an Ännerungsrechter ginn der Universitéit Lëtzebuerg fir hir institutionell
Zwecker accordéiert (kuckt LICENSE).*
