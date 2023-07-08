const express = require('express')
const Book = require('../models/books')
const router = express.Router()

router.get('/', async (req,res) => {
    let books
    try{
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
     res.status(200).json({ books: books})
    }catch(err){
        res.status(`unable to get data ${err}`)
    }
   
})

module.exports =  router;