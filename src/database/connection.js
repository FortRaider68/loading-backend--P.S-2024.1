const {Sequelize} = require("sequelize");

const connection = new Sequelize(process.env.CONNECTION_STRING,{
    dialect:"postgres",
    protocol:"postgres",
    dialectOptions:{
        ssl: false
    }
});

module.exports = connection;