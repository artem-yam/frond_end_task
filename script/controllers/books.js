let BooksController = (function (model) {
    "use strict";

    function search(text, category) {
        return model.search(text, category);
    }


    function updateRating(bookId, newRating) {
        return model.updateRating(bookId, newRating);
    }


    function addBook(title, author, bookImage) {
        model.addBook(title, author, bookImage);
    }

    function addBookTag(bookId, newTag) {
        model.addBookTag(bookId, newTag);
    }


    return {
        updateRating,
        addBook,
        search,
        addBookTag
    };
}(BooksModel));