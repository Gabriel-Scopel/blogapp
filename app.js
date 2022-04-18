// Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin") //referenciando nossa routes e atribuindo a constante
const path = require("path") //usando o path, que nos auxilia a manipular pastas no node
//const mongoose = require("mongoose")
const mongoose = require("mongoose");

//public
app.use(express.static(path.join(__dirname,"public")))//anunciando que os arquivos estáticos estão na pasta public

// Configurações
    //body parser
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
    //handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp").then(()=> {
        console.log("Conectado ao mongo.")
    }).catch((err)=>{
        console.log("Erro ao se conectar: "+err)
    })
// Rotas
    app.use("/admin", admin) //referenciando as rotas da pasta routes que foram armazenadas na constante
// Outros
const PORT=8081
app.listen(PORT, () =>{
    console.log("Servidor rodando! ")
})