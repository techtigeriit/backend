const Users = require("../models/userModel");

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({
                username: { $regex: req.query.username },
            })
                .limit(10)
                .select("-password")
            return res.json({ users });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getUser: async (req, res) => {
        try {
            console.log(req.params.id);
            const user = await Users.findById(req.params.id)
                .select("-password")
                .populate("matches winnings losings", "-password");

            console.log(user);
            if (!user) {
                return res.status(400).json({ msg: "requested user does not exist." });
            }

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            if (!fullname) {
                return res.status(400).json({ msg: "Please add your full name." });
            }

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                req.body
            );

            return res.json({ msg: "Profile updated successfully." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = userCtrl;
