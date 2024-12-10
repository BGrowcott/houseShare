const { House, User } = require("../../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
	async getHouses(req, res) {
		try {
			const houses = await House.find();
			res.json(houses);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	async createHouse(req, res) {
		try {
			if (!req.user) {
				res.status(401).json({ message: "Please log in" });
				return;
			}

			const house = await House.create({ ...req.body, joinCode: uuidv4() });
			house.houseMembers.push({ _id: req.user._id });
			await house.save();

			const user = await User.findById(req.user._id);
			user.house = house._id;
			await user.save();

			res.json(house);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	async joinHouse(req, res) {
		try {
			if (!req.user) {
				res.status(401).json({ message: "Please log in" });
			}

			const userId = req.user._id;

			const house = await House.findOne({ joinCode: req.body.joinCode });
			const user = await User.findById(userId);

			if (!house) {
				res.status(404).json({ message: "Whoops! House not found." });
				return;
			}

			if (house.houseMembers.includes(userId)) {
				res.status(400).json({ message: "You are already a member of this house" });
				return;
			}

			house.houseMembers.push({ _id: userId });
			house.populate("houseMembers", "username");
			user.house = house._id;
			await user.save();
			await house.save();

			res.status(200).json(house);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	async getHouseForUser(req, res) {

		console.log("hi");

		try {
			if (!req.user) {
				res.status(401).json({ message: "Please log in" });
			}

			const user = await User.findById(req.user._id);
			const house = await House.findById(user.house).populate("houseMembers", "username");

			res.json(house);
		} catch (error) {
			res.status(404).json(error);
		}
	},

	async updateHouse(req, res) {
		try {
			const house = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
			res.json(house);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	async deleteHouse(req, res) {
		try {
			await House.deleteOne({ _id: req.params.id });
			res.json("Deleted");
		} catch (error) {
			res.status(500).json(error);
		}
	},
};
