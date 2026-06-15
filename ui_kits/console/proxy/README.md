# WeRoFleet — local CORS proxy

Webex's API doesn't send CORS headers for browser calls, so a 100%-local HTML
console can't call it directly. This tiny proxy runs on your machine, forwards
requests to `webexapis.com`, and adds the CORS headers the browser needs. Your
token only ever goes from your browser → localhost → Webex. Nothing is uploaded.

**Each launcher uses only what the OS already ships — no Node, no install.**

## macOS  (built-in Ruby)
1. Double-click `webex-proxy.command` in Finder.
   - First time it may say it can't run: right-click → **Open**, or run in Terminal:
     `chmod +x webex-proxy.command && ./webex-proxy.command`
2. Leave the window open.

## Windows  (built-in PowerShell)
1. Double-click `start-proxy.cmd`.
   - (It runs `webex-proxy.ps1` with an execution-policy bypass for this run only.)
2. Leave the window open.

## Linux / Debian  (bash + built-in python3)
1. In a terminal, from this folder:
   ```
   chmod +x webex-proxy.sh   # first time only
   ./webex-proxy.sh          # or:  bash webex-proxy.sh
   ```
2. Leave the terminal open. Override the port if needed: `PORT=9000 ./webex-proxy.sh`.

## Then, in the console
Open **Connect → Advanced — custom API base / proxy** and set:

```
http://localhost:8788/v1
```

Paste your bearer token + org-id and connect as usual. Stop the proxy with
**Ctrl+C** (or close its window) when you're done.

The proxy preserves the `Retry-After` header, so the console's 429 backoff keeps
working through it.
