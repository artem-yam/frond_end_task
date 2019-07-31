//Функции для работы с библиотекой
var BooksController = (function (BooksStore, Utils, NotificationsStore, Book) {
    "use strict";

    //Поиск
    function search() {
        window.document.querySelector(".main_content").innerHTML = "";
        var count = 0;
        var reply = [];
        var search = window.document.querySelector("#search").value.toLowerCase();
        var result = [];
        var activeCategory = window.document.getElementsByClassName("activeCategory");
        if (document.getElementById("most_popular") == activeCategory[0] ){
            result = BooksController.mostPopular();
        } else{
            result = BooksStore;
        }
        for (var i = 0; i < result.length; i++) {
            var book = result[i];
            var titleSearch = book["title"].toLowerCase().indexOf(search);
            var authorSearch = book["author"].toLowerCase().indexOf(search);
            if (titleSearch != -1 || authorSearch != -1) {
                reply.push({
                    id: book["id"],
                    title: book["title"],
                    author: book["author"],
                    image: book["image"],
                    stars: book["stars"]
                });
                count++;
            }
        }
        if (count == 0) {
            var reply = 0;
        }

        return reply;
    }

    //Изменение рейтинга
    function updateRating() {
         for(i=0;i<BooksStore.length;i++){
            var j=5;
            var book = BooksStore[i];
            while (j>0){
                var star = window.document.getElementById("star"+(10*(i+1)+j));
                if (star.hasAttribute("checked")) {
                    if (book["stars"] != j) {
                        alert("Nw rating " + j);
                        //book["stars"] = j;
                    }
                    j=0;
                }
                j--;
            }    
        } 
        BooksView.allBooks();
    }

 /*   function updateRating(rating, id) {
        id--;
        if (BooksStore[id].stars != rating) {
            BooksStore[id].stars = rating;
            var historyId = BooksStore.length + 1;
            NotificationsController.addNotification("You rate  <b>" +
                BooksStore[id].title + "</b> by <b>" +
                BooksStore[id].author + "</b> " + rating + " stars");
            BooksView.allBooks();
        }
    }*/

    //Только популярные
    function mostPopular() {
        var maxStar = 1;
        var reply = [];
        for (var i = 0; i < BooksStore.length; i++) {
            var book = BooksStore[i];
            if (book["stars"] > maxStar) {
                maxStar = book["stars"];
            }
        }

        for (var i = 0; i < BooksStore.length; i++) {
            var book = BooksStore[i];
            if (book["stars"] == maxStar) {
                reply.push({
                    id: book["id"],
                    title: book["title"],
                    author: book["author"],
                    image: book["image"],
                    stars: book["stars"]
                });
            }
        }
        return reply;
    }

    //Добавление книги
    function addBook() {
        var title = window.document.querySelector("#add_book_title").value;
        var author = window.document.querySelector("#add_book_author").value;
        var bookImage = window.document.querySelector("#add_book_image").value;
        bookImage = bookImage.substring(12);

        if (!(Utils.isBlank(title) && Utils.isBlank(author))) {
            alert("Fill \"Title\" and \"Author\" fields to add a new book");
        } else {
        var bookId = BooksStore.length + 1;
        var historyId = NotificationsStore.length + 1;
        
        var newBook = new Book(bookId, title, author, bookImage);
        BooksStore.push(newBook);

        NotificationsController.addNotification("You added <b>" +
                title + "</b> by <b>" + author + "</b> to your <b>Library</b>");
        alert("Book \"" + author + " - " + title + "\" has been added!");
        window.document.querySelector("#add_image_label").style = "";
        window.document.querySelector("#loaded_image").style = "";
        window.document.querySelector("#add_book_title").value = "";
        window.document.querySelector("#add_book_author").value = "";
        var activeCategory = window.document.getElementsByClassName("activeCategory");
        if (document.getElementById("all_books") == activeCategory[0]) {
            BooksView.allBooks();
            }
        }
        
        return true;
    }


    return {
        star: updateRating,
        addBook: addBook,
        search: search,
        mostPopular: mostPopular
    };
} (BooksStore, Utils, NotificationsStore, Book));