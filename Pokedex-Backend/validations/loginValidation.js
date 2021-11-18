const {check,validationResult} = require('express-validator')

exports.loginValidation = [
    check('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address!'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be atleast 6 characters'),
    (req,res,next) =>{  
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({
                status:"fail",
                error:error.array()
            });
        }
        next()
    }
]