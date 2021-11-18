const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/user');
const pokemonRouter = require('./routes/pokemon');
 
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter)
app.use('/pokemon',pokemonRouter)

app.all('*',(req,res,next)=>{
  // res.status(404).json({
  //   status:'fail',
  //   message:'Cannot fetch the requested resources'
  // })
  const err = new Error('Cannot fetch the requested resources');
  err.status= "fail";
  err.statusCode = 404;
  next(err)
})

app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Internal Server Error'

  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
})

app.listen(process.env.PORT_NO, () =>
  console.log(`Example app listening on port ${process.env.PORT_NO}`),
);