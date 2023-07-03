const express = require('express')
const Author = require('../models/authors')
const router = express.Router()
const path  = require('path')
const Book = require('../models/books')
const fs = require('fs')
const uploadpath = path.join('public', Book.coverImagebasepath)

const multer = require('multer')
const imageMimeType = ['image/jpeg', 'image/png', 'images/gif']


const upload  = multer({
    dest: uploadpath,
    fileFilter: (req,file, callback) => {
        callback(null, imageMimeType.includes(file.mimetype)) 
    } 
})

router.get('/', async (req,res) => { 
    let query = Book.find()
    if(req.query.title != null && req.query.title != ''){
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != ''){
        query = query.lte('published_date', req.query.publishedBefore)
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != ''){
        query = query.gte('published_date', req.query.publishedAfter)
    }
    try{
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})

router.get('/new', async (req,res) => {
    renderNewPage(res, new Book())
})

router.post('/', upload.single('cover') , async (req,res) => {
    const fileName = req.file != null ? req.file.filename : null 
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            published_date: new Date(req.body.published_date),
            page_count: req.body.page_count,
            coverImageName: fileName,
            description: req.body.description
        })
    
    try{
        const newBook  = await book.save()
        //res.redirect(`books/${newBook.id}`)
        res.redirect(`books`)
    }catch{
        if(book.coverImageName != null){
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book,  true)
    }
})

function removeBookCover(fileName){
    fs.unlink(path.join(uploadpath, fileName), err => {
        if (err) console.error(err)
    })
}


async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        } 
        if (hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new',params )
    }catch{
        res.redirect('books')
    }
}

module.exports = router