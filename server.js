const express = require('express');
const app = express();
var db = require('./config/db')();

app.use(express.static("./public"));

app.set("view engine", "ejs");

db.sendAlert()



app.get("/", function (req, res) {
    res.render("pages/index");
})

app.get("/dashboard", function (req, res){
    res.render("pages/dashboard");
})

app.get("/funcionarios", function (req, res) {
    res.render("pages/funcionarios")
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