const express = require('express');
const con = require('./config/connection')();
const app = express();
//var db = require('./config/db');

app.use(express.static("./public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("pages/index");
})

app.get("/dashboard", function (req, res){
    res.render("pages/dashboard");
})

var data = {};
app.get("/funcionarios", function (req, res) {

    con.query('SELECT * FROM funcionarios', function (e, resultado) {
        if (e) { throw e; }
        else{
            console.log(resultado);
            data = {print: resultado};
            res.render('pages/funcionarios', data);
        }
    });

    //res.render("pages/funcionarios", JSON.stringify({data: db.selectFuncionarios}));
    //res.render("pages/funcionarios", {"data": JSON.stringify(db.selectFuncionarios)});
})

app.get("/detalhes", function (req, res) {
    res.render("pages/detalhes")
})

app.get("/monitoramento", function (req, res){
    res.render("pages/monitoramento")
})

app.get("/avisos", function (req, res) {
    res.render("pages/avisos");
})

app.get("/cadastrar", function (req, res) {
    res.render("pages/cadastro");
})

app.listen(8080);
console.log("rodando");