const express = require("express");
const router = express.Router();
const path = require("path");
const Book = require("../models/books");
const fs = require("fs");
const uploadpath = path.join("public", Book.coverImagebasepath);

const multer = require("multer");
const imageMimeType = ["image/jpeg", "image/png", "images/gif"];

const upload = multer({
  dest: uploadpath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeType.includes(file.mimetype));
  },
});

router.get("/", async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("published_date", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("published_date", req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    res.status(200).json({
      books: books,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  if (!fileName) {
    console.log("no file");
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    published_date: new Date(req.body.published_date),
    genre: req.body.genre,
    coverImageName: fileName,
    description: req.body.description,
  });

  try {
    const newBook = await book.save();
    //res.redirect(`books/${newBook.id}`)
    res.status(200).send("book Added Succesfully!");
  } catch (err) {
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName);
    }
    res.send(501, `Could not Add ${err}`);
  }
});

router.put(`/:id`, upload.single("file"), async (req, res) => {
  const fileName = req.file != null ? req?.file?.filename : null;
  const book = await Book.findById(req.params.id);

  try {
    if (fileName) {
      removeBookCover(book.coverImageName);
    }
    if (book) {
      let newDate = req?.body?.published_date
        ? new Date(req?.body?.published_date)
        : new Date(book.published_date);
      const update = await book.updateOne({
        title: req?.body?.title || book.title,
        author: req?.body?.author || book.author,
        published_date: newDate,
        genre: req?.body?.genre || book.genre,
        coverImageName: fileName || book.coverImageName,
        description: req?.body?.description || book.description,
      });
      res.send(200, "update Successfull");
    } else {
      res.send(404, "could not find the designated book");
    }
  } catch (err) {
    res.send(501, `Could not Update ${err}`);
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      removeBookCover(book.coverImageName);
      const remove = await book.delete();
      res.send(200, "delete Successfull!");
    } else {
      res.send(404, "could not find the designated book");
    }
  } catch {
    res.send(500, "Could not Delete");
  }
});

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadpath, fileName), (err) => {
    if (err) console.error(err);
  });
}

module.exports = router;
