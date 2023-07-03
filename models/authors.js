const mongoose = require('mongoose')

const AuthorScheema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author',AuthorScheema)