const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "plz enter product name"]
    },
    description: {
        type: String,
        required: [true, "plz enter product description"]
    },
    price: {
        type: Number,
        required: [true, "plz enter product price"],
        maxLength: [8, "prize cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please provide a Category']
    },
    Stock: {
        type: Number,
        required: [true, 'Stock field is Required'],
        maxLength: [4, "Stock cannot exceed 4 characters"],
    },
    numOfReviews: {
        type: Number,
        // required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Product', productSchema);
//normal sa product schema hai jisme kuch neccesary chize hai