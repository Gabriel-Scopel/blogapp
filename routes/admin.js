const { response } = require("express");
const express = require("express");
const router = express.Router(); // componente que nos possibilita usar rotas em arquivos separados
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
router.get("/", (req, res) => {
  //criando uma rota do tipo get
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Página de posts");
});

router.get("/categorias", (req, res) => {
  Categoria.find()
    .sort({ date: "desc" })
    .then((categorias) => {
      res.render("admin/categorias", {
        categorias: categorias.map((categorias) => categorias.toJSON()),
      });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as categorias");
      res.redirect("/admin");
    });
});

router.post("/categorias/nova", (req, res) => {
  //Validando os dados que vem do formulário
  var erros = [];
  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    //verificando se o campo nome do formulário não está vazio
    erros.push({ texto: "Nome inválido" }); //inserindo o objeto na array errros
  }
  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null
  ) {
    erros.push({ texto: "Slug inválido" });
  }

  if (req.body.nome.length < 2) {
    erros.push({ texto: "O nome da categoria é muito pequeno" });
  }

  if (erros.length > 0) {
    res.render("admin/addcategorias", { erros: erros }); //redirecionando para a view addcategorias.handlebars e passando o array de erros para essa view
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug,
    };
    new Categoria(novaCategoria)
      .save()
      .then(() => {
        req.flash("success_msg", "Categoria criada com sucesso."); // exibindo a msg de sucesso caso a categoria seja válida
        res.redirect("/admin/categorias"); //redirecionando caso o cadastro seja um sucesso
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a categoria");
        res.redirect("/admin");
      });
  }
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

module.exports = router;
