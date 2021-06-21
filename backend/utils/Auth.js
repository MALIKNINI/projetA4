const bcrypt = require('bcryptjs')
const User = require('../models/User.js')

/**
 * @DESC to register the user (USER, RESTORER, DELIVERY)
 */
const userRegister = async (userDets, role, res) => {
    try {
        //valideate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
        return res.status(400).json({
            message: 'username is already taken',
            success: false
        });
    }
    //validate the emali
    let emailNotRegistred = await validateEmail(userDets.email);
    if (!emailNotRegistred) {
        return res.status(400).json({
            message: 'email is already registred',
            success: false
        });
    }

    //Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    //create a new User
    const newUser = new User({
        ...userDets,
        password,
        role
    });
    await newUser.save();
    return res.status(201).json({
        Message: "User registred successfully",
        success: true
    });
    } catch (err) {
        //implemente logger function over here (winston)
        return res.status(500).json({
            Message: "Unable to create the account",
            success: false
        });
    } 
};

const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

module.exports = {
    userRegister
};
