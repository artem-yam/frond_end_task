function BooksModel(storage, tags) {
    "use strict";

    const MAX_RATING = 5;
    const MOST_POPULAR_FILTER = "Most Popular";
    const TEXT_NOT_FOUND = -1;

    let booksStorage = storage;
    let availableTags = tags;
    let onBookAdd = new EventEmitter();
    let onRatingChange = new EventEmitter();
    let onTagsChange = new EventEmitter();

    function search(text, filter) {
        let result = [];

        for (let i = 0; i < booksStorage.length; i++) {
            let book = booksStorage[i];
            if (checkWithFilter(book, filter) &&
                (book.title.toLowerCase()
                        .indexOf(text.toLowerCase()) !== TEXT_NOT_FOUND ||
                    book.author.toLowerCase()
                        .indexOf(text.toLowerCase()) !== TEXT_NOT_FOUND)) {
                result.push(book);
            }
        }

        return result;
    }

    function checkWithFilter(book, filter) {
        let result = false;

        if (filter === MOST_POPULAR_FILTER) {
            if (book.rating === MAX_RATING) {
                result = true;
            }
        } else {
            result = true;
        }

        return result;
    }

    function getMostPopular() {
        return search("", MOST_POPULAR_FILTER);
    }

    function updateRating(bookId, newRating) {
        let bookToUpdate = findBook(bookId);

        bookToUpdate.rating = newRating;
        onRatingChange.notify(bookToUpdate);
    }

    function addBook(title, author, bookImage) {
        let newBook = new Book(getNextId(), title, author, bookImage);

        booksStorage.push(newBook);
        onBookAdd.notify(title, author);
    }

    function getNextId() {
        return ++booksStorage.length;
    }

    function addBookTag(bookId, newTag) {
        if (newTag.trim() !== "") {
            let book = findBook(bookId);
            if (book && !book.tags.includes(newTag)) {
                book.tags.push(newTag);
                if (!availableTags.includes(newTag)) {
                    availableTags.push(newTag);
                }
                onTagsChange.notify(book);
            }
        }
    }

    function findBook(bookId) {
        let result;
        for (let i = 0; i < booksStorage.length, result === undefined; i++) {
            if (booksStorage[i].id === bookId) {
                result = booksStorage[i];
            }
        }
        return result;
    }

    return {
        search,
        updateRating,
        addBook,
        addBookTag,
        findBook,
        getMostPopular,
        storage: booksStorage,
        tags: availableTags,
        onBookAdd,
        onRatingChange,
        onTagsChange
    }
}