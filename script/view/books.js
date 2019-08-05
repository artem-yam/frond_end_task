let BooksView = (function (controller, model, notificationsView) {
    "use strict";

    function createBlock(book) {
        let bookCode = "<div class=\"book\"><img src=\"Images/" +
            book.image + "\"alt=\"" + book.title + "\"/>" +
            "<div class=\"book_description\"><a data-toggle=\"modal\" " +
            "href=\"#modal" + book.id + "\"><span>" + book.title +
            "</span> by " + book.author + "</a></div><div class=\"rating\">";

        for (let i = 5; i > 0; i--) {
            bookCode += "<input id=\"star" + (book.id * 10 + i) +
                "\" type=\"radio\" name=\"rating_stars" + book.id +
                "\" onchange=\"BooksView.updateRating(" + book.id + "," + i + ")\"/>" +
                "<label class=\"star_label\" for=\"star" +
                (book.id * 10 + i) + "\"></label>";

        }

        bookCode += "</div> </div>";

        window.document.querySelector(".main_content").innerHTML += bookCode;

        if (book.rating > 0) {
            document.getElementById("star" + (book.id * 10 +
                book.rating)).setAttribute("checked", "");
        }


        let modalCode = "<div id=\"modal" + book.id + "\" class=\"modal fade\">" +
            "<div class=\"modal-dialog\"></div></div>";

        document.querySelector(".modal_container").innerHTML += modalCode;

        fillModal(book.id);
    }


    function fillModal(bookId) {
        let book = model.findBook(bookId);

        let modalCode = "<div class=\"modal-content\">" +
            "<div class=\"modal-header\"><h5 class=\"modal-title\">" +
            book.author + ": \"" + book.title + "\"</h5></div>" +
            "<div class=\"modal-body\">Tags:";

        if (book.tags.length === 0) {
            modalCode += "<br>Empty";
        } else {
            modalCode += "<ul>";
            for (let tag of book.tags) {
                modalCode += "<li>" + tag + "</li>";
            }
            modalCode += "</ul>";
        }

        modalCode += "<hr>Add new tags:<br>" +
            "Choose from the list: <select name=\"defaultTags\">" +
            "<optgroup label=\"Choose one of these\">" +
            "<option value=\"Must Read Titles\">Must Read Titles</option>" +
            "<option value=\"Best Of List\">Best Of List</option>" +
            "<option value=\"Classic Novels\">Classic Novels</option>" +
            "<option value=\"Non Fiction\">Non Fiction</option></optgroup>" +
            "<optgroup label=\"None of above\">" +
            "<option value=\"Not selected\" selected>Not selected</option>" +
            "</select><br>Or type your tag <input type=\"text\" />" +
            "<br><button onclick=\"BooksView.addBookTag(" + book.id + ")\">" +
            "Confirm</button></p></div><div class=\"modal-footer\">" +
            "<button type=\"button\" class=\"btn btn-primary\" " +
            "data-dismiss=\"modal\">Закрыть</button></div></div>";

        document.querySelector("#modal" + bookId + " .modal-dialog").innerHTML = modalCode;
    }

    function search() {
        window.document.querySelector(".main_content").innerHTML = "";
        let searchText = window.document.querySelector("#search").value.toLowerCase();
        let activeCategory = window.document.querySelector(".main_sort .sort .active").textContent;

        return controller.search(searchText, activeCategory);
    }


    function updateRating(bookId, newRating) {
        let updatedBook = controller.updateRating(bookId, newRating);

        notificationsView.addNotification("You rated  <b>" +
            updatedBook.title + "</b> by <b>" +
            updatedBook.author + "</b> with " + newRating + " stars");
    }

    function addBook() {
        let title = window.document.querySelector("#add_book_title").value;
        let author = window.document.querySelector("#add_book_author").value;
        let bookImage = window.document.querySelector("#add_book_image").value;

        if (title.trim() !== "" || author.trim() !== "") {
            controller.addBook(title, author, bookImage);

            alert("Book \"" + author + " - " + title + "\" has been added!");

            window.document.querySelector("#add_image_label").style = "";
            window.document.querySelector("#loaded_image").style = "";
            window.document.querySelector("#add_book_title").value = "";
            window.document.querySelector("#add_book_author").value = "";

            notificationsView.addNotification("You added <b>" +
                title + "</b> by <b>" + author + "</b> to your <b>Library</b>");

            if (window.document.querySelector(".history_content").innerHTML !== "") {
                notificationsView.loadHistoryPage();
            } else {
                let activeCategory = window.document.querySelector(".main_sort .sort .active");
                if (document.getElementById("all_books") === activeCategory) {
                    showAllBooks();
                }
            }


        } else {
            alert("Fill \"Title\" and \"Author\" fields to add a new book");
        }
    }


    function addBookTag(bookId) {
        let tagSelect =
            window.document.querySelector("#modal" + bookId + " select").value;
        let tagInput =
            window.document.querySelector("#modal" + bookId + " input").value;
        let newTag = "";

        if (tagSelect === "Not selected") {
            if (tagInput.trim() !== "") {
                newTag = tagInput;
            } else {
                alert('You trying to add empty tag! \n' +
                    'Please, correct your tag or choose from the list!');
            }
        } else {
            newTag = tagSelect;
        }

        controller.addBookTag(bookId, newTag);

        fillModal(bookId);
    }


    function showLoadedImage() {
        window.document.querySelector(".upload_button").style = "background-color: #16A3F9";
        let bookImage = window.document.querySelector("#add_book_image").value;
        bookImage = bookImage.substring(12);
        bookImage = "Images/" + bookImage;
        window.document.querySelector("#loaded_image").style = "background-image: url(\"" +
            bookImage + "\"); display: block;";
    }


    function chooseCategory(category) {
        window.document.querySelector(".main_content").innerHTML = "";
        document.querySelector(".modal_container").innerHTML = "";
        let categories = window.document.querySelectorAll(".main_sort .sort div a");
        for (let i = 0; i < categories.length; i++) {
            categories[i].style = "padding: 3px 10px 2px 10px;" +
                "border-radius: 15px;" + "height: 20px;";
            categories[i].className = "";
        }
        window.document.querySelector("#search").value = "";
        let elem = window.document.getElementById(category);
        elem.style =
            "color: white;" +
            "background-color: #95b6d5;" +
            "padding: 3px 10px 2px 10px;" +
            "border-radius: 15px;";
        elem.className = "active";
    }

    function showAllBooks() {
        chooseCategory("all_books");
        window.document.querySelector(".main_content").innerHTML = "";
        for (let i = 0; i < model.storage.length; i++) {
            createBlock(model.storage[i]);
        }
    }


    function filter(filterMethod, category) {
        if (category !== undefined) {
            chooseCategory(category);
        }
        let result = filterMethod() || model.storage;

        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                createBlock(result[i]);
            }
        } else {
            window.document.querySelector(".main_content").innerHTML = "<h2>Not found!</h2>";
        }
    }

    function browsePage() {
        for (let elem of window.document.querySelectorAll(".nav_menu a")) {
            elem.classList.remove("active")
        }
        window.document.querySelector(".nav_menu .browse").classList.add("active");
        for (let mainDiv of  window.document.querySelectorAll(".main > div:not(:last-of-type)")) {
            mainDiv.style = 'display: flex';
        }
        window.document.querySelector(".history_content").innerHTML = "";

        showAllBooks();
    }

    window.document.querySelector(".nav_menu .browse").addEventListener("click", function () {
        browsePage();
    });

    window.document.querySelector("#add_book_image").addEventListener("change", function () {
        showLoadedImage();
    });

    window.document.querySelector("#add_book").addEventListener("click", function () {
        addBook();
    });

    window.document.querySelector("#all_books").addEventListener("click", function () {
        showAllBooks();
    });

    window.document.querySelector("#most_popular").addEventListener("click", function () {
        filter(model.getMostPopular, "most_popular");
    });

    window.document.querySelector("#search").addEventListener("input", function () {
        filter(search);
    });

    return {
        browsePage,
        addBookTag,
        updateRating
    };
}(BooksController, BooksModel, NotificationsView));