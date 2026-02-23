/**
 * Rule34 CDN Proxy - Media Proxy
 */

const https = require('https');
const http = require('http');

const ALLOWED_DOMAINS = [
  'rule34.xxx',
  'wimg.rule34.xxx',
  'img.rule34.xxx',
  'us.rule34.xxx',
  'api.rule34.xxx'
];

module.exports = (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }
  
  const decodedUrl = decodeURIComponent(url);
  const allowed = ALLOWED_DOMAINS.some(domain => decodedUrl.includes(domain));
  
  if (!allowed) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }
  
  try {
    const urlObj = new URL(decodedUrl);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    protocol.get(decodedUrl, (response) => {
      if (response.statusCode !== 200) {
        return res.status(response.statusCode).json({ error: 'Failed to fetch' });
      }
      
      res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      if (response.headers['content-length']) {
        res.setHeader('Content-Length', response.headers['content-length']);
      }
      
      response.pipe(res);
      
    }).on('error', (error) => {
      res.status(500).json({ error: error.message });
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
