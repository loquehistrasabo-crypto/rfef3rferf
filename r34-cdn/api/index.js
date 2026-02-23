/**
 * Rule34 CDN Proxy - Main Entry Point
 */

module.exports = (req, res) => {
  res.status(200).json({
    name: 'Rule34 CDN Proxy',
    status: 'online',
    endpoints: {
      status: '/',
      proxy: '/proxy?url=<encoded_url>'
    },
    example: '/proxy?url=https%3A%2F%2Fwimg.rule34.xxx%2Fimages%2F1234%2Fabcd.mp4'
  });
};
