let notificationsStorage = (function (notification) {
    "use strict";

    return [
        new notification(1, "You added <b>Fight Club</b> by <b>Chuck Palahniuk</b> to your " +
            "<b>Must Read Titles</b>", new Date(2019, 0, 1)),
        new notification(2, "You added <b>The Trial</b> by <b>Franz Kafka</b> to your " +
            "<b>Must Read Titles</b>", new Date(2019, 0, 1)),
    ];
}(notification));