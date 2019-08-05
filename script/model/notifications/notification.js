let Notification = (function () {
    "use strict";

    function Notification(id, text, date) {
        this.id = id;
        this.text = text;

        this.date = date || new Date();
    }

    return Notification;
}());

