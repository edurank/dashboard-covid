var con = require('../connection')();

module.exports = function() { 
	var controller = {};
    var getFuncionarios = `
    SELECT funcionario_nome, funcionarios.funcionario_id, funcionarios.departamento_id, departamentos.departamento_nome
    FROM funcionarios
    INNER JOIN departamentos
    ON funcionarios.departamento_id = departamentos.departamento_id
    `;
    
    controller.konf = function(req, res) {
  
        con.query(getFuncionarios, function (error, listaFuncionarios) {
            if (error) throw error;
            res.render("pages/konf", {
                funcionarios: listaFuncionarios });
        });
    };
	return controller;   

}
