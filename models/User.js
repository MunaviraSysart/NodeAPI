const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }  // this returns the date as 'createdAt' and 'updatedAt' 
);

module.exports = mongoose.model('User', UserSchema);