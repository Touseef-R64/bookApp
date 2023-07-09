const request = require("supertest");
const app = require("../routes/books");
const mongoose = require("mongoose");
const Book = require("../models/books");

describe("Books API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/Myproject", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 15000); // Increased timeout to 15 seconds (15000 ms)

  afterAll(async () => {
    await mongoose.connection.close();
  }, 15000); // Increased timeout to 15 seconds (15000 ms)

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  describe("GET /books", () => {
    it("should return all books", async () => {
      await Book.create({
        title: "Book 1",
        author: "Author 1",
        genre: "fiction",
        description: "test case 1",
        published_date: new Date(),
      });
      await Book.create({
        title: "Book 2",
        author: "Author 2",
        genre: "gaming",
        description: "test case 2",
        published_date: new Date(),
      });

      const res = await request(app).get("/books");

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
      expect(res.body[0].title).toEqual("Book 1");
      expect(res.body[1].title).toEqual("Book 2");
    });

    it("should return filtered books based on query parameters", async () => {
      await Book.create({
        title: "Book 1",
        author: "Author 1",
        genre: "gaming",
        description: "test case 2",
        published_date: new Date("2022-01-01"),
      });
      await Book.create({
        title: "Book 2",
        author: "Author 2",
        genre: "gaming",
        description: "test case 2",
        published_date: new Date("2023-01-01"),
      });

      const res = await request(app)
        .get("/books")
        .query({ title: "book", publishedBefore: "2023-01-01" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(1);
      expect(res.body[0].title).toEqual("Book 1");
    });

    it("should handle errors", async () => {
      jest
        .spyOn(Book, "find")
        .mockRejectedValueOnce(new Error("Database error"));

      const res = await request(app).get("/books");

      expect(res.statusCode).toEqual(500);
    });
  });

  describe("POST /books", () => {
    it("should create a new book", async () => {
      const res = await request(app).post("/books").send({
        title: "New Book",
        author: "New Author",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Book Added Successfully!");

      const book = await Book.findOne({ title: "New Book" });
      expect(book).toBeTruthy();
    });

    it("should handle missing required fields", async () => {
      const res = await request(app).post("/books").send({
        // Missing required fields
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Missing required fields");
    });

    it("should handle errors", async () => {
      jest
        .spyOn(Book.prototype, "save")
        .mockRejectedValueOnce(new Error("Database error"));

      const res = await request(app).post("/books").send({
        title: "New Book",
        author: "New Author",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      expect(res.statusCode).toEqual(500);
    });
  });

  describe("PUT /books/:id", () => {
    it("should update an existing book", async () => {
      const book = await Book.create({
        title: "Book 1",
        author: "Author 1",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      const res = await request(app).put(`/books/${book._id}`).send({
        title: "Updated Book",
        author: "Updated Author",
        published_date: new Date(),
        genre: "Mystery",
        coverImageName: "new-image.jpg",
        description: "An updated book.",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Update Successful");

      const updatedBook = await Book.findById(book._id);
      expect(updatedBook.title).toEqual("Updated Book");
      expect(updatedBook.author).toEqual("Updated Author");
    });

    it("should handle missing required fields", async () => {
      const book = await Book.create({
        title: "Book 1",
        author: "Author 1",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      const res = await request(app).put(`/books/${book._id}`).send({
        // Missing required fields
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Missing required fields");
    });

    it("should handle book not found", async () => {
      const res = await request(app).put("/books/nonexistent").send({
        title: "Updated Book",
        author: "Updated Author",
        published_date: new Date(),
        genre: "Mystery",
        coverImageName: "new-image.jpg",
        description: "An updated book.",
      });

      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual("Could not find the designated book");
    });

    it("should handle errors", async () => {
      const book = await Book.create({
        title: "Book 1",
        author: "Author 1",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      jest
        .spyOn(Book.prototype, "updateOne")
        .mockRejectedValueOnce(new Error("Database error"));

      const res = await request(app).put(`/books/${book._id}`).send({
        title: "Updated Book",
        author: "Updated Author",
        published_date: new Date(),
        genre: "Mystery",
        coverImageName: "new-image.jpg",
        description: "An updated book.",
      });

      expect(res.statusCode).toEqual(500);
    });
  });

  describe("DELETE /books/:id", () => {
    it("should delete an existing book", async () => {
      const book = await Book.create({
        title: "Book 1",
        author: "Author 1",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      const res = await request(app).delete(`/books/${book._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("Delete Successful!");

      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).toBeFalsy();
    });

    it("should handle errors", async () => {
      const book = await Book.create({
        title: "Book 1",
        author: "Author 1",
        published_date: new Date(),
        genre: "Fiction",
        coverImageName: "image.jpg",
        description: "A great book.",
      });

      jest
        .spyOn(Book.prototype, "delete")
        .mockRejectedValueOnce(new Error("Database error"));

      const res = await request(app).delete(`/books/${book._id}`);

      expect(res.statusCode).toEqual(500);
    });
  });
});
