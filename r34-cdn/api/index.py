"""
Index page for CDN
"""

from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        response = {
            'name': 'Rule34 CDN Proxy',
            'status': 'online',
            'usage': '/proxy?url=<encoded_url>',
            'example': '/proxy?url=https%3A%2F%2Fwimg.rule34.xxx%2Fimages%2F1234%2Fabcd.mp4',
            'allowed_domains': [
                'rule34.xxx',
                'wimg.rule34.xxx',
                'img.rule34.xxx',
                'us.rule34.xxx',
                'api.rule34.xxx'
            ]
        }
        
        self.wfile.write(json.dumps(response, indent=2).encode())
