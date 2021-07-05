const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const {User} = require("../db/models")

const jwt = require("jsonwebtoken")


exports.signup = async (req, res, next) => {

    try {
            const saltRoundes = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRoundes)
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body);
        const token = generateToken(newUser) 

        // res.status(201).json({message: "New user created! "})
        res.status(201).json({token}) //>>> with one requist
        // to signin direct after signing up to reduce the number fo requists & to improve the performence

        // token is exist we are signed in if not so we are not
        
    } catch (error) {
        next(error)
    }
}

exports.signin = (req, res, next) => {

    const token = generateToken(req.user)
     res.json({token}) 

}


const generateToken=(user)=>{
    const payload={

        id:user.id,
        username:user.username,
        exp: Date.now() + JWT_EXPIRATION_MS,
        // don't put any password at all
    }
    const token = jwt.sign(payload, "asupersecretkey"); // insted of JWT_SECRET
    return token; 
}

