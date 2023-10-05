const mongoose = require('mongoose')
const Schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists']
        },
        password: {
            type: String,
            required: [true, 'PASSWORD is required']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', Schema)