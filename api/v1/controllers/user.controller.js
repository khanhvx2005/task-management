const md5 = require('md5')
const User = require("../models/user.model")
module.exports.register = async (req, res) => {
    const { fullname, email, password } = req.body;
    const exitsEmail = await User.findOne({
        email: email,
        deleted: false
    })
    if (exitsEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        })
    } else {
        const user = new User({
            fullname: fullname,
            email: email,
            password: md5(password)
        });
        await user.save();
        res.cookie("token", user.token);
        res.json({
            code: 200,
            message: "Đăng ký thành công",
            token: user.token
        })
    }

}