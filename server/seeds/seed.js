const db = require('../config/connection');
const { User, Item } = require('../models');
const cleanDB = require('./cleanDB');

const itemData = require('./itemData.json');
const orderData = require('./orderData.json');
const userData = require('./userData.json');

db.once('open', async () => {
    await cleanDB('Item', 'items');
    await cleanDB('User', 'users');

    await User.insertMany(userData);
    await Item.insertMany(itemData);

    process.exit(0);
})