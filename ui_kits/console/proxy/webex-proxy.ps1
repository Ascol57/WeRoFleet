# WeRoFleet — CORS proxy for Windows (uses built-in PowerShell + .NET; no install).
# Easiest: double-click  start-proxy.cmd  (next to this file).
# Or run:  powershell -ExecutionPolicy Bypass -File webex-proxy.ps1
# Then in the console: Connect → Advanced → base = http://localhost:8788/v1

$TARGET = 'https://webexapis.com'
$PORT   = 8788

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$PORT/")   # 'localhost' prefix needs no admin
$listener.Start()
$client = [System.Net.Http.HttpClient]::new()

Write-Host "WeRoFleet CORS proxy -> http://localhost:$PORT  (forwards to webexapis.com)"
Write-Host "In the console: Connect -> Advanced -> base = http://localhost:$PORT/v1"
Write-Host "Press Ctrl+C to stop."

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  $res.Headers['Access-Control-Allow-Origin']   = '*'
  $res.Headers['Access-Control-Allow-Methods']  = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
  $res.Headers['Access-Control-Allow-Headers']  = 'Authorization,Content-Type'
  $res.Headers['Access-Control-Expose-Headers'] = 'Retry-After'

  if ($req.HttpMethod -eq 'OPTIONS') { $res.StatusCode = 204; $res.Close(); continue }

  try {
    $url = $TARGET + $req.RawUrl
    $msg = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::new($req.HttpMethod), $url)
    if ($req.HasEntityBody) {
      $sr = [System.IO.StreamReader]::new($req.InputStream)
      $body = $sr.ReadToEnd(); $sr.Close()
      $ct = if ($req.ContentType) { ($req.ContentType -split ';')[0] } else { 'application/json' }
      $msg.Content = [System.Net.Http.StringContent]::new($body, [System.Text.Encoding]::UTF8, $ct)
    }
    $auth = $req.Headers['Authorization']
    if ($auth) { [void]$msg.Headers.TryAddWithoutValidation('Authorization', $auth) }

    $r = $client.SendAsync($msg).Result
    $res.StatusCode = [int]$r.StatusCode
    if ($r.Headers.RetryAfter) { $res.Headers['Retry-After'] = $r.Headers.RetryAfter.ToString() }
    $bytes = $r.Content.ReadAsByteArrayAsync().Result
    $res.ContentType = if ($r.Content.Headers.ContentType) { $r.Content.Headers.ContentType.ToString() } else { 'application/json' }
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    $res.StatusCode = 502
    $b = [System.Text.Encoding]::UTF8.GetBytes((@{ message = "proxy error: $($_.Exception.Message)" } | ConvertTo-Json))
    $res.OutputStream.Write($b, 0, $b.Length)
  } finally { $res.Close() }
}
