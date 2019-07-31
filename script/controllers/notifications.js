var NotificationsController = (function (Utils, Notification, NotificationsStore) {
    "use strict";

    //Генерируем строчку времени
    function generateTime(day, month, year, hour, minutes) {
        var diffYear = Utils.updateDate().nowYear - year;
        var diffMonth = Utils.updateDate().nowMonth - month;
        var diffDay = Utils.updateDate().nowDay - day;
        var diffHour = Utils.updateDate().nowHour - hour;
        var diffMinutes = Utils.updateDate().nowMinutes - minutes;


        if (diffYear > 0) {
            return diffYear + " years";
        } else if (diffMonth > 0) {
            return diffMonth + " months";
        } else if (diffDay > 0) {
            return diffDay + " days";
        } else if (diffHour > 0) {
            return diffHour + " hours";
        } else if (diffMinutes > 0) {
            return diffMinutes + " minutes";
        } else {
            return "less a minute";
        }
    }

    function addNotification(text) {
        var id = NotificationsStore.length + 1;
        var newNotify = new Notification(id, text);
        NotificationsStore.push(newNotify);  
        NotificationView.loadHistory();
    }

    return {
        addNotification: addNotification,
        generateTime: generateTime
    };
} (Utils, Notification, NotificationsStore));