const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res) => {
    const token = req.headers.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'non autoriser'
        })
        //token valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            return res.status(200).json({
                title: 'User Grabbed',
                user: {
                    name: user.name,
                    email: user.email
                }
            })
        })
    })
}
module.exports = { requireAuth }