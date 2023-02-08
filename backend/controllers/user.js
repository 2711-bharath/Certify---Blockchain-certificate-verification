const bcrypt = require('bcrypt');
const User = require('../models/User');
const shortid = require('shortid');

const loginController = async (req, res, next) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const usrObj = await User.findOne({ username: username });
    const hpwd = usrObj.password;
    console.log(usrObj);
    let comp = await bcrypt.compare(password, hpwd);
    if (comp) {
        return res.send(usrObj);
    }
    return res.send({ result: false });
};

const signupController = async (req, res, next) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const hashed = await bcrypt.hash(password, 10);
    let userObj = new User({
        username,
        password: hashed,
        uid: shortid.generate()
    });
    await userObj.save();
    return res.send(userObj);
};

module.exports = {
    loginController,
    signupController
};