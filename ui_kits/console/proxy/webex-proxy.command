#!/usr/bin/env ruby
# WeRoFleet — CORS proxy for macOS (uses the Ruby that ships with macOS; no install).
# Double-click this file in Finder, or run:  ruby webex-proxy.command
# Then in the console: Connect → Advanced → base = http://localhost:8788/v1
require 'webrick'
require 'net/http'
require 'uri'

TARGET = 'https://webexapis.com'
PORT   = 8788

class Proxy < WEBrick::HTTPServlet::AbstractServlet
  def service(req, res)
    res['Access-Control-Allow-Origin']   = '*'
    res['Access-Control-Allow-Methods']  = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
    res['Access-Control-Allow-Headers']  = 'Authorization,Content-Type'
    res['Access-Control-Expose-Headers'] = 'Retry-After'
    return (res.status = 204) if req.request_method == 'OPTIONS'

    uri  = URI(TARGET + req.unparsed_uri)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    fwd = Net::HTTPGenericRequest.new(req.request_method, !req.body.nil?, true, uri.request_uri)
    fwd['Authorization'] = req['authorization'].to_s
    fwd['Content-Type']  = req['content-type'] || 'application/json'
    r = http.request(fwd, req.body)

    res.status = r.code.to_i
    res['Content-Type'] = r['content-type'] || 'application/json'
    res['Retry-After']  = r['retry-after'] if r['retry-after']   # keeps the 429 backoff working
    res.body = r.body || ''
  rescue => e
    res.status = 502
    res.body = %({"message":"proxy error: #{e.message}"})
  end
end

server = WEBrick::HTTPServer.new(Port: PORT, BindAddress: '127.0.0.1',
                                 AccessLog: [], Logger: WEBrick::Log.new(File::NULL))
server.mount('/', Proxy)
trap('INT') { server.shutdown }
puts "WeRoFleet CORS proxy → http://localhost:#{PORT}  (forwards to webexapis.com)"
puts "In the console: Connect → Advanced → base = http://localhost:#{PORT}/v1"
puts "Press Ctrl+C to stop."
server.start
