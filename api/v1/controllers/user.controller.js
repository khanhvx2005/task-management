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
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại !"
        })
        return;
    }
    if (md5(password) !== user.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu !"
        })
        return;
    }
    if (user.status === "inactive") {
        res.json({
            code: 400,
            message: "Tài khoản đã bị khóa !"
        })
        return;
    }
    res.cookie("token", user.token);
    res.json({
        code: 200,
        message: "Đăng nhập thành công"
    })
}