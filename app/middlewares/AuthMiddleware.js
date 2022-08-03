
const jwt = require("jsonwebtoken");
const Config = require("../config.json")

async function checkAuthUser(req, res, next){
    const bearerHeader = req.header("authorization");

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        
        try {
            let tokenData = await jwt.verify(bearerToken, Config.auth_key); 
            if(tokenData && typeof tokenData.user !== 'undefined'){
                req.auth = tokenData.user;
                next(); 
            }
        } catch (error) {
            return res.json({
                success:false,
                error:error
            })
        }

    } else {
        return res.sendStatus(403);
    }
}

module.exports = {
    checkAuthUser
}