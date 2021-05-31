var mysql = require('mysql');
// realiza a conexao

//module.exports = function () {

	var connection = mysql.createConnection({
		host : 'localhost',
		database : 'epivision',
		user : 'root',
		password : '',
	});

	connection.connect(function(err) {
		if(err) {
			console.error("Erro ao conectar: " + err.stack);
			return;
		}
		console.log('Conectado ao banco.');
	});

	// FUNCIONARIOS
	function getFuncionarios() {
		connection.query('SELECT * FROM funcionarios', function(error, results, fields) {
			if (error) {
				throw error;
			}
			results.forEach(result => {
				console.log(result);
			});
		});
	}

	function sendAlert() {
		cadastrarUsuario("Doasjddu", "easdsadu@gamcil.com", "asdadjifjdas");
	}

	function getUsuarios() {
		var query = "SELECT * FROM `usuarios`";
	}

	//connection.selectFuncionarios = selectFuncionarios();
	// INÍCIO FUNCIONARIOS		

	/*  tabela 'funcionarios'
		- id (PRIMARY KEY)
		- nome (varchar)
		- departamento (varchar)
		- idade (int)
		- avisos (int)
		- grupo_risco (int)  * 0 = false / 1 = true
	*/



	// Pie chart (pega quantidade de avisos por departamento)
	function getAvisosByDepartamento() {
		//var query = `SELECT departamento, COUNT(*)FROM avisos GROUP BY departamento;`;

		var query = `SELECT departamentos.departamento_nome, COUNT(*) as count FROM avisos INNER JOIN funcionarios ON funcionarios.funcionario_id = avisos.funcionario_id INNER JOIN departamentos ON funcionarios.departamento_id = departamentos.departamento_id GROUP BY departamentos.departamento_nome ORDER BY count DESC`;

		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			var i;
			var departamentos = [];
			var dados = [];
			for(i = 0 ; i < results.length; i++){
				departamentos.push(results[i].departamento_nome);
				dados.push(results[i].count);
			}
			console.log(departamentos);
			console.log(dados);
		});
	}

	// Pega quantidade de casos por semana
	function getAvisosBySemana() {
		var query = `SELECT data, COUNT(*)FROM avisos GROUP BY data`;
		
		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			console.log(results);
		});
	}

	// Deleta o funcionário no sistema
	function deletaFuncionario() {
		var query = `DELETE FROM funcionarios WHERE id = "`+id+`"`;

		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			console.log(id + " removido do banco");
		});
	}

	// Seleciona todos os funciona´rios
	function selectFuncionarios() {
		var query = `SELECT * FROM funcionarios`;

		connection.query(query, function (e, res) {
			if (e) throw e;

			console.log(res);
		});
	}

	// FIM 'FUNCIONARIOS'
	// INÍCIO 'USUARIOS'
	/*  tabela 'usuarios'
		- id (PRIMARY)
		- nome (varchar)
		- email (varchar)
		- senha (varchar)
	*/

	// Cadastra um usuário no sistema
	function cadastrarUsuario(nome, email, senha) {
		var query = `INSERT INTO usuarios (id, nome, email, senha) VALUES (NULL, "` + nome + `", "` + email + `", "` + senha + `");`;

		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			console.log(nome + " adicionado ao banco");
		});
	}

	function loginUsuario(user, senha) {
		var query = `SELECT * from usuarios WHERE usuario = '` + user + `'AND senha = '` + senha + `';`;

		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			console.log(results);	
		});
	}

	// Deleta o usuário do banco
	function deletaUsuario() {
		var query = `DELETE FROM usuarios WHERE id = "`+id+`"`;

		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			console.log(id + " removido do banco");
		});
	}

	function verificaDuplicate(nome) {
		var query = "SELECT * FROM usuarios WHERE nome = '" + nome + "')";
	}

	/*function cadastrarFuncionario(nome, departamento, idade) {
		var query = "INSERT INTO `funcionarios` (`id`, `nome`, `departamento`, `idade`) VALUES (NULL, 'Luiz Eduardo', 'TI', '24');";
	}*/
//}

getAvisosByDepartamento();