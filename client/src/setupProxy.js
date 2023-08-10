const { createproxymiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createproxymiddleware({
      target: 'http://localhost:6000',
      changeorigin: true,
    })
  );
};