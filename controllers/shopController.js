const User = require('../models/users');
exports.signIn = (req, res) => {
    res.render('signin',{ layout: 'signin' });
}
exports.signUp = (req, res) => {
    res.render('signup', { layout: 'signup' });
}
exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const comfirm_password = req.body.comfirm_password;

    const user = new User({
        username: username,
        password: password,
        registerAt: date.toISOString()
    }).save().then(result =>{
        res.render("/signin");
    }).catch(err => {
        res.render('/signup', {message: "fail to signup your account"});
    })
}


