function Controller(booksModel, notificationsModel) {
    "use strict";

    let controlledBooksModel = booksModel;
    let controlledNotificationsModel = notificationsModel;

    function updateRating(bookId, newRating) {
        controlledBooksModel.updateRating(bookId, newRating);
    }

    function addBook(title, author, bookImage) {
        controlledBooksModel.addBook(title, author, bookImage);
    }

    function addBookTag(bookId, newTag) {
        controlledBooksModel.addBookTag(bookId, newTag);
    }

    function addNotification(text, type) {
        controlledNotificationsModel.addNotification(text, type);
    }

    return {
        updateRating,
        addBook,
        addBookTag,
        addNotification
    };
}