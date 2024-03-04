const { Schema, model } = require('mongoose');
const orderItemSchema = require('./orderItem');

const orderSchema = new Schema(
    {
        orderDate: {
                type: Date,
                default: Date.now,
                get: formatTimestamp
            },
        orderStatus: {
            type: String,
            default: "Pending"
        },
        items: [orderItemSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

function formatTimestamp(timestamp) {
    return `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`
}

module.exports = orderSchema;