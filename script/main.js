(function () {
    "use strict";

    function pageLoad() {
        let notificationsModel = new NotificationsModel(
            new NotificationsStorage());
        let booksModel = new BooksModel(new BooksStorage(),
            new AvailableTags());

        let controller = new Controller(booksModel, notificationsModel);

        let notificationsView = new NotificationsView(controller,
            notificationsModel);
        let booksView = new BooksView(controller, booksModel);

        booksView.browsePage();
        notificationsView.loadHistoryBar();
    }

    window.addEventListener("load", pageLoad);
}());