const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) { app.use( '/api', createProxyMiddleware({ target: 'http://localhost:26262', changeOrigin: true, }) );};