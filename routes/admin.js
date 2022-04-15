const express = require("express")
const router = express.Router() // componente que nos possibilita usar rotas em arquivos separados


router.get("/",(req, res)=>{   //criando uma rota do tipo get
    res.render("admin/index")
})

router.get("/posts",(req, res)=>{
    res.send("Página de posts")
})

router.get("/categorias",(req, res)=>{
    res.send("Página de categorias")
})


module.exports = router