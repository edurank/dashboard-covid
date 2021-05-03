const express = require('express');
const con = require('./config/connection')();
const app = express();
//var db = require('./config/db');

var data = {};

app.use(express.static("./public"));

app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get("/login", function (req, res) {
    res.render("pages/login");
})

app.post("/", function (req, res)) {
    
});

app.get("/dashboard", function (req, res){
    res.render("pages/dashboard");
})

app.get("/funcionarios", function (req, res) {
    con.query('SELECT * FROM funcionarios', function (e, resultado) {
        if (e) { throw e; }
        else{
            data = {print: resultado};
            res.render('pages/funcionarios', data);
        }
    });
})
    
app.post("/funcionarios", function (req, res) {

});

app.get("/detalhes", function (req, res) {
    res.render("pages/detalhes")
})

app.get("/monitoramento", function (req, res){
    res.render("pages/monitoramento")
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