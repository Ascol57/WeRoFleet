# WeRoFleet — Guide de démarrage (Université du Luxembourg)

Ce guide vous accompagne pas à pas, de l'installation jusqu'à la gestion réelle
de votre flotte de salles Webex (Room Kits, Room Bars, Boards).

WeRoFleet est une **console web 100 % locale** : un seul fichier HTML qui tourne
dans votre navigateur. Aucune donnée n'est envoyée ailleurs — votre jeton Webex
reste sur votre poste et ne parle qu'aux serveurs de Webex.

> Disponible aussi en : [English](UNILU_EN.md) · [Deutsch](UNILU_DE.md) · [Lëtzebuergesch](UNILU_LB.md)

---

## Aperçu en 5 étapes

1. Télécharger et décompresser `WeRoFleet.zip`.
2. Lancer le **proxy CORS** correspondant à votre système d'exploitation.
3. Récupérer votre **jeton d'accès Webex** sur developer.webex.com.
4. Ouvrir le **bundle HTML** et s'y connecter (jeton + adresse du proxy).
5. Utiliser la console : supervision, déploiement, réglages.

---

## Étape 1 — Télécharger WeRoFleet

1. Rendez-vous sur la page des dernières versions :
   **https://github.com/Ascol57/WeRoFleet/releases/latest**
2. Téléchargez le fichier **`WeRoFleet.zip`**.
3. **Décompressez-le** dans un dossier de votre choix (Bureau, Documents…).

À l'intérieur, vous trouverez notamment :

- le **bundle HTML** (`WeRoFleet.html`) — l'application elle-même ;
- un dossier **`proxy/`** contenant les lanceurs du proxy pour chaque OS :
  - `webex-proxy.command` — **macOS**
  - `start-proxy.cmd` (+ `webex-proxy.ps1`) — **Windows**
  - `webex-proxy.sh` — **Linux / Debian**

---

## Étape 2 — Lancer le proxy CORS

> **Pourquoi ?** L'API Webex n'autorise pas les appels directs depuis un
> navigateur (en-têtes CORS absents). Ce petit proxy tourne sur votre machine,
> transmet les requêtes à Webex et ajoute les en-têtes manquants. Votre jeton
> ne fait que **navigateur → localhost → Webex** : rien n'est téléversé.
>
> Chaque lanceur n'utilise **que ce que votre OS fournit déjà** — aucune
> installation, ni dépendance à ajouter.

Ouvrez le dossier `proxy/` et lancez le script de **votre** système :

### macOS (Ruby intégré)
1. Double-cliquez sur **`webex-proxy.command`**.
   - Si macOS refuse de l'ouvrir la première fois : clic droit → **Ouvrir**,
     ou dans le Terminal : `chmod +x webex-proxy.command && ./webex-proxy.command`
2. **Laissez la fenêtre ouverte** tant que vous utilisez la console.

