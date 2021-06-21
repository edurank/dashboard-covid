// controllers/teste.js

var con = require('../connection')();

module.exports = function(app) { 
  var getFuncionarios = `
  SELECT funcionario_nome, funcionarios.funcionario_id, funcionarios.departamento_id, departamentos.departamento_nome
  FROM funcionarios
  INNER JOIN departamentos
  ON funcionarios.departamento_id = departamentos.departamento_id
  `;
    
  app.get("/teste", function(req, res) {
    con.query(getFuncionarios, function (error, listaFuncionarios) {
      if (error) throw error;
      res.render("pages/paginaTeste", {
        funcionarios: listaFuncionarios });
    });
  });
}
