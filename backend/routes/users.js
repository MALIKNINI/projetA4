const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


//REGISTER
router.post('/register', (req, res, next) => {
  const newUser = User ({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
  })
  console.log(newUser);
  newUser.save(err => {
      if(err){
          return res.status(400).json({
              title: 'error',
              error: 'email utilisé'
          })
      }
      return res.status(200).json({
          title: 'register success !'
      })
  })
})

//LOGIN
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).json({
           title: 'server error',
           error: err
       }) 
      if (!user) return res.status(401).json({
           title: 'user not found',
           error: 'informations invalides'
       })
      if (!bcrypt.compareSync(req.body.password, user.password)) {
       return res.status(401).json({
           title: 'login faild',
           error: 'informations invalides possible mot de passe incorrecte'
       })   
      }
      //Générer un token après l'authentification
      let token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      return res.status(200).json({
          title: 'login',
          token: token
      })
  })
})

//GET USER AFTER LOGIN
router.get('/user', (req, res, next) => {
  let token = req.headers.token;
  //Invalid Token
  jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
          title: 'non autoriser'
      })
      //valid token
      User.findOne({ _id: decoded.userId }, (err, user) => {
          if (err) return console.log(err)
          return res.status(200).json({
              title: 'User Grabbed',
              user: {
                  idd: user._id,
                  name: user.name,
                  email: user.email
              }
          })
      })
  })
})


module.exports = router;
