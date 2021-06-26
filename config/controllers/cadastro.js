// controller/cadastro.js
const con = require('../connection.js')();

module.exports = function(app) {

  app.get("/cadastrar", function (req, res) {
    res.render("pages/cadastro");
  })

  app.post("/cad", function (req, res) {
    var query = `INSERT INTO usuarios (nome, usuario, email, senha) 
      VALUES ('`+req.body.nome +`', '`+req.body.email +`', '`+req.body.usuario +`', '`+  req.body.senha +`')`;

    con.query(query, function (erro, resultado) {
      if (erro) throw erro;
      res.render("pages/login", { msg: 'Usuário cadastrado com sucesso!', flag: '1'});
    }); 
  });
}
