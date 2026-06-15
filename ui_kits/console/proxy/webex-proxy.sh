#!/usr/bin/env bash
# WeRoFleet — CORS proxy for Linux / Debian.
# Uses bash + python3 standard library only (no pip, no apt install).
#
#   chmod +x webex-proxy.sh   # first time only
#   ./webex-proxy.sh          # or:  bash webex-proxy.sh
#
# Then in the console: Connect → Advanced → base = http://localhost:8788/v1
# Stop with Ctrl+C.
set -euo pipefail

PORT="${PORT:-8788}"
TARGET="${TARGET:-https://webexapis.com}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "error: python3 not found. Install it with:  sudo apt install python3" >&2
  exit 1
fi

PORT="$PORT" TARGET="$TARGET" exec python3 - "$@" <<'PY'
# Tiny CORS-adding reverse proxy to webexapis.com. Stdlib only.
import os, sys, json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib import request as urlrequest
from urllib.error import HTTPError, URLError

PORT   = int(os.environ.get("PORT", "8788"))
TARGET = os.environ.get("TARGET", "https://webexapis.com").rstrip("/")

CORS = {
    "Access-Control-Allow-Origin":   "*",
    "Access-Control-Allow-Methods":  "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":  "Authorization,Content-Type",
    "Access-Control-Expose-Headers": "Retry-After",
}

class Proxy(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def _cors(self):
        for k, v in CORS.items():
            self.send_header(k, v)

    def _send_json(self, status, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _forward(self):
        # Preflight: answer locally.
        if self.command == "OPTIONS":
            self.send_response(204)
            self._cors()
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else None

        url = TARGET + self.path  # self.path keeps the full path + query
        req = urlrequest.Request(url, data=body, method=self.command)
        auth = self.headers.get("Authorization")
        if auth:
            req.add_header("Authorization", auth)
        req.add_header("Content-Type", self.headers.get("Content-Type") or "application/json")

        try:
            with urlrequest.urlopen(req) as r:
                status, headers, data = r.status, r.headers, r.read()
        except HTTPError as e:
            # Webex returned a real HTTP status (401/429/...) — pass it through,
            # body and all, so the console's error handling + 429 backoff work.
            status, headers, data = e.code, e.headers, e.read()
        except URLError as e:
            return self._send_json(502, {"message": f"proxy error: {e.reason}"})
        except Exception as e:  # noqa: BLE001
            return self._send_json(502, {"message": f"proxy error: {e}"})

        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", headers.get("Content-Type") or "application/json")
        retry = headers.get("Retry-After")
        if retry:
            self.send_header("Retry-After", retry)  # keeps the 429 backoff working
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    # All methods funnel through _forward.
    do_GET = do_POST = do_PATCH = do_PUT = do_DELETE = do_OPTIONS = _forward

    def log_message(self, *a):  # silence per-request logging
        pass

if __name__ == "__main__":
    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Proxy)
    print(f"WeRoFleet CORS proxy -> http://localhost:{PORT}  (forwards to {TARGET})")
    print(f"In the console: Connect -> Advanced -> base = http://localhost:{PORT}/v1")
    print("Press Ctrl+C to stop.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped.")
PY
