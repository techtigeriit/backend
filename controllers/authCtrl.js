const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password } = req.body;

            let newUserName = username.toLowerCase().replace(/ /g, "");

            const user_name = await Users.findOne({ username: newUserName });
            if (user_name) {
                return res.status(400).json({ msg: "This username is already taken." });
            }

            const user_email = await Users.findOne({ email });
            if (user_email) {
                return res
                    .status(400)
                    .json({ msg: "This email is already registered." });
            }

            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters long." });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                fullname,
                username: newUserName,
                email,
                password: passwordHash,
            });

            await newUser.save();
            return res.json({
                msg: "Registered Successfully!",
                user: {
                    ...newUser._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;

            const user = await Users.findOne({ _id: req.user._id });

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Your password is wrong." });
            }

            if (newPassword.length < 6) {
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters long." });
            }

            const newPasswordHash = await bcrypt.hash(newPassword, 12);

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { password: newPasswordHash }
            );

            return res.json({ msg: "Password updated successfully." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            return res.json({
                msg: "Logged in  Successfully!",
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = authCtrl;
