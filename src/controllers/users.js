const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function generateToken(params){
    return jwt.sign(params,process.env.SECRET_JWT_HASH,{
        expiresIn:86400 // 1 day
    })
}

function validateUserInput(params,res){
    const {username,password} = params;

    if(!username)
        return res.send({error:"Username invalid"});
    if(!password)
        return res.send({error:"Password invalid."})
}

module.exports.register = async(req,res)=>{
    const {username,password} = req.body;

    validateUserInput({username,password},res);
    const hash = await bcrypt.hash(password,10);
    
    try {
        const [user,created] = await User.findOrCreate({
            where:{username},
            defaults:{username,password:hash}
        });
        if(!created)
            return res.send({error:`User ${username} already exists. Please choose another username.`})
        user.password = undefined;
        res.cookie("token",generateToken({id:user.uuid}),{
            httpOnly: true,
            secure:true,
            maxAge:86400000 // 1 day
        })
        res.status(200).send({message:`User ${username} created.`});
    } catch (error) {
        throw error;
    }

}

module.exports.login = async(req,res) =>{
    const {username,password} = req.body;
    validateUserInput({username,password},res);

    try {
        const user = await User.findOne({where:{username}});
        if(!user)
            return res.send({error:"User not found."});
        if(!await bcrypt.compare(password,user.password))
            return res.send({error:"Password Incorrect"});
        user.password = undefined;

        res.cookie("token",generateToken({id:user.uuid}),{
            httpOnly: true,
            secure:true,
            maxAge:86400000 // 1 day
        })
        res.status(200).send({user})

    } catch (error) {
        throw error;
    }
    
}

module.exports.logout = async(req,res)=>{
    res.clearCookie("token");
    res.end();
}