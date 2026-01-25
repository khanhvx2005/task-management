const md5 = require('md5')
const User = require("../models/user.model")
const generate = require("../../../helpers/generate.heplers")
const ForgotPassword = require("../models/forgot-password.model")
const sendMailHelper = require("../../../helpers/sendMail.heplers")

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
            password: md5(password),
            token: generate.generateRandomString(20)
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
        message: "Đăng nhập thành công",
        token: user.token
    })
}
module.exports.forgot = async (req, res) => {
    const { email } = req.body;
    const exitsEmail = await User.findOne({
        email: email,
        deleted: false
    })
    if (!exitsEmail) {
        res.json({
            code: 400,
            message: "Email không tồn tại"
        })
        return;
    }

    const otp = generate.generateRandomNumber(6);
    const objForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    const forgotPassword = new ForgotPassword(objForgotPassword);
    await forgotPassword.save();

    // Trả otp về mail
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `Mã OTP để lấy lại mật khẩu là <b>${otp}</b> . Thời hạn sử dụng 3 phút`
    sendMailHelper.sendMail(email, subject, html);
    res.json({
        code: 200,
        message: "Đã trả mã otp về mail"

    })

}
module.exports.otp = async (req, res) => {
    const { email, otp } = req.body;
    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if (!result) {
        res.json({
            code: 400,
            message: "Mã otp không đúng"
        })
        return;
    }
    const user = await User.findOne({
        email: email
    })
    const token = user.token;
    res.cookie("token", token)
    res.json({
        code: 200,
        token: token
    })
}
module.exports.reset = async (req, res) => {
    const { password } = req.body;
    const tokenUser = res.cookie.tokenUser;
    const user = await User.findOne({
        token: tokenUse,
        deleted: false
    })
    if (user.password === md5(password)) {
        res.json({
            code: 200,
            message: "Vui lòngnhập mật khẩu mới"
        })
        return;
    }
    await User.updateOne({
        token: tokenUser
    }, {
        password: md5(password)
    })
    res.json({
        code: 200,
        message: "Đổi mật khẩu thành công"
    })
}
module.exports.detail = async (req, res) => {


    res.json({
        code: 200,
        message: "Thành công",
        info: req.user
    })
}
module.exports.list = async (req, res) => {
    const users = await User.find({
        deleted: false
    }).select("fullname email")
    res.json({
        code: 200,
        user: users
    })
}