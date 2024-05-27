const jwt = require("jsonwebtoken");

module.exports = async(req,res,next) => {
    const {token} = req.cookies;

    const user = jwt.verify(token,process.env.SECRET_JWT_HASH);

    if(!user)
        return res.status(403).send({error:"Operation Not permited."});
    
    req.body.userID = user.id;

    next();
}