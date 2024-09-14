import mongoose from "mongoose";
// Import required modules

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the user model
// module.exports = mongoose.model('User', userSchema);
const userModel = mongoose.model('User', userSchema);

export default userModel;