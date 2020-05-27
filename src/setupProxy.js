const { createProxyMiddleware } = require("http-proxy-middleware");

const url =
  "http://backenddreamdrones-env.eba-g2dzmmfp.us-east-2.elasticbeanstalk.com";

module.exports = function (app) { 
    app.use(createProxyMiddleware("/drones", { target: url }));
    app.use(createProxyMiddleware("/features", { target: url }));
    app.use(createProxyMiddleware("/stories", { target: url }));
    app.use(createProxyMiddleware("/users", { target: url }));
}