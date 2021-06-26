// controllers/monitoramento.js
var con = require('../connection.js')();

module.exports = function (app) {
  app.get("/monitoramento", function (req, res) {
    
    var queryCasosPorDepartamento = `
    SELECT departamentos.departamento_nome, COUNT(*) as count, departamentos.departamento_id as depid
    FROM avisos 
    INNER JOIN funcionarios 
    ON funcionarios.funcionario_id = avisos.funcionario_id 
    INNER JOIN departamentos ON funcionarios.departamento_id = departamentos.departamento_id
    GROUP BY departamentos.departamento_nome
    ORDER BY count DESC`;

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
        con.query(queryCasosPorDepartamento, function(e, resultado) {
          if (e) throw e;

          var i;
          var departamentos = [];
          var dados = [];
          for(i = 0 ; i < resultado.length; i++){
            departamentos.push(resultado[i].departamento_nome.toString());
            dados.push(resultado[i].count.toString());
          }
          res.render("pages/monitoramento", {      
            con: con,
            tabeInfo: rezult,
            departamentos: departamentos,
            casosPorDepartamento: dados,
            departamento: result
          });
        });
      });
    });
  });
 
  app.get("/dadosDep/:id", function(req, res) {
    var query = `SELECT
    (SELECT COUNT(*) FROM funcionarios WHERE departamento_id = `+ req.params.id + `) as funcionarios,
    (SELECT COUNT(*) FROM avisos WHERE departamento_id = `+ req.params.id + `) as avisos,
    (SELECT aviso_data FROM avisos WHERE departamento_id = `+ req.params.id + ` ORDER BY avisos.aviso_data LIMIT 1) as ultimo_aviso`; 
    
    con.query(query, function(e, dados) {
      if (e) throw e;
      res.send(dados); 
    });
  });
}
