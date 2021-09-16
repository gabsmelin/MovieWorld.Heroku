import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tb_ator from  "./tb_ator.js";
import _tb_comentario from  "./tb_comentario.js";
import _tb_filme from  "./tb_filme.js";
import _tb_filme_usu from  "./tb_filme_usu.js";
import _tb_lista from  "./tb_lista.js";
import _tb_lista_item from  "./tb_lista_item.js";
import _tb_usuario from  "./tb_usuario.js";

export default function initModels(sequelize) {
  var tb_ator = _tb_ator.init(sequelize, DataTypes);
  var tb_comentario = _tb_comentario.init(sequelize, DataTypes);
  var tb_filme = _tb_filme.init(sequelize, DataTypes);
  var tb_filme_usu = _tb_filme_usu.init(sequelize, DataTypes);
  var tb_lista = _tb_lista.init(sequelize, DataTypes);
  var tb_lista_item = _tb_lista_item.init(sequelize, DataTypes);
  var tb_usuario = _tb_usuario.init(sequelize, DataTypes);

  tb_ator.belongsTo(tb_filme, { as: "id_filme_tb_filme", foreignKey: "id_filme"});
  tb_filme.hasMany(tb_ator, { as: "tb_ators", foreignKey: "id_filme"});
  tb_comentario.belongsTo(tb_filme, { as: "id_filme_tb_filme", foreignKey: "id_filme"});
  tb_filme.hasMany(tb_comentario, { as: "tb_comentarios", foreignKey: "id_filme"});
  tb_filme_usu.belongsTo(tb_filme, { as: "id_filme_tb_filme", foreignKey: "id_filme"});
  tb_filme.hasMany(tb_filme_usu, { as: "tb_filme_usus", foreignKey: "id_filme"});
  tb_lista_item.belongsTo(tb_filme, { as: "id_filme_tb_filme", foreignKey: "id_filme"});
  tb_filme.hasMany(tb_lista_item, { as: "tb_lista_items", foreignKey: "id_filme"});
  tb_lista_item.belongsTo(tb_lista, { as: "id_lista_tb_listum", foreignKey: "id_lista"});
  tb_lista.hasMany(tb_lista_item, { as: "tb_lista_items", foreignKey: "id_lista"});
  tb_comentario.belongsTo(tb_usuario, { as: "id_usuario_tb_usuario", foreignKey: "id_usuario"});
  tb_usuario.hasMany(tb_comentario, { as: "tb_comentarios", foreignKey: "id_usuario"});
  tb_filme_usu.belongsTo(tb_usuario, { as: "id_usuario_tb_usuario", foreignKey: "id_usuario"});
  tb_usuario.hasMany(tb_filme_usu, { as: "tb_filme_usus", foreignKey: "id_usuario"});
  tb_lista.belongsTo(tb_usuario, { as: "id_usuario_tb_usuario", foreignKey: "id_usuario"});
  tb_usuario.hasMany(tb_lista, { as: "tb_lista", foreignKey: "id_usuario"});

  return {
    tb_ator,
    tb_comentario,
    tb_filme,
    tb_filme_usu,
    tb_lista,
    tb_lista_item,
    tb_usuario,
  };
}
