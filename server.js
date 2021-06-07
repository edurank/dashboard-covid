const express = require('express');
const connection = require('./config/connection');
const con = require('./config/connection')();
const app = express();
const passport = require('passport');
const session = require('express-session');
var moment = require('moment');

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
    var query = `SELECT * from usuarios WHERE usuario = '` + req.body.username + `'AND senha = '` + req.body.password + `';`;
    con.query(query, function(error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {            
            res.render("pages/dashboard", { usuario: req.body.username ,  teste: "200" });
        } else {
            res.render("pages/login", { msg: "Usuário e/ou senha estão incorretos!" });
        }
        console.log(results);
    });
});



// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//              DASHBOARD

app.get("/dashboard", function (req, res){
    
    var queryCasosPorDepartamento = `
    SELECT departamentos.departamento_nome, COUNT(*) as count, departamentos.departamento_id as depid
     FROM avisos 
      INNER JOIN funcionarios 
       ON funcionarios.funcionario_id = avisos.funcionario_id 
        INNER JOIN departamentos ON funcionarios.departamento_id = departamentos.departamento_id
         GROUP BY departamentos.departamento_nome
          ORDER BY count DESC`;

    con.query(queryCasosPorDepartamento, function(e, resultado) {
        if(e) throw e;

        var i;
        var departamentos = [];
        var dados = [];
        var dep_id = [];
        for(i = 0 ; i < resultado.length; i++){
            departamentos.push(resultado[i].departamento_nome.toString());
            dados.push(resultado[i].count.toString());
            dep_id.push(resultado[i].depid.toString());
        }
        con.query(`SELECT COUNT(*) as cnt FROM avisos`, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.render("pages/dashboard", {
                departamentos: departamentos,
                casosPorDepartamento: dados,
                departamento_id: dep_id,
                total_avisos: result
            });
        });
    });
})

// -=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-
//             FUNCIONÁRIOS

app.get("/funcionarios", function (req, res) {
    con.query(`
    SELECT * FROM funcionarios 
     INNER JOIN departamentos
      ON funcionarios.departamento_id = departamentos.departamento_id
    `, function (erro, resultado) {
        if (erro) {
            throw erro;
        } else {
            res.render('pages/funcionarios', {print: resultado, usuario: 'fulano'});
        }
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
    
    con.query(query, function (e, resultado) {
        if (e) { throw e; }
        else{
            console.log(resultado);
            res.render("pages/detalhes", {
                aviso: resultado,
                moment: moment
            });
        }
    });
})

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

        console.log(result);
        res.render("pages/avisosDepartamento", {
            avisos: result,
            moment: moment
        });
    });
    
});

app.post("/detalhes", function (req, res) {
    res.render("pages/detalhes");
})

app.get("/monitoramento", function (req, res){
    res.render("pages/monitoramento");
})

app.get("/avisos", function (req, res) {
    var query = `SELECT * FROM avisos 
    INNER JOIN funcionarios 
     ON avisos.funcionario_id = funcionarios.funcionario_id 
    INNER JOIN departamentos 
     ON funcionarios.departamento_id = departamentos.departamento_id`;

    con.query(query, function (e, resultado) {
        if (e) { throw e; }
        else{
            console.log(resultado);
            res.render('pages/avisos', {
                print: resultado,
                moment: moment,
                usuario: 'fulano'
            });
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
    var query = `INSERT INTO usuarios (nome, usuario, email, senha) VALUES ('`+req.body.nome +`', '`+req.body.email +`', '`+req.body.usuario +`', '`+   req.body.senha +`')`;
    con.query(query, function (erro, resultado) {
        if (erro) {
            throw erro;
        } else {
            res.render('pages/login', { msg: 'Usuário cadastrado com sucesso!', flag: '1'});
        }
    }); 
});

app.get("/konf", function(req, res) {
    var getFuncionarios = `
    SELECT funcionario_nome, funcionarios.funcionario_id, funcionarios.departamento_id, departamentos.departamento_nome
    FROM funcionarios
    INNER JOIN departamentos
    ON funcionarios.departamento_id = departamentos.departamento_id
    `;

    con.query(getFuncionarios, function (error, listaFuncionarios) {
        if (error) throw error;
        res.render("pages/konf", {
            funcionarios: listaFuncionarios
        });
    });
});


app.listen(8080);
console.log("rodando");