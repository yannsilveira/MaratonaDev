//configurando o servidor
const express = require("express")
const server = express()

//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//habilitar body do formulário
server.use(express.urlencoded({extended: true}))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

//lista de doadores (Array)
const donors = []

//configurando a apresentação da página
server.get("/", function (req, res) {
    const query2 = 'select * from doadores'
    db.query(query2, function(err, result) {
        if(err) return res.send("Erro no banco de dados!")
        const donors = result.rows
        return res.render("index.html", {donors})
    })    
})

server.post("/", function(req, res) {
    //pegar dados do frmulário
    const name = req.body.nome
    const email = req.body.email
    const blood = req.body.tiposanguineo

if(name == "" || email == "" || blood == ""){
    return res.send("Necessário Preencher Todos os Campos!")
} 
    //coloca valores dentro do banco de dados
    const query = 'insert into doadores("nome", "email", "tsanguineo") values($1, $2, $3)'
    const values = [name, email, blood]
    
    db.query(query, values, function(err) {
        //fluxo de erro
        if(err) return res.send("Erro no banco de dados!")
        //fluxo de acerto
        return res.redirect("/")
    })

})

//liga o servidor e permite acesso na porta 3000
server.listen(3000, function() {
    console.log("Iniciei!")
})


//configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})