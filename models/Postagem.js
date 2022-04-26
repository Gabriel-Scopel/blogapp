const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Postagem = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  conteudo: {
    type: String,
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId, // armazena o id do objeto referenciado
    ref: "categorias", //referenciando o model que chamamos "categorias" no arquivo Categorias.js
    required: true,
  },
  data: {
    type: Date,
    default: Date.now(),
  },
});
