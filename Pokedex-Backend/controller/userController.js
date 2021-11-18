const Sequelize = require('sequelize')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/index').User;
const { Model } = require('sequelize');

exports.loginUser = async(req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
    const user = await User.findAll({
        where:{
            email
        }
    }).then((result) => {
        return result[0]?.dataValues
    }).catch((err) => {
        const error = new Error(err);
        next(error);
    });
    if(!user){
        return res.status(401).send({
            status:"fail",
            message:"User doesn't exists"
        })
    }
     const hashCompare = await bcrypt.compare(password,user.password)
     console.log(hashCompare)
     if(!hashCompare){
         return res.status(401).json({
             status:401,
             message:"Invalid Credentials"
         })
     }
     const token = jwt.sign({
         id:user.id,
         email:user.email,
         name:user.name
     },process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
     return res.status(201).send({
         status:"success",
         message:"Login Success",
         data:{
            id: user.id,
            name:user.name,
            email:user.email,
            is_verified:user.is_verified || false,
            access_token:token,
         }
     })
    }
    catch(e){
        const error = new Error(e);
        next(error);
    }
}  


exports.registerUser = async(req,res,next) => {
    console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const name = firstName.trim() + ' ' + lastName.trim();
    console.log(name) 
    
    try{
        const user = await User.findAll({
            where:{
                email:email
            }
        }).then((result) => {
            console.log(result)
            return result
        }).catch((err) => {
            const error = new Error(err);
            next(error);
        });
        console.log('user',user)
        if(user && user.length!==0){
            return res.status(409).json({
                status:"fail",
                message:"User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const registerUser = await User.create({
            name,
            email,
            password:hashedPassword,
            is_verified:false
        })
        if(registerUser){
            return res.status(201).json({
                status:"success",
                message:"User created Successfully",
                data:{
                    name,
                    email,
                    is_verified:false
                }
            })
        } else {
            return res.status(403).json({
                status:"fail",
                message:"Failure in creating user"
            })
        }
    }
    catch(e){
        const error = new Error(e);
        next(error);
    }
}

exports.getCurrentUser = async(req,res,next) => {
    const user_id = req.body.id;
    console.log(req.body)
    await User.findAll({
        where:{
            id:user_id
        }
    }).then(result=>{
        return res.status(200).json({
            status:'success',
            data:{
                current_user:result[0]
            }
        })
    }).catch(err=>{
        const error = new Error(err);
        next(error);
    })
}