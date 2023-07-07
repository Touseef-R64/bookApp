if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} 

const express = require("express");
const app = express()
const bodyparser = require("body-parser")


const indexRouter = require("./routes/index")
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')



const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('connected to mongoose') )


app.use(express.static('public'))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }))


app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


app.listen(process.env.PORT || 4000 )


