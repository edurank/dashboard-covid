var mysql = require('mysql');


module.exports = function() {
	// realiza a conexao

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

	//cadastrarUsuario("Edu", "edu@gamcil.com", "asdadjijdas");

	function sendAlert() {
		cadastrarUsuario("Doasjddu", "easdsadu@gamcil.com", "asdadjifjdas");
	}
	
	function getUsuarios() {
		var query = "SELECT * FROM `usuarios`";
	}

	function cadastrarUsuario(nome, email, senha) {
		var query = `INSERT INTO usuarios (id, nome, email, senha) VALUES (NULL, "` + nome + `", "` + email + `", "` + senha + `");`;

		connection.query(query, function(error, results, fields) {
			if (error) throw error;

			console.log(nome + " adicionado ao banco");
		});
		
	}

	function verificaDuplicate(nome) {
		var query = "SELECT * FROM usuarios WHERE nome = '" + nome + "')";
	}

	/*function cadastrarFuncionario(nome, departamento, idade) {
		var query = "INSERT INTO `funcionarios` (`id`, `nome`, `departamento`, `idade`) VALUES (NULL, 'Luiz Eduardo', 'TI', '24');";
	}*/
}