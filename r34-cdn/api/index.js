module.exports = (req, res) => {
  res.json({
    name: 'Rule34 CDN',
    status: 'online',
    proxy: '/api/proxy?url=YOUR_URL'
  });
};
