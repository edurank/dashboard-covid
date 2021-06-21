const monitoramento = require('./monitoramento.js');
const teste = require('./teste.js');
const dashboard = require('./dashboard.js');

module.exports = function(app) {
  monitoramento(app);
  teste(app);
  dashboard(app);
}
