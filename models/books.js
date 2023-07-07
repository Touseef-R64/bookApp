const mongoose = require('mongoose')
const path = require('path')
const coverImagebasepath = 'uploads/bookCovers'

const BookScheema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    published_date: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

BookScheema.virtual('coverImagepath').get(function(){
    if(this.coverImageName != null){
        return path.join('/', coverImagebasepath, this.coverImageName)
    }
})

module.exports = mongoose.model('Book',BookScheema)
module.exports.coverImagebasepath = coverImagebasepath