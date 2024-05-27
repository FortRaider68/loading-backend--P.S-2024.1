const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Post = connection.define('posts',{
    uuid: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull: false,
        primaryKey:true
    },
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    description:{
        type: Sequelize.STRING,
        allowNull:false
    },
    post_type:{
        type: Sequelize.ENUM,
        values: ['edital','notícia','divulgação'],
        allowNull: false
    },
    image_url:{
        type: Sequelize.STRING,
        validate:{
            isUrl: true
        },
        allowNull:true
    },
    created_by:{
        type: Sequelize.UUID,
        allowNull:false
    },
    update_by:{
        type: Sequelize.UUID
    }
   
}, {timestamps:true})

module.exports = Post;