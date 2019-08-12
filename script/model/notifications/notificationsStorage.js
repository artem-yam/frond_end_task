function NotificationsStorage() {
    "use strict";

    return [
        new Notification(1,
            ["Fight Club", "Chuck Palahniuk", "Must Read Titles"],
            notificationType.ADD_BOOK, new Date(2019, 0, 1)),
        new Notification(2,
            ["The Trial", "Franz Kafka", "Must Read Titles"],
            notificationType.ADD_BOOK, new Date(2019, 0, 1)),
    ];
}