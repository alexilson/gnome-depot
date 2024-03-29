const { Schema, model } = require('mongoose');
// const Item = require('./Item');
const orderSchema = require('./Order');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true
        },
        orders: [orderSchema],
        cart: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Item'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// encrypts password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// check password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
