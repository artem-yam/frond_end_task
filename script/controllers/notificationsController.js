function NotificationsController(model) {
    "use strict";

    let notificationsModel = model;

    function addNotification(text, type) {
        notificationsModel.addNotification(text, type);
    }

    return {
        addNotification
    };
}