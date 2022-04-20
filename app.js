// Carregando módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin"); //referenciando nossa routes e atribuindo a constante
const path = require("path"); //usando o path, que nos auxilia a manipular pastas no node
//const mongoose = require("mongoose")
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

//public
app.use(express.static(path.join(__dirname, "public"))); //anunciando que os arquivos estáticos estão na pasta public
app.use((req, res, next) => {
  console.log("OI EU SOU UM MIDDLEWARE!");
  next();
});
// Configurações
//Sessão
app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); //criando globalmente
  res.locals.error_msg = req.flash("error_msg");
  next();
});
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//handlebars
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("Conectado ao mongo.");
  })
  .catch((err) => {
    console.log("Erro ao se conectar: " + err);
  });
// Rotas
app.use("/admin", admin); //referenciando as rotas da pasta routes que foram armazenadas na constante
// Outros

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando! ");
});
