const jwt = require("jsonwebtoken");

module.exports = async(req,res,next) => {
    const {token} = req.cookies;

    if(!token)
        return res.send({error:"Token not provided"});

    const user = jwt.verify(token,process.env.SECRET_JWT_HASH);

    if(!user)
        return res.status(403).send({error:"Operation Not permited."});
    
    req.body.userID = user.id;

    next();
}