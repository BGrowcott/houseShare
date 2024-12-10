const { Schema, model } = require("mongoose");

const houseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
        about: String,
		houseMembers: [{ type: Schema.Types.ObjectId, ref: "user" }],
		pendingHouseMembers: [{ type: Schema.Types.ObjectId, ref: "user" }],
		exHouseMembers: [{ type: Schema.Types.ObjectId, ref: "user" }],
        joinCode: {
            type: String,
            required: true,
            unique: true
        },
	},
	{
		timestamps: true,
	}
);

const House = model("house", houseSchema);

module.exports = House;
