let NotificationsModel = (function (notification, storage) {

    function getFlowedTime(date) {
        let diffYear = new Date().getFullYear() - date.getFullYear();
        let diffMonth = new Date().getMonth() - date.getMonth();
        if (diffMonth !== 0) {
            diffMonth++;
        }
        let diffDay = new Date().getDate() - date.getDate();
        let diffHour = new Date().getHours() - date.getHours();
        let diffMinutes = new Date().getMinutes() - date.getMinutes();
        let result = "";

        if (diffYear > 0) {
            result = diffYear + " years";
        } else if (diffMonth > 0) {
            result = diffMonth + " months";
        } else if (diffDay > 0) {
            result = diffDay + " days";
        } else if (diffHour > 0) {
            result = diffHour + " hours";
        } else if (diffMinutes > 0) {
            result = diffMinutes + " minutes";
        } else {
            result = "less a minute";
        }

        return result;
    }

    function addNotification(text) {
        let id = storage.length + 1;
        let newNotify = new notification(id, text);
        storage.push(newNotify);
    }


    return {
        getFlowedTime,
        addNotification,
        storage
    }
})(Notification, NotificationsStorage);