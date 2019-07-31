var BooksView = (function (BooksController) {
    "use strict";

    //Формируем код блока книги
    function createBlock(id, title, author, image, stars, searchResult) {
        var code = "<div class=\"book\"><img src=\"Images/" +
            image + "\"alt=\"" + title + "\"/><div class=" + 
            "\"book_description\"><span>" + title +
            "</span> by " + author + "</div><div class=\"rating\">" +
            "<input id=\"star" + (id*10+5) +
            "\" type=\"radio\" name=\"rating_stars" + id +
            "\"/><label class=\"star_label\" title=\"gorgeous\" for=\"star" + 
            (id*10+5) + "\"></label><input id=\"star" + (id*10+4) +
            "\" type=\"radio\" name=\"rating_stars" + id + 
            "\"/><label class=\"star_label\" title=\"good\" for=\"star" + 
            (id*10+4) + "\"></label><input id=\"star" + (id*10+3) +
            "\" type=\"radio\" name=\"rating_stars" + id +
            "\"/><label class=\"star_label\" title=\"regular\" for=\"star" + 
            (id*10+3) + "\"></label><input id=\"star" + (id*10+2) +
            "\" type=\"radio\" name=\"rating_stars" + id +
            "\"/><label class=\"star_label\" title=\"poor\" for=\"star" + 
            (id*10+2) + "\"></label><input id=\"star" + (id*10+1) +
            "\" type=\"radio\" name=\"rating_stars" + id +
            "\"/><label class=\"star_label\" title=\"bad\" for=\"star" + 
            (id*10+1) + "\"></label></div> </div>";

        window.document.querySelector(".main_content").innerHTML += code;
    }

    //Ресультат не поиска
    function noResult() {
        window.document.querySelector(".main_content").innerHTML = "<h2>Not found!</h2>";
    }

    //Загружаем библиотеку
    function allBooks() {
        categoryClick("all_books");
        window.document.querySelector(".main_content").innerHTML = "";
        for (var i = 0; i < BooksStore.length; i++) {
            var book = BooksStore[i];
            createBlock(
                book["id"],
                book["title"],
                book["author"],
                book["image"],
                book["stars"]
            );
            if (book["stars"]>0) {
                document.getElementById("star" + ((i+1)*10 + 
                book["stars"])).setAttribute("checked","");
            }
            
        }       
    }

    //Загружаемая фотография
    var bookImage;

    //Загрузка фотографии
    function imageLoaded() {
        window.document.querySelector(".upload_button").style = "background-color: #16A3F9";
        bookImage = window.document.querySelector("#add_book_image").value;
        bookImage = bookImage.substring(12);
        bookImage = "Images/" + bookImage;
        window.document.querySelector("#loaded_image").style = "background-image: url(\"" +
            bookImage + "\"); display: block;";
    }

    //Выбор категории
    function categoryClick(category) {
        window.document.querySelector(".main_content").innerHTML = "";
        var categories = window.document.querySelectorAll(".main_sort .sort div a");
        for (var i=0;i<categories.length;i++){
            categories[i].style = "padding: 3px 10px 2px 10px;" +
            "border-radius: 15px;" + "height: 20px;";
            categories[i].setAttribute("class", "");
        }
        window.document.querySelector("#search").value = "";
        var elem = document.getElementById(category);
        elem.style =
            "color: white;" +
            "background-color: #95b6d5;" +
            "padding: 3px 10px 2px 10px;" +
            "border-radius: 15px;";
        elem.setAttribute("class","activeCategory");
    }

    //Клик по категории
    function mostPopularClick() {
        categoryClick("most_popular");
        var result = BooksController.mostPopular();

        if (result != 0) {
            for (var i = 0; i < result.length; i++) {
                createBlock(result[i].id, result[i].title, result[i].author, result[i].image, result[i].stars);
                window.document.getElementById("star" + (result[i].id*10 + 
                result[i].stars)).setAttribute("checked","");
            }
        } else {
            window.document.querySelector(".main_content").innerHTML = "<h2>Not found!</h2>";
        }
    }

    //Поиск
    function onSearch() {
        var result = BooksController.search();

        if (result != 0) {
            for (var i = 0; i < result.length; i++) {
                createBlock(result[i].id, result[i].title, result[i].author, result[i].image, result[i].stars);
            }
        } else {
            window.document.querySelector(".main_content").innerHTML = "<h2>Not found!</h2>";
        }
    }

    //События
    window.document.querySelector("#add_book_image").addEventListener("change", function () {
        imageLoaded();
    });

    window.document.querySelector("#add_book").addEventListener("click", function () {
        BooksController.addBook();
    });

    window.document.querySelector("#all_books").addEventListener("click", function () {
        allBooks();
    });

    window.document.querySelector("#most_popular").addEventListener("click", function () {
        mostPopularClick();
    });

    window.document.querySelector("#search").addEventListener("input", function () {
        onSearch();
    });
    window.document.querySelector("#search").addEventListener("change", function () {
        onSearch();
        var searchText = window.document.querySelector("#search").value;
        var activeCategory = window.document.getElementsByClassName("activeCategory");
        NotificationsController.addNotification(
             "You searched <b>" + searchText + 
             "</b> in <b>" + activeCategory[0].innerHTML + "</b>");
    });
    

    return {
        categoryClick: categoryClick,
        noResult: noResult,
        imageLoaded: imageLoaded,
        bookImage: bookImage,
        createBlock: createBlock,
        allBooks: allBooks
    };
} (BooksController));