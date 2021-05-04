const express = require('express');
const connection = require('./config/connection');
const con = require('./config/connection')();
const app = express();

var data = {};

// config
app.use(express.static("./public"));
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({
  extended: false
}));

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/teste', function(a, b) {
    b.render('pages/teste');
});

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//                LOGIN

app.get("/login", function (req, res) {
    res.render("pages/login");
});

app.post("/login", function (req, res) {
    console.log(req.body.username);
    var query = `SELECT * from usuarios WHERE usuario = '` + req.body.username + `'AND senha = '` + req.body.password + `';`;
    con.query(query, function(error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
            res.render("pages/dashboard", { usuario: req.body.username });
        } else {

        }
        console.log(results);
    });
});

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//              DASHBOARD

app.get("/dashboard", function (req, res){
    res.render("pages/dashboard");
})

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//             FUNCIONÁRIOS

app.get("/funcionarios", function (req, res) {
    con.query('SELECT * FROM funcionarios', function (erro, resultado) {
        if (erro) {
            throw erro;
        } else {
            data = { print: resultado };
            res.render('pages/funcionarios', data);
        }
    });
});

app.post("/funcionarios", function (req, res) {
    
});
// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-

app.get("/detalhes", function (req, res) {
    res.render("pages/detalhes");
})

app.get("/monitoramento", function (req, res){
    res.render("pages/monitoramento");
})

app.get("/avisos", function (req, res) {
    con.query('SELECT * FROM avisos', function (e, resultado) {
        if (e) { throw e; }
        else{
            data = {print: resultado};
            res.render('pages/avisos', data);
        }
    });
})

app.get("/cadastrar", function (req, res) {
    res.render("pages/cadastro");
})

app.listen(8080);
console.log("rodando");