//Главный модуль
var Main = (function (Utils, BooksView, NotificationView, BooksController) {
    "use strict";

    //Обновление информации
    function pageLoad() {
        //Обновляем дату
        Utils.updateDate();
        //Перезагружаем библиотеку и историю
        BooksView.allBooks();
        NotificationView.loadHistory();
     }

    //Начало
    window.document.addEventListener("load",pageLoad());

    return {
        pageLoad: pageLoad
    };
} (Utils, BooksView, NotificationView, BooksController));