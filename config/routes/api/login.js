//                LOGIN
app.get("/login", function (req, res) {
    res.render("pages/login", { });
});

app.post("/log", function (req, res) {
    var query = `SELECT * from usuarios WHERE usuario = '` + req.body.username + `'AND senha = '` + req.body.password + `';`;
    con.query(query, function(error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {            
            res.render("pages/dashboard", { usuario: req.body.username ,  teste: "200" });
        } else {
            res.render("pages/login", { msg: "UsuÃ¡rio e/ou senha estÃ£o incorretos!" });
        }
        console.log(results);
    });
});
   
