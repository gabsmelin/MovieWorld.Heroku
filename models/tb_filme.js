import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_filme extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_filme: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_filme: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dt_lancamento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nm_diretor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_sinopse: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ds_avaliacao: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    ds_descricao: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ds_plataforma: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img_capa_maior: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img_capa_menor: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_filme',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_filme" },
        ]
      },
    ]
  });
  return tb_filme;
  }
}
