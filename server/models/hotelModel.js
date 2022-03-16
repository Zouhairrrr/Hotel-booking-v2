const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({


    
    //* this allow us to specify a relationship between the user and the hotel models
    user :{
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : 'Users',
    },
    name: {
        type: String,
        required: [true, 'Hotel must have a name']
    },
    description: {
        type: String,
        required: [true, 'Hotel must have a description']
    },
    localisation: {
        city: {
            type: String,
            required: [true, 'Hotel must have a city']
        },
        country: {
            type: String,
            required: [true, 'Hotel must have a coutry']
        }
    },
    stars: {
        type: String,
        required: [true, 'Hotel must have a stars']
    },
    images: [{
        type: String,
        required: [true, 'Hotel must have at least 4 images']
    }],
});

const Hotel = mongoose.model('hotel', hotelSchema);

module.exports = Hotel;