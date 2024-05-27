const Sequelize = require("sequelize");
const connection = require("../database/connection");

const User = connection.define('users',{
    uuid:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    username:{
        type:Sequelize.STRING(36),
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(256),
        allowNull:false
    }
},{timestamps:true});

module.exports = User;