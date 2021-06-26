// controller/dashboard.js
const con = require('../connection.js')();
const moment = require('moment');


module.exports = function (app) {
  app.get("/dashboard", function (req, res){
      
    var queryCasosPorDepartamento = `
    SELECT departamentos.departamento_nome, COUNT(*) as count, departamentos.departamento_id as depid
    FROM avisos 
    INNER JOIN funcionarios 
    ON funcionarios.funcionario_id = avisos.funcionario_id 
    INNER JOIN departamentos ON funcionarios.departamento_id = departamentos.departamento_id
    GROUP BY departamentos.departamento_nome
    ORDER BY count DESC`;

    var avisosNaoVis = `
    SELECT COUNT(*) as naoVis
    FROM avisos
    WHERE visualizado = 0;
    `;

    var ultimosAvisos = `
    SELECT *
    FROM avisos
    INNER JOIN funcionarios
    ON funcionarios.funcionario_id = avisos.funcionario_id
    INNER JOIN departamentos 
    ON funcionarios.departamento_id = departamentos.departamento_id
    ORDER BY avisos.aviso_data
    DESC LIMIT 3;
    `;

    var qAvisos = `
      SELECT MONTHNAME(avisos.aviso_data) as aAmes, COUNT(*) as qAavisos
      FROM avisos
      GROUP BY YEAR(avisos.aviso_data), MONTH(avisos.aviso_data);
    `;


    con.query(queryCasosPorDepartamento, function(e, resultado) {
      if(e) throw e;

      var i;
      var departamentos = [];
      var dados = [];
      var dep_id = [];
      for(i = 0 ; i < resultado.length; i++){
        departamentos.push(resultado[i].departamento_nome.toString());
        dados.push(resultado[i].count.toString());
        dep_id.push(resultado[i].depid.toString());
      }
      con.query(`SELECT COUNT(*) as cnt FROM avisos`, function(err, result) {
        if (err) throw err;

        con.query(avisosNaoVis, function(errr, resq) {
          if (errr) throw errr;
          con.query(ultimosAvisos, function(errro, resx) {
            if (errro) throw errro;
            con.query(qAvisos, function(e, rx) {
              if (e) throw e;
              res.render("pages/dashboard", {
                departamentos: departamentos,
                casosPorDepartamento: dados,
                departamento_id: dep_id,
                total_avisos: result,
                moment: moment,
                ultimos_avisos: resx,
                qAvisos: rx,
                naoVis: resq
              });
            });
          });
        });
      });
    });
  })
}

