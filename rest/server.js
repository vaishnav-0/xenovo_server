require('./config');
const fs = require('fs');
const express = require('express');
const app = require('./src/app');
const https = require('https');
const PORT = parseInt(process.env.PORT, 10) || 1124;

// var key = fs.readFileSync(process.env.KEY_LOCATION);
// var cert = fs.readFileSync(process.env.CERT_LOCATION);
var options = {
  // key: key,
  // cert: cert
};
// const httpsServer = https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server started at Port : ${PORT}`);
// })

//app.use("/public",express.static('static'));
//
app.listen(PORT, () => {
 console.log(`Server started at Port : ${PORT}`);
})

//const app2 = express();
//app2.get("/.well-known/acme-challenge/TjDtInI9snNCl7avgOUcmwmA2OGLxLOmrtA54WkL7Pg",function (req, res) {
//  res.sendFile("/home/bitnami/haletale-server" + "/static/.well-known/acme-challenge/TjDtInI9snNCl7avgOUcmwmA2OGLxLOmrtA54WkL7Pg")
//});
//app2.listen(80, () => {
//    console.log(`Server started at Port : 80`);
//})
