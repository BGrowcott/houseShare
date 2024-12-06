const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Role = model("role", roleSchema);

module.exports = Role;
