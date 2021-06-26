const monitoramento = require('./monitoramento.js');
const teste = require('./teste.js');
const dashboard = require('./dashboard.js');
const login = require('./login.js');
const cadastro = require('./cadastro.js');

module.exports = function(app) {
  monitoramento(app);
  teste(app);
  dashboard(app);
  login(app);
  cadastro(app);






}
