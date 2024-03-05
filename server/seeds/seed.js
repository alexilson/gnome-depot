const db = require('../config/connection');
const { User, Item } = require('../models');
const cleanDB = require('./cleanDB');

const itemData = require('./itemData.json');
const orderData = require('./orderData.json');
const userData = require('./userData.json');

db.once('open', async () => {
    await cleanDB('Item', 'items');
    await cleanDB('User', 'users');

    const userOrderData = await userData.map((user) => {
        console.log(user)
        user.orders = orderData
        console.log(user)
        return user
    })

    await Item.insertMany(itemData);
    await User.insertMany(userOrderData);

    process.exit(0);
})