### Windows (PowerShell intégré)
1. Double-cliquez sur **`start-proxy.cmd`**.
   - (Il exécute `webex-proxy.ps1` avec un contournement de la stratégie
     d'exécution, valable uniquement pour cette session.)
2. **Laissez la fenêtre ouverte.**

### Linux / Debian (bash + python3 intégré)
1. Dans un terminal, depuis le dossier `proxy/` :
   ```bash
   chmod +x webex-proxy.sh   # la première fois seulement
   ./webex-proxy.sh          # ou : bash webex-proxy.sh
   ```
2. **Laissez le terminal ouvert.** Pour changer de port : `PORT=9000 ./webex-proxy.sh`.

Une fois lancé, le proxy écoute sur **`http://localhost:8788`**.
Pour l'arrêter quand vous avez terminé : **Ctrl + C** (ou fermez la fenêtre).

---

## Étape 3 — Récupérer votre jeton d'accès Webex

1. Allez sur **https://developer.webex.com/**.
2. Connectez-vous avec votre compte (en haut à droite).
3. **Cliquez sur votre avatar** : votre **jeton (Bearer token)** personnel
   s'affiche. Cliquez sur **Copy** pour le copier.

> Ce jeton personnel est **temporaire** (≈ 12 h) et lié à vos droits. Il
> suffit pour tester. Pour un usage durable, créez plutôt une *integration*
> avec les permissions adéquates.
>
> **Permissions (scopes) nécessaires :**
> `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands`

---

## Étape 4 — Ouvrir la console et se connecter

1. Ouvrez le fichier **`WeRoFleet.html`** dans un navigateur
   moderne (double-clic suffit — c'est un fichier autonome).
2. La fenêtre **« Se connecter à Webex »** apparaît.
3. Dans **Webex access token**, collez le jeton copié à l'étape 3
   (sans le préfixe `Bearer `).
4. *(Facultatif)* **Organization ID** : laissez vide — par défaut, l'org du
   propriétaire du jeton est utilisée.
5. Activez l'interrupteur **« Advanced — custom API base / proxy »** et saisissez :
   ```
   http://localhost:8788/v1
   ```
6. Cliquez sur **Connect**.

Vos vraies salles se chargent.

> **Astuce** — Vous pouvez aussi cliquer sur **« Use demo data »** pour
> explorer l'interface sans connexion, avec un jeu de données fictif.
>
> Votre jeton est conservé **uniquement** dans le stockage local de ce
> navigateur et envoyé directement à Webex. Rien n'est téléversé vers WeRoFleet.

---

## Étape 5 — Utiliser la console

Une fois connecté, vous disposez de plusieurs écrans (menu de gauche).

### Overview (Vue d'ensemble)
Le tableau de bord de la flotte :
- métriques clés : **total d'appareils, en ligne, en appel, à surveiller** ;
- barre de **santé de la flotte** par état opérationnel ;
- liste **« Needs attention »** (appareils dégradés ou critiques) ;
- raccourci **Export**.

### Devices (Appareils)
La table détaillée de tous les appareils :
- **filtres** (Tous / À surveiller / En appel) et **recherche** ;
- filtrage par **site** ;
- **sélection multiple** pour des actions groupées : **redémarrer (Reboot)**,
  appliquer un **branding**, **taguer** ;
- clic sur un appareil → **panneau de détail** : identité, santé, statut xAPI en
  direct, périphériques, historique, et bouton **Reboot**.

> Le redémarrage vérifie d'abord si l'appareil est **en appel** avant d'agir.

### Workspaces (Espaces / Salles) — déploiement
Pour appliquer une **configuration à plusieurs salles d'un coup** :
1. Cochez les salles voulues (filtrables par **bâtiment** + recherche).
2. Choisissez un **preset** dans la liste.
3. Cliquez sur **Apply preset**.

Seuls les **appareils éligibles** (modèles ciblés) reçoivent la config. Une
fenêtre de progression affiche le résultat (réussites / échecs) en direct.

À la fin de l'exécution, cliquez sur **Download PDF** pour enregistrer un
**rapport de déploiement** — une ligne par salle (`Salle : OK`, ou
`Salle — Erreur :` suivi des raisons exactes) : les échecs sont ainsi faciles à
repérer, conserver et partager.

### Config presets (Configurations réutilisables)
Créez des **bundles de configuration** réutilisables :
- **branding** (logo *Halfwake*, fond d'écran d'appel — auto-redimensionnés),
  **message personnalisé**, **boutons d'appel** ;
- **fond d'écran par défaut** — activer l'un des **packs de fonds d'écran**
  intégrés à l'appareil, choisi **par nom** (ou premier / dernier / position) ;
- **Import / Export en JSON** (par preset ou tous d'un coup) pour partager ou
  archiver vos configs ;
- **dupliquer / éditer / supprimer**.

Chaque preset correspond aux mêmes routes Webex (`Branding.Upload`,
`CustomMessage`, `UserInterface.Features.Call.*`,
`UserInterface.WallpaperBundle.Set`). On les **construit ici**, puis on les
**applique depuis Workspaces**.

> L'éditeur **Branding** par appareil (tiroir de l'appareil) peut aussi
> **lister les fonds d'écran propres à l'appareil** et vous laisser en choisir un
> directement.

### Settings (Réglages)
- **Langue** de l'interface : **EN · FR · DE · LB** (mémorisée par navigateur,
  détectée automatiquement au premier lancement).
- **Webex API rate limit** : nombre max de requêtes/seconde (défaut **3/s**,
  prudent). En cas de `429 Too Many Requests`, la console **ralentit et
  réessaie automatiquement**, puis remonte en cadence.
- **Fleet auto-refresh** : intervalle entre deux balayages complets de statut
  (10 s à 120 s).
- **Connection** : voir l'org connectée, ou **Disconnect** (efface le jeton et
  repasse en données de démo).

---

## Résoudre les problèmes

| Symptôme | Cause probable | Solution |
|---|---|---|
| « Could not reach Webex » / erreur réseau | Le proxy n'est pas lancé ou l'adresse est fausse | Vérifiez que la fenêtre du proxy est **ouverte** et que l'avancé pointe sur `http://localhost:8788/v1` |
| « Invalid token » | Jeton expiré ou mal collé | Recopiez un jeton frais depuis developer.webex.com (sans `Bearer `) |
| « Missing scope » | Le jeton n'a pas les bonnes permissions | Utilisez un jeton avec `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands` |
| « Rate limited » (429) | Trop de requêtes | Normal : la console se régule seule. Vous pouvez baisser le débit dans **Settings** |
| Aucun appareil affiché | Org sans appareils, ou mauvaise org | Renseignez l'**Organization ID** dans la fenêtre de connexion |
| Le proxy ne démarre pas (port occupé) | Le port 8788 est pris | Relancez avec un autre port (`PORT=9000 …`) et adaptez l'adresse avancée en conséquence |

> Le proxy conserve l'en-tête `Retry-After`, donc la temporisation automatique
> de la console (sur 429) continue de fonctionner à travers lui.

---

## Bonnes pratiques

- **Laissez le proxy ouvert** pendant toute la session ; fermez-le (Ctrl + C)
  à la fin.
- **Testez d'abord en démo** (« Use demo data ») pour vous familiariser avant
  d'agir sur de vrais appareils.
- **Préparez vos presets** à l'avance, puis déployez-les par lot depuis
  **Workspaces**.
- **Déconnectez-vous** (Settings → Disconnect) sur un poste partagé pour
  effacer le jeton stocké.

---

*WeRoFleet est un projet indépendant, non affilié à Webex ou Cisco. Droits
d'usage et de modification accordés à l'Université du Luxembourg pour ses
besoins institutionnels (voir LICENSE).*
