const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String,
            default: "/images/placeholder.png"
        },
        price: {
            type: Number,
            default: 0.99
        },
        inStock: {
            type: Boolean,
            default: true
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Item = model('Item', itemSchema);

module.exports = Item;