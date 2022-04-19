const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome:{
        type:String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now() //caso o usuário não preencha o campo de data ele pega automaticamente
    }
})

mongoose.model("categorias", Categoria)