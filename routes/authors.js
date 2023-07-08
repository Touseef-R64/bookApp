const express = require('express')
const router = express.Router()
const Author = require('../models/authors')


router.get('/', async (req,res) => { 
    let searchOption = {}
    if(req.query.name != null && req.query.name !== '')
    {
        searchOption.name = new RegExp(req.query.name, 'i')
    }

    try {
        const authors = await Author.find(searchOption)
        res.render('authors/index',{ authors: authors, searchOption: req.query})
    }catch {
        res.redirect('/')
    }
})

router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author() })
})

router.post('/', async (req,res) => {
   
    try{
        const author = new Author({
            name: req.body.name
        })
        const newAuthor = await author.save()
         //res.redirect(`authors/${newAuthor.id}`)
         res.status(200).json({author : newAuthor})
    }catch{ 
        res.status(401).send('Error Adding Author')
    }
    
})

module.exports = router