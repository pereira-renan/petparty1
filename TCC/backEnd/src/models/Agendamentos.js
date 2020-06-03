const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AgendamentoSchema = mongoose.Schema(
  {
    data: {
      allowNull: false,
      type: Date
    },
    id_usuario: {
      type: ObjectId
    },
    id_prestador: {
      type: ObjectId
    },
    id_pet: {
      type: ObjectId
    },
    ds_agendamento:{
      type: String,
    },
    status_agendamento:{
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    toObject: {
      getters: true,
      setter: true,
      virtuals: true
    },
    toJSON: {
      getters: true,
      setter: true,
      virtuals: true
    }
  }
);

AgendamentoSchema.virtual("url").get(function() {
  console.log("teste");
});

// transformando a senha do usuario em hash antes de enviar para o banco

const AgendamentoModel = mongoose.model("tb_agendamento", AgendamentoSchema);
export default AgendamentoModel;
