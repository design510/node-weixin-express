var localtunnel = require('localtunnel');

module.exports = function (config, options) {
  function startTunnel() {
    var tunnel = localtunnel(config.port, options, function (err, tunnel) {
      if (err) {
        console.log('fail to create tunnel');
      }
      console.log('Succeeded to create tunnel');
      console.log('Your tunnel url is ' + tunnel.url);
    });

    tunnel.on('close', function () {
      // tunnels are closed
      console.log('tunnels are closed');
    });
  }
  startTunnel();
  process.on('uncaughtException', function (err) {
    // handle the error safely
    if (String(err).indexOf('localtunnel.me') !== -1) {
      startTunnel();
    }
  });
};