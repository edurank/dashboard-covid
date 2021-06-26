// controllers/teste.js
var con = require('../connection')();

module.exports = function(app) { 
   

  // página de teste
  app.get("/teste", function(req, res) {
      res.render("pages/teste");
  });
  
  // busca dados do departamento na tela monitoramento.ejs
  app.get("/dados/:id", function(req, res) {
    var query = `
      SELECT funcionarios.funcionario_nome, funcionarios.funcionario_idade as idade
      FROM funcionarios
      WHERE funcionarios.funcionario_id = ` + req.params.id;
    
    con.query(query, function(e, r) {
      if (e) throw e;
      console.log(r);
      res.send(r);
    });
  });
}
