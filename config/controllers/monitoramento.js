// controllers/monitoramento
var con = require('../connection.js')();

module.exports = function (app) {
  app.get("/monitoramento", function (req, res) {
    var query = `
      SELECT *
      FROM departamentos
      `;
    var queryInfo = `
      SELECT * FROM avisos 
      INNER JOIN funcionarios 
       ON avisos.funcionario_id = funcionarios.funcionario_id 
      INNER JOIN departamentos 
       ON funcionarios.departamento_id = departamentos.departamento_id;
      `;
    con.query(query, function(error, result) {
      if (error) throw error;

      con.query(queryInfo, function(erro, rezult) {
        if (erro) throw erro;
        res.render("pages/monitoramento", {      
          con: con,
            tabeInfo: rezult,
            departamento: result
        });
      });
    });
  });
}
