var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	database : 'epivision',
	user : 'root',
	password : '',
});


// realiza a conexao
connection.connect(function(err) {
	if(err) {
		console.error("Erro ao conectar: " + err.stack);
		return;
	}
	
	console.log('Conectado!!');
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

cadastrarUsuario("Fulano", "fulano@gmail.com", "123123123");

function selectUsuarios() {
	var query = "SELECT * FROM `usuarios`";
}
function cadastrarUsuario(nome, email, senha) {
	var query = "INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES (NULL, `" + nome + "`, `" + email + "`, `" + senha + "`);";

	connection.query(query, function(error, results, fields) {
		if (error) throw error;

		results.forEach(result=>{console.log(result)});
	});
}

/*function cadastrarFuncionario(nome, departamento, idade) {
	var query = "INSERT INTO `funcionarios` (`id`, `nome`, `departamento`, `idade`) VALUES (NULL, 'Luiz Eduardo', 'TI', '24');";
}*/
