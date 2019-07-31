var NotificationView = (function (NotificationsController, NotificationsStore) {
    "use strict";

    //Создаём блока сообщения-истории
    function createBlock(id, text, date) {
        var history = window.document.querySelector(".history_block");
        var day = date.day;
        var month = date.month;
        var year = date.year;
        var hour = date.hour;
        var minutes = date.minutes;
        var timeHistory = NotificationsController.generateTime(day, month, year, hour, minutes);

        var code = "<div class=\"history_log\">" + 
            "<div class=\"history_pic\"></div>" + 
            "<div class=\"history_text\">" + text +
            "<p><span>" + timeHistory + 
            " ago</span></div></div>";
        history.innerHTML = code + history.innerHTML;
    }

     //Загружаем историю
    function loadHistory() {
        window.document.querySelector(".history_block").innerHTML = "";
        var i = 0;
        if (NotificationsStore.length > 5) {
            i = NotificationsStore.length - 5;
        }
        while (i<NotificationsStore.length) {
            var msg = NotificationsStore[i];
            createBlock(
                msg["id"],
                msg["text"],
                msg["date"]
            );
            i++;
        }
    }

    return {
        createBlock: createBlock,
        loadHistory: loadHistory
    };

} (NotificationsController, NotificationsStore));