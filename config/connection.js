var mysql = require('mysql');
	// realiza a conexao

module.exports = function () {
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

    return connection;
}