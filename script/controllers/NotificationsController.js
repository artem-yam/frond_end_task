let notificationsController = (function (model) {
    "use strict";

    function getFlowedTime(date) {
        return model.getFlowedTime(date);
    }

    function addNotification(text) {
        model.addNotification(text);
    }

    return {
        addNotification,
        getFlowedTime
    };
}(notificationsModel));