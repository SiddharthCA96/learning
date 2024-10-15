//import the db model
const{User}=require("../db");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username=req.headers.username;
    const password=req.headers.password;
    //find user in db
    User.findOne({
        username:username,
        password:password
    })
    .then(function(value){
        //if present call the next
        if(value){
            next();
        }
        else{
            res.status(403).json({
                msg:"User dont exist"
            })
        }
    })
}

module.exports = userMiddleware;