let Main = (function () {
    "use strict";

    function pageLoad() {
        let notificationsModel = new NotificationsModel(
            new NotificationsStorage());
        let notificationsController = new NotificationsController(
            notificationsModel);
        let notificationsView = new NotificationsView(notificationsController,
            notificationsModel);

        let booksModel = new BooksModel(new BooksStorage(),
            new AvailableTags());
        let booksController = new BooksController(booksModel);
        let booksView = new BooksView(booksController, booksModel,
            notificationsView);

        booksView.browsePage();
        notificationsView.loadHistoryBar();

        return booksView;
    }

    window.addEventListener("load", pageLoad);
}());