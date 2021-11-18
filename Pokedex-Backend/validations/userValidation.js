const {check,validationResult} = require('express-validator')

exports.userValidation = [
    check('firstName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Firstname can not be empty!'),
    check('lastName')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Firstname can not be empty!'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address!'),
    check('password')
        .isLength({min:8})
        .withMessage('Password must be atleast 8 characters')
        .matches( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
        .withMessage('Password should contain atleast one uppercase, one lowercase, special character and one digit'),
    check('confirmPassword')
        .custom((value,{req})=>{
            if(value !==req.body.password){
                throw new Error('Password doesnot match')
            } else {
                return true
            }
        }),
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