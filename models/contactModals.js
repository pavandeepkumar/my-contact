const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add a user_id'],
        ref: 'User'

    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    mobile_no: {
        type: String,
        required: [true, 'Please add a mobile_no']
    },
    img: {
        data: Buffer,
        contentType: String
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Contact', contactSchema);