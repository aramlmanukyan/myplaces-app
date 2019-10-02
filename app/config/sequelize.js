import Sequelize from 'sequelize';
import fs from "fs";
import configs from './index';
const config = configs[process.env.NODE_ENV];

const sequelize = new Sequelize(config.mariaDB.url, { logging: false, define: {
    timestamps: false // true by default
} });

let db = {};

fs
    .readdirSync(__dirname + '/../models/mariadb')
    .forEach((file)=> {
        let model = sequelize["import"](__dirname + '/../models/mariadb/' + file);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
// console.log(db);


sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the MySQL database:', err);
    });



sequelize.sync()
 .then(()=>{
    console.log("sequelize has synced");
});

export default db;