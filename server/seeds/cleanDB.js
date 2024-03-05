const models = require('../models');
const db = require('../config/connection');

// code borrowed from Module 21 Activity 28
module.exports = async (modelName, collectionName) => {
    try {
        let modelExists = await models[modelName].db.db.listCollections({
          name: collectionName
        }).toArray()
    
        if (modelExists.length) {
          await db.dropCollection(collectionName);
        }
      } catch (err) {
        throw err;
      }
}