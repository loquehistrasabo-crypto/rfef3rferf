"""
Rule34 Media CDN Proxy for Vercel
Proxies Rule34 media through your own domain
"""

from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs, unquote
import requests

# Allowed domains
ALLOWED_DOMAINS = [
    'rule34.xxx',
    'wimg.rule34.xxx', 
    'img.rule34.xxx',
    'us.rule34.xxx',
    'api.rule34.xxx'
]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse URL
            parsed = urlparse(self.path)
            params = parse_qs(parsed.query)
            
            # Get URL parameter
            if 'url' not in params:
                self.send_error(400, "Missing 'url' parameter")
                return
            
            url = unquote(params['url'][0])
            
            # Check if domain is allowed
            allowed = False
            for domain in ALLOWED_DOMAINS:
                if domain in url:
                    allowed = True
                    break
            
            if not allowed:
                self.send_error(403, "Domain not allowed")
                return
            
            # Fetch the media
            response = requests.get(url, stream=True, timeout=30)
            
            if response.status_code != 200:
                self.send_error(response.status_code, "Failed to fetch media")
                return
            
            # Send headers
            self.send_response(200)
            self.send_header('Content-Type', response.headers.get('Content-Type', 'application/octet-stream'))
            self.send_header('Cache-Control', 'public, max-age=86400')
            self.send_header('Access-Control-Allow-Origin', '*')
            
            # Send content length if available
            if 'Content-Length' in response.headers:
                self.send_header('Content-Length', response.headers['Content-Length'])
            
            self.end_headers()
            
            # Stream the content
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    self.wfile.write(chunk)
        
        except Exception as e:
            self.send_error(500, f"Error: {str(e)}")
    
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
