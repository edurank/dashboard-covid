const express = require('express');
const connection = require('./config/connection');
const con = require('./config/connection')();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
const https = require('https');
const http = require('http');
const fs = require("fs");

// controllers
const controllers = require('./config/controllers/index');

// -----------------
moment.locale('pt-br');
// -----------------

const options = {
  key: fs.readFileSync('config/cert/key.pem'),
  cert: fs.readFileSync('config/cert/cert.pem')
};
var data = {};

// configurações da sessão
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session({ secret: "teste" }));
// config
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set(morgan('dev'));

// middleware
app.use(express.urlencoded({
  extended: false
}));

require('./config/auth')(passport);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}

//          PáGINA ROOT (INDEX)
app.get('/', (req, res, next) => {
    res.render("pages/login");
});

app.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/dashboard', 
    successFlash: 'Seja bem vindo.',
    failureRedirect: '/login?fail=true',
    failureFlash: 'Usuário ou senha inválidos.'
  })
);

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//             FUNCIONÁRIOS

app.get("/funcionarios", function (req, res) {
  var query = `
  SELECT * FROM funcionarios 
  INNER JOIN departamentos
  ON funcionarios.departamento_id = departamentos.departamento_id
  `;

  con.query(query, function (erro, resultado) {
    if (erro) throw erro;
    res.render('pages/funcionarios', {print: resultado, usuario: 'fulano'});
  });
});

app.post("/funcionarios", function (req, res) {
    
});
// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-

app.get("/detalhes", function (req, res) {
  var query = `
  SELECT * FROM avisos 
  INNER JOIN funcionarios 
  ON avisos.funcionario_id = funcionarios.funcionario_id 
  INNER JOIN departamentos 
  ON funcionarios.departamento_id = departamentos.departamento_id 
  WHERE funcionarios.funcionario_id = '` + req.query.id +`'`;

  var queryVis = `
  UPDATE avisos
  SET visualizado = '1'
  WHERE funcionario_id = ` + req.query.id + `;
  `;
  
  con.query(query, function (e, resultado) {
    if (e) { throw e; }
    con.query(queryVis, function (e, q) {
      res.render("pages/detalhes", {
        aviso: resultado,
        moment: moment
      });
    });    
  });
});
// asdadkasodkaofksdkfsfksof
app.get("/addAviso", function (req, res) {
  var query = `
  INSERT INTO avisos (funcionario_id, aviso_img_path, visualizado) 
  VALUES ('2', '0002,0001', '0');`;
  var query2 = `SELECT * FROM departamentos`;

  con.query(query, function(e, resu){
    if (e) throw e;
    con.query(query2, function(error, result) {
      if (error) throw error;
      res.render("pages/monitoramento", {      
        con: con,
        departamento: result
      });
    });
  });
});

app.get("/avisosDepartamento", function (req, res){
  var query = `
    SELECT *
    FROM avisos
    INNER JOIN funcionarios
    ON avisos.funcionario_id = funcionarios.funcionario_id
    INNER JOIN departamentos
    ON funcionarios.departamento_id = departamentos.departamento_id
    WHERE departamentos.departamento_id = '` + req.query.id + `'`;

  con.query(query, function (erro, result){
    if(erro) throw erro;
    res.render("pages/avisosDepartamento", {
      avisos: result,
      moment: moment
    });
  });
});

app.post("/detalhes", function (req, res) {
  res.render("pages/detalhes");
})


app.get("/avisos", function (req, res) {
  var query = `SELECT * FROM avisos 
    INNER JOIN funcionarios 
    ON avisos.funcionario_id = funcionarios.funcionario_id 
    INNER JOIN departamentos 
    ON funcionarios.departamento_id = departamentos.departamento_id 
    ORDER BY avisos.visualizado`;

  con.query(query, function (e, resultado) {
    if (e) { throw e; }
    res.render('pages/avisos', {
      print: resultado,
      moment: moment,
      usuario: 'fulano'
    });
  });
})

app.get("/cadastrar", function (req, res) {
  res.render("pages/cadastro");
})

app.post("/cad", function (req, res) {
  var query = `INSERT INTO usuarios (nome, usuario, email, senha) 
  VALUES ('`+req.body.nome +`', '`+req.body.email +`', '`+req.body.usuario +`', '`+   req.body.senha +`')`;

  con.query(query, function (erro, resultado) {
    if (erro) throw erro;
      res.render("pages/login", { msg: 'Usuário cadastrado com sucesso!', flag: '1'});
  }); 
});

controllers(app);

http.createServer(app).listen(8080);
https.createServer(options, app).listen(1111);

console.log("EPI Vision 1.8 iniciado.");
