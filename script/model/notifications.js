var Notification = (function (Utils) {
    "use strict;"

    function Notification(id, text, date) {
        this.id = id;
        this.text = text;

        this.date = date || Utils.updateDate();
    }

    return Notification;

} (Utils));

var NotificationsStore = (function (Notification) {
    "use strict";

    return [
        new Notification(1, "You added <b>Fight Club</b> by <b>Chuck Palahniuk</b> to your " +
            "<b>Must Read Titles</b>", { day: 20, month: 9, year: 2015, hour: 15, minutes: 20 }),
        new Notification(2, "You added <b>The Trial</b> by <b>Franz Kafka</b> to your " +
            "<b>Must Read Titles</b>", { day: 20, month: 9, year: 2015, hour: 15, minutes: 40 }),
    ];

} (Notification));