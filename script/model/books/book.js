let book = (function () {
    "use strict";

    function Book(id, title, author, image, rating, tags) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.image = image || "noCover.jpg";
        this.rating = rating || 0;
        this.tags = tags || [];
    }

    return Book;
}());
