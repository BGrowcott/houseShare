const { Schema, model } = require("mongoose");

const houseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		housemates: [{ type: Schema.Types.ObjectId, ref: "user" }],
        landlord: { type: Schema.Types.ObjectId, ref: "user" }
	},
	{
		timestamps: true,
	}
);

const House = model("house", houseSchema);

module.exports = House;
