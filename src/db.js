import initdb from './models/init-models.js'
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'tcc_mw',
    'root',
    '091104fla', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
});

const db = initdb(sequelize);
export default db;