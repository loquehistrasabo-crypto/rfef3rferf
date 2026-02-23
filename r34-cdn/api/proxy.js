const https = require('https');
const http = require('http');

module.exports = (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  const allowed = ['rule34.xxx', 'wimg.rule34.xxx', 'img.rule34.xxx'].some(d => url.includes(d));
  
  if (!allowed) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }
  
  const protocol = url.startsWith('https') ? https : http;
  
  protocol.get(url, (response) => {
    res.setHeader('Content-Type', response.headers['content-type'] || 'video/mp4');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    response.pipe(res);
  }).on('error', () => {
    res.status(500).json({ error: 'Failed to fetch' });
  });
};
