const { Sequelize } = require("sequelize");
const Post = require("../models/post");
const connection = require("../database/connection");

const SQL_QUERY_ALL_POSTS = `
SELECT posts.*, created_by.username AS createdBy, updated_by.username AS updatedBy
FROM posts 
JOIN users created_by ON posts.created_by=created_by.uuid
LEFT JOIN users updated_by ON posts.updated_by=updated_by.uuid`

function validateUserInput(params,res){
    const {title, description, type} = params;
    if(!title)
        return res.send({error:"Empty title"});
    if(!description)
        return res.send({error:"Empty description"});
    if(!['edital','notícia','divulgação'].includes(type))
        return res.send({error:"Invalid post type"});
}

module.exports.allPosts = async(req,res)=>{
    const [posts] = await connection.query(SQL_QUERY_ALL_POSTS);
    if(posts.length == 0)
        return res.status(200).send({result:"No posts found."})
    res.status(200).send(posts);
}

module.exports.postsPaginated = async(req,res)=>{
    const {pageNumber} = req.params;
    
    const [posts] = await connection.query(SQL_QUERY_ALL_POSTS.concat(" LIMIT :limit OFFSET :offset"),{
        replacements:{
            limit:process.env.POSTS_PER_PAGE,
            offset:process.env.POSTS_PER_PAGE*(parseInt(pageNumber)-1)
        }
    })
    if(posts.length == 0)
        return res.send({message:"No more posts founded."});
    res.status(200).send(posts);
}

module.exports.getPostById = async(req,res)=>{
    const {id} = req.query;
    try {
        const [post] = await connection.query(SQL_QUERY_ALL_POSTS.concat(" WHERE posts.uuid=:id"),{
            replacements:{id}
        })
        if(!post)
            return res.status(404).send({error:"Post not found."});
        res.status(200).send({post});
    } catch (error) {
        throw error;
    }

}

module.exports.create = async(req,res) =>{
    const {userID,title, description, type, image_url} = req.body;
    validateUserInput({title,description,type},res);
    try {
        const post = await Post.create({
            title,
            description,
            post_type:type,
            image_url,
            created_by: userID
        })
        return res.status(200).send({post});
    } catch (error) {
        throw error;
    }

} 

module.exports.edit = async(req,res)=>{
    const {userID,id,title, description, type, image_url} = req.body;
    if(!id)
        return res.send({error:"Id not provided."});
    validateUserInput({title,description,type},res);
    try {
        const [status] = await Post.update({
            title, 
            description, 
            type, 
            image_url,
            updated_by:userID
        },{where:{uuid:id}});
        if(!status ){
            res.status(404).send({message:"Post not found"});
        }
        res.status(200).send({message:`Post ${id} modified.`});
    } catch (error) {
        throw error;
    }
}

module.exports.delete = async(req,res)=>{
    const {id} = req.body;
    try {
        const deletedPost = await Post.destroy({where:{
            uuid:id
        }})
        if(!deletedPost)
            return res.status(404).send({error:"Post not found."});
        res.status(200).send({message:`Post ${id} deleted.`});
    } catch (error) {
        throw error;
    }
}