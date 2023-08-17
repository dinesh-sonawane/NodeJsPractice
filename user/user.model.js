const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userId = require('./userId.autoincrement.js');

const userSchema = new schema({
    userId: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const doc = this;
    userId.findByIdAndUpdate(
        { _id: 'userId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    )
        .then(counter => {
            doc.userId = counter.sequence_value;
            next();
        })
        .catch(err => next(err));
});

module.exports = mongoose.model('User', userSchema);



