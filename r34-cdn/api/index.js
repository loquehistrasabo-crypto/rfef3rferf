/**
 * Rule34 CDN Proxy - Index/Status Page
 */

module.exports = async (req, res) => {
  res.status(200).json({
    name: 'Rule34 CDN Proxy',
    status: 'online',
    usage: '/api/proxy?url=<encoded_url>',
    example: '/api/proxy?url=https%3A%2F%2Fwimg.rule34.xxx%2Fimages%2F1234%2Fabcd.mp4',
    allowed_domains: [
      'rule34.xxx',
      'wimg.rule34.xxx',
      'img.rule34.xxx',
      'us.rule34.xxx',
      'api.rule34.xxx'
    ]
  });
};
