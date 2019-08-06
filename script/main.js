(function (booksView, notificationView) {
    "use strict";

    (function pageLoad() {
        booksView.browsePage();
        notificationView.loadHistoryBar();
    })();


}(booksView, notificationsView));