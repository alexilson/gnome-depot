const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema(
    {
        itemId: Schema.Types.ObjectId,
        price: {
            type: Number,
            default: 0
        }
    }
)

module.exports = orderItemSchema;