# WeRoFleet — Getting Started (University of Luxembourg) 🇬🇧

This guide walks you through everything, from installation to managing your real
fleet of Webex meeting-room devices (Room Kits, Room Bars, Boards).

WeRoFleet is a **100 % local web console**: a single HTML file that runs in your
browser. No data is sent anywhere — your Webex token stays on your machine and
only ever talks to Webex's servers.

> 🌍 Also available in: [Français](UNILU_FR.md) · [Deutsch](UNILU_DE.md) · [Lëtzebuergesch](UNILU_LB.md)

---

## Overview in 5 steps

1. Download and unzip `WeRoFleet.zip`.
2. Start the **CORS proxy** for your operating system.
3. Get your **Webex access token** from developer.webex.com.
4. Open the **HTML bundle** and connect (token + proxy address).
5. Use the console: monitoring, deployment, settings.

---

## Step 1 — Download WeRoFleet

1. Go to the latest releases page:
   **https://github.com/Ascol57/WeRoFleet/releases/latest**
2. Download **`WeRoFleet.zip`**.
3. **Unzip it** into a folder of your choice (Desktop, Documents…).

Inside you will find:

- the **HTML bundle** (`WeRoFleet.html`) — the application itself;
- a **`proxy/`** folder with the proxy launchers for each OS:
  - `webex-proxy.command` — **macOS**
  - `start-proxy.cmd` (+ `webex-proxy.ps1`) — **Windows**
  - `webex-proxy.sh` — **Linux / Debian**

---

## Step 2 — Start the CORS proxy

> **Why?** The Webex API doesn't allow direct calls from a browser (no CORS
> headers). This tiny proxy runs on your machine, forwards requests to Webex and
> adds the missing headers. Your token only ever goes **browser → localhost →
> Webex**: nothing is uploaded.
>
> Each launcher uses **only what your OS already ships** — no install, no Node,
> no dependency to add.

Open the `proxy/` folder and run the script for **your** system:

### macOS (built-in Ruby)
1. Double-click **`webex-proxy.command`**.
   - If macOS refuses to open it the first time: right-click → **Open**,
     or in Terminal: `chmod +x webex-proxy.command && ./webex-proxy.command`
2. **Leave the window open** while you use the console.

### Windows (built-in PowerShell)
1. Double-click **`start-proxy.cmd`**.
   - (It runs `webex-proxy.ps1` with an execution-policy bypass for this run only.)
2. **Leave the window open.**

### Linux / Debian (bash + built-in python3)
1. In a terminal, from the `proxy/` folder:
   ```bash
   chmod +x webex-proxy.sh   # first time only
   ./webex-proxy.sh          # or: bash webex-proxy.sh
   ```
2. **Leave the terminal open.** To change the port: `PORT=9000 ./webex-proxy.sh`.

➡️ Once running, the proxy listens on **`http://localhost:8788`**.
To stop it when you're done: **Ctrl + C** (or close the window).

---

## Step 3 — Get your Webex access token

1. Go to **https://developer.webex.com/**.
2. Sign in with your account (top right).
3. **Click your avatar**: your personal **Bearer token** is shown. Click
   **Copy** to copy it.

> ⚠️ This personal token is **temporary** (~12 h) and tied to your own rights.
> It's enough for testing. For lasting use, create an *integration* with the
> proper permissions instead.
>
> **Required scopes:**
> `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands`

---

## Step 4 — Open the console and connect

1. Open **`WeRoFleet.html`** in a modern browser (a double-click
   is enough — it's a fully self-contained file).
2. The **"Connect to Webex"** window appears.
3. In **Webex access token**, paste the token you copied in step 3
   (without the `Bearer ` prefix).
4. *(Optional)* **Organization ID**: leave empty — it defaults to the token
   owner's org.
5. Turn on the **"Advanced — custom API base / proxy"** switch and enter:
   ```
   http://localhost:8788/v1
   ```
6. Click **Connect**.

Your real rooms load. ✅

> 💡 **Tip** — You can also click **"Use demo data"** to explore the interface
> without connecting, using a fictional dataset.
>
> 🔒 Your token is stored **only** in this browser's local storage and sent
> directly to Webex. Nothing is uploaded to WeRoFleet.

---

## Step 5 — Use the console

Once connected, several screens are available (left-hand menu).

### 🖥️ Overview
The fleet dashboard:
- key metrics: **total devices, online, in call, needs attention**;
- a **fleet-health** bar by operational state;
- a **"Needs attention"** list (degraded or critical devices);
- an **Export** shortcut.

### 📡 Devices
The detailed table of all devices:
- **filters** (All / Needs attention / In call) and **search**;
- filtering by **site**;
- **multi-select** for bulk actions: **Reboot**, apply **branding**, **tag**;
- click a device → **detail drawer**: identity, health, live xAPI status,
  peripherals, history, and a **Reboot** button.

> Rebooting first checks whether the device is **in a call** before acting.

### 🏢 Workspaces — deployment
To apply a **configuration to many rooms at once**:
1. Tick the rooms you want (filterable by **building** + search).
2. Pick a **preset** from the list.
3. Click **Apply preset** 🚀.

Only **eligible devices** (target models) receive the config. A progress window
shows the result (successes / failures) live.

### 🎨 Config presets (reusable configurations)
Build reusable **configuration bundles**:
- **branding** (*Halfwake* logo, in-call wallpaper — auto-resized),
  **custom message**, **call buttons**;
- **Import / Export as JSON** (per preset or all at once) to share or archive
  your configs;
- **duplicate / edit / delete**.

Each preset maps to the same Webex routes (`Branding.Upload`, `CustomMessage`,
`UserInterface.Features.Call.*`). You **build them here**, then **apply them from
Workspaces**.

### ⚙️ Settings
- **Interface language**: **EN · FR · DE · LB** (remembered per browser,
  auto-detected on first launch).
- **Webex API rate limit**: max requests per second (default **3/s**,
  conservative). On `429 Too Many Requests`, the console **slows down and
  retries automatically**, then climbs back up.
- **Fleet auto-refresh**: interval between full status sweeps (10 s to 120 s).
- **Connection**: see the connected org, or **Disconnect** (clears the token and
  returns to demo data).

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| "Could not reach Webex" / network error | The proxy isn't running, or the address is wrong | Check the proxy window is **open** and that Advanced points at `http://localhost:8788/v1` |
| "Invalid token" | Expired or mis-pasted token | Copy a fresh token from developer.webex.com (without `Bearer `) |
| "Missing scope" | The token lacks the right permissions | Use a token with `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands` |
| "Rate limited" (429) | Too many requests | Normal: the console self-regulates. You can lower the rate in **Settings** |
| No devices shown | Org has no devices, or wrong org | Fill in the **Organization ID** in the connection window |
| Proxy won't start (port in use) | Port 8788 is taken | Restart on another port (`PORT=9000 …`) and adjust the Advanced address accordingly |

> The proxy preserves the `Retry-After` header, so the console's automatic 429
> back-off keeps working through it.

---

## Best practices

- **Leave the proxy open** for the whole session; close it (Ctrl + C) when done.
- **Try demo mode first** ("Use demo data") to get familiar before acting on
  real devices.
- **Prepare your presets** ahead of time, then deploy them in bulk from
  **Workspaces**.
- **Disconnect** (Settings → Disconnect) on a shared machine to clear the stored
  token.

---

*WeRoFleet is an independent project, not affiliated with Webex or Cisco. Use and
modification rights granted to the University of Luxembourg for its institutional
purposes (see LICENSE).*
