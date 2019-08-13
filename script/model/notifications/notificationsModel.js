function NotificationsModel(storage) {
    "use strict";

    let notificationStorage = storage;
    let onNotificationAdd = new EventEmitter();

    function getFlowedTime(date) {
        let diffYear = new Date().getFullYear() - date.getFullYear();
        let diffMonth = new Date().getMonth() - date.getMonth();
        if (diffMonth !== 0) {
            diffMonth++;
        }
        let diffDay = new Date().getDate() - date.getDate();
        let diffHour = new Date().getHours() - date.getHours();
        let diffMinutes = new Date().getMinutes() - date.getMinutes();

        return {
            diffYear,
            diffMonth,
            diffDay,
            diffHour,
            diffMinutes
        }
    }

    function addNotification(text, type) {
        let newNotify = new Notification(getNextId(), text, type);
        notificationStorage.push(newNotify);
        onNotificationAdd.notify();
    }

    function getNextId() {
        return notificationStorage.length + 1;
    }

    return {
        getFlowedTime,
        addNotification,
        storage: notificationStorage,
        onNotificationAdd
    }
}