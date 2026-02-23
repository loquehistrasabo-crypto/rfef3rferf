/**
 * Rule34 CDN Proxy - Media Proxy Endpoint
 * Proxies Rule34 media through your own domain
 */

const https = require('https');
const http = require('http');

// Allowed domains
const ALLOWED_DOMAINS = [
  'rule34.xxx',
  'wimg.rule34.xxx',
  'img.rule34.xxx',
  'us.rule34.xxx',
  'api.rule34.xxx'
];

module.exports = async (req, res) => {
  try {
    // Get URL parameter
    const url = req.query.url;
    
    if (!url) {
      return res.status(400).json({ error: "Missing 'url' parameter" });
    }
    
    // Decode URL
    const decodedUrl = decodeURIComponent(url);
    
    // Check if domain is allowed
    const allowed = ALLOWED_DOMAINS.some(domain => decodedUrl.includes(domain));
    
    if (!allowed) {
      return res.status(403).json({ error: 'Domain not allowed' });
    }
    
    // Parse URL
    const urlObj = new URL(decodedUrl);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    // Fetch the media
    protocol.get(decodedUrl, (response) => {
      // Check status
      if (response.statusCode !== 200) {
        return res.status(response.statusCode).json({ 
          error: 'Failed to fetch media',
          status: response.statusCode 
        });
      }
      
      // Set headers
      res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      if (response.headers['content-length']) {
        res.setHeader('Content-Length', response.headers['content-length']);
      }
      
      // Stream the response
      response.pipe(res);
      
    }).on('error', (error) => {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch media', message: error.message });
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
