const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email }).exec();

            if (!user) {
                res.status(400).json({message: "Email or password is incorrect"});
                return;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                res.status(400).json({message: "Email or password is incorrect"});
                return;
            }

            const token = signToken(user);
            res.json(token);

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    async signup(req, res) {
        const { email, password, username } = req.body;

        try {
            const userExists = await User.findOne({ email }).exec();
            if (userExists) {
                res.status(409).json({message: "User with that email already exsists."});
            }
            const user = await User.create({ email, password, username });
            const token = signToken(user);
            console.log(user);
            res.json(token);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
};