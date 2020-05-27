const { createProxyMiddleware } = require("http-proxy-middleware");

const url = "https://www.api.dreamdrone.org/";

module.exports = function (app) { 
    app.use(createProxyMiddleware("/drones", { target: url }));
    app.use(createProxyMiddleware("/features", { target: url }));
    app.use(createProxyMiddleware("/stories", { target: url }));
    app.use(createProxyMiddleware("/users", { target: url }));
}