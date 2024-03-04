const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema(
    {
        itemId: Schema.Types.ObjectId,
        price: Number
    }
)

module.exports = orderItemSchema;