const express = require("express");

const routes = express.Router();
const connection = require("./database/connection");
const authorization = require("./middlewares/authorization");


const users = require("./controllers/users");
const posts = require("./controllers/posts");

routes.get("/posts",posts.allPosts);
routes.get("/posts/:pageNumber",posts.postsPaginated);
routes.get("/post",posts.getPostById);
routes.post("/publishPost",authorization,posts.create);
routes.put("/editPost",authorization,posts.edit);
routes.delete("/deletePost",authorization,posts.delete);

routes.post("/register",users.register);
routes.post("/login",users.login);
routes.delete("/logout",users.logout);

module.exports = routes;

