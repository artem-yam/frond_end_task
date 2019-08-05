let Main = (function (BooksView, NotificationView) {
    "use strict";

    (function pageLoad() {
        BooksView.browsePage();
        NotificationView.loadHistoryBar();
    })();


}(BooksView, NotificationsView));