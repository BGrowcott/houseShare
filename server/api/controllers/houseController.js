const { House, User } = require("../../models");
const { v4: uuidv4 } = require('uuid');

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

	async getHouseForUser(req, res) {
		try {

            if (!req.user) {
				res.status(401).json({ message: "Please log in" });
			}

            const user = await User.findById(req.user._id);
			const house = await House.findById(user.house);

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
