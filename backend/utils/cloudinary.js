const cloudinary = require('cloudinary');
const config = require('../config/index')

cloudinary.config({ 
    cloud_name: process.env.CD_NAME || config.cloudinary.name, 
    api_key: process.env.CD_API_KEY || config.cloudinary.apiKey, 
    api_secret: process.env.CD_API_SECRET || config.cloudinary.apiSecret, 
});

module.exports = cloudinary;