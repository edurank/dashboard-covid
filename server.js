const express = require('express');
const connection = require('./config/connection');
const con = require('./config/connection')();
const app = express();
const passport = require('passport');
const session = require('express-session');

var data = {};

// config
app.use(express.static("./public"));
app.set("view engine", "ejs");
// middleware
app.use(express.urlencoded({
    extended: false
}));

require('./auth')(passport);

// configurações da sessão
app.use(session({  
    secret: '123',//
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
app.use(passport.initialize());
app.use(passport.session());

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//          PÁGINA ROOT (INDEX)

app.get('/', (req, res, next) => {
   res.render("pages/login");
});


app.post('/',
    passport.authenticate('local', { 
        successRedirect: '/dashboard', 
        failureRedirect: '/login?fail=true' 
    })
);

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
  }

app.get('/teste', function(req, res) {
    res.render('pages/testes', {});
});

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//                LOGIN

app.get("/login", function (req, res) {
    res.render("pages/login", { });
});

app.post("/log", function (req, res) {
    console.log(req.body.username);
    var query = `SELECT * from usuarios WHERE usuario = '` + req.body.username + `'AND senha = '` + req.body.password + `';`;
    con.query(query, function(error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {            
            res.render("pages/dashboard", { usuario: req.body.username });
        } else {
            res.render("pages/login", { msg: "Usuário e/ou senha estão incorretos!" });
        }
        console.log(results);
    });
});

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//              DASHBOARD

app.get("/dashboard", function (req, res){
    res.render("pages/dashboard", { teste: "2" });
})

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//             FUNCIONÁRIOS

app.get("/funcionarios", function (req, res) {
    con.query('SELECT * FROM funcionarios', function (erro, resultado) {
        if (erro) {
            throw erro;
        } else {
            console.log(resultado);
            data = { print: resultado };
            res.render('pages/funcionarios', {print: resultado, usuario: 'fulano'});
        }
    });
});

app.post("/funcionarios", function (req, res) {
    
});
// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-

app.get("/detalhes", function (req, res) {
    con.query(`SELECT * FROM avisos INNER JOIN funcionarios ON avisos.id_funcionario = funcionarios.id WHERE id_funcionario = '` + req.query.id +`'`, function (e, resultado) {
        if (e) { throw e; }
        else{
            console.log(resultado);
            res.render("pages/detalhes", { aviso: resultado });
        }
    });
})

app.post("/detalhes", function (req, res) {
    res.render("pages/detalhes");
})

app.get("/monitoramento", function (req, res){
    res.render("pages/monitoramento");
})

app.get("/avisos", function (req, res) {
    con.query('SELECT * FROM avisos INNER JOIN funcionarios ON avisos.id_funcionario = funcionarios.id', function (e, resultado) {
        if (e) { throw e; }
        else{
            console.log(resultado);
            res.render('pages/avisos', {print: resultado, usuario: 'fulano'});
        }
    });
})

app.get("/cadastrar", function (req, res) {
    res.render("pages/cadastro");
})

app.get("/conf", function (req, res) {
    res.render("pages/confUser");
});

app.post("/cad", function (req, res) {
    console.log("tste");
    var query = `INSERT INTO usuarios (nome, usuario, email, senha) VALUES ('`+req.body.nome +`', '`+req.body.email +`', '`+req.body.usuario +`', '`+   req.body.senha +`')`;
    con.query(query, function (erro, resultado) {
        if (erro) {
            throw erro;
        } else {
            console.log(resultado)
            res.render('pages/login', { msg: 'Usuário cadastrado com sucesso!', flag: '1'});
        }
    }); 
})

app.listen(8080);
console.log("rodando");