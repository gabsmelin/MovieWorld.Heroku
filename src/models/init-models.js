import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _infob_mw_ator from  "./infob_mw_ator.js";
import _infob_mw_comentario from  "./infob_mw_comentario.js";
import _infob_mw_filme from  "./infob_mw_filme.js";
import _infob_mw_filme_usuario from  "./infob_mw_filme_usuario.js";
import _infob_mw_lista from  "./infob_mw_lista.js";
import _infob_mw_lista_item from  "./infob_mw_lista_item.js";
import _infob_mw_usuario from  "./infob_mw_usuario.js";


export default function initModels(sequelize) {
 
  var infob_mw_ator = _infob_mw_ator.init(sequelize, DataTypes);
  var infob_mw_comentario = _infob_mw_comentario.init(sequelize, DataTypes);
  var infob_mw_filme = _infob_mw_filme.init(sequelize, DataTypes);
  var infob_mw_filme_usuario = _infob_mw_filme_usuario.init(sequelize, DataTypes);
  var infob_mw_lista = _infob_mw_lista.init(sequelize, DataTypes);
  var infob_mw_lista_item = _infob_mw_lista_item.init(sequelize, DataTypes);
  var infob_mw_usuario = _infob_mw_usuario.init(sequelize, DataTypes);


  return {
    infob_mw_ator,
    infob_mw_comentario,
    infob_mw_filme,
    infob_mw_filme_usuario,
    infob_mw_lista,
    infob_mw_lista_item,
    infob_mw_usuario,
  };
}
