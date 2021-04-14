const express = require('express');
const app = express();

app.use(express.static("./public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("pages/index");
})

app.get("/dashboard", function (req, res){
    res.render("pages/dashboard");
})

app.get("/avisos", function (req, res) {
    res.render("pages/avisos");
})

app.get("/cadastrar", function (req, res) {
    res.render("pages/cadastro");
})

app.listen(8080);
console.log("rodando");