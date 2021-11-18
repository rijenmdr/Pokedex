const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authentication');
    console.log(authHeader)
    if(!authHeader){
        return res.status(401).json({
            status:'fail',
            message:"UnAuthenticated"
        })
    }
    
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decodedToken)
    if(!decodedToken){
        return res.status(401).json({
            status:'fail',
            message:"UnAuthenticated"
        })
    }

    next();
}