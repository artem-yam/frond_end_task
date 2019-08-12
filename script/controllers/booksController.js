function BooksController(model) {
    "use strict";

    let booksModel = model;

    function updateRating(bookId, newRating) {
        booksModel.updateRating(bookId, newRating);
    }

    function addBook(title, author, bookImage) {
        booksModel.addBook(title, author, bookImage);
    }

    function addBookTag(bookId, newTag) {
        booksModel.addBookTag(bookId, newTag);
    }

    return {
        updateRating,
        addBook,
        addBookTag
    };
}