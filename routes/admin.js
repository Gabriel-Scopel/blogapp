const express = require("express")
const router = express.Router() // componente que nos possibilita usar rotas em arquivos separados
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
router.get("/",(req, res)=>{   //criando uma rota do tipo get
    res.render("admin/index")
})

router.get("/posts",(req, res)=>{
    res.send("Página de posts")
})

router.get("/categorias",(req, res)=>{
    res.render("admin/categorias")
})

router.post("/categorias/nova", (req,res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(()=>{
    console.log("Categoria salva com sucesso.")
}).catch((err)=>{
    console.log("Erro ao salvar a categoria")
    })
})

router.get("/categorias/add",(req, res)=>{
    res.render("admin/addcategorias")
})

module.exports = router