var mysql = require('mysql');
// Conexão ao banco de dados

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
            return false;
        }
    });

    connection.query("SET lc_time_names = 'pt_PT';", function(e, res){});

    return connection;
}


