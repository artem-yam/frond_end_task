let booksModel = (function (book, storage) {

    function search(text, category) {
        let result = [];
        let booksToSearch = [];
        if ("Most Popular" === category) {
            booksToSearch = getMostPopular();
        } else {
            booksToSearch = storage;
        }
        for (let i = 0; i < booksToSearch.length; i++) {
            let book = booksToSearch[i];
            let titleSearch = book.title.toLowerCase().indexOf(text);
            let authorSearch = book.author.toLowerCase().indexOf(text);
            if (titleSearch !== -1 || authorSearch !== -1) {
                result.push(book);
            }
        }

        return result;
    }


    function getMostPopular() {
        let maxStar = 1;
        let result = [];
        for (let i = 0; i < storage.length; i++) {
            let book = storage[i];
            if (book["rating"] > maxStar) {
                maxStar = book["rating"];
            }
        }

        for (let i = 0; i < storage.length; i++) {
            let book = storage[i];
            if (book["rating"] === maxStar) {
                result.push(book);
            }
        }
        return result;
    }

    function updateRating(bookId, newRating) {
        let bookToUpdate = findBook(bookId);

        bookToUpdate.rating = newRating;

        return bookToUpdate;
    }

    function addBook(title, author, bookImage) {
        bookImage = bookImage.substring(12);

        let bookId = storage.length + 1;
        let newBook = new book(bookId, title, author, bookImage);

        storage.push(newBook);
    }

    function addBookTag(bookId, newTag) {
        if (newTag.trim() !== "") {
            if (!findBook(bookId).tags.includes(newTag)) {
                findBook(bookId).tags.push(newTag);
            }
        }
    }

    function findBook(bookId) {
        let result;
        for (let i = 0; i < storage.length, result === undefined; i++) {
            if (storage[i].id === bookId) {
                result = storage[i];
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
        storage
    }
})(book, booksStorage);