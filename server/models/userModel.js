const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema(
    {
        // googleId: {
        //     type: String,
        //     required: true
        // },
        name: { type: String, required: true },
        password: {
            type: String,
            required: true,
        },
        email: { type: String, required: true, unique: true, lowercase: true },
        role: {
            type: String,
            enum: ['client', 'admin', 'owner'],
            default: 'client',
        },
        profileImage: { type: String, required: false }
    },
    // {
    //     resetLink:
    //         { type: String, required: true }
    // },
    {
        timestamps: {
            createdAt: "created_at",
        },
    },

);

module.exports = mongoose.model("Users", UserSchema);
