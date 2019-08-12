function NotificationsView(controller, model) {
    "use strict";

    const HISTORY_BAR_LENGTH = 5;

    let notificationsController = controller;
    let notificationsModel = model;

    function createHistoryBarBlock(notification) {

        let template = window.document.querySelector("#history_bar_template");
        let historyBar = window.document.querySelector(".history_block");

        let historyBlock = template.content.cloneNode(true);

        historyBlock.querySelector("p").innerHTML =
            formNotificationMessage(notification);
        historyBlock.querySelector(".history_text").innerHTML +=
            formTimeMessage(model.getFlowedTime(notification.date));

        historyBar.prepend(historyBlock);
    }

    function formNotificationMessage(notification) {
        let message = "";

        switch (notification.type) {
            case 'ADD_BOOK':
                message += "You added <b>" +
                    notification.text[0] + "</b> by <b>" +
                    notification.text[1] + "</b>";

                if (notification.text.length > 2) {
                    message += " to your <b>" + notification.text[2] + "</b>";
                }
                break;
            case 'SEARCH':
                message += "You searched <b>" +
                    notification.text[0] + "</b> in <b>" +
                    notification.text[1] + "</b>";
                break;
            case 'RATING':
                message += "You rated <b>" +
                    notification.text[0] + "</b> by <b>" +
                    notification.text[1] + "</b>" +
                    " with " + notification.text[2] + " stars";
                break;
            default:
                for (let string of notification.text) {
                    message += string + " ";
                }
        }

        return message;
    }

    function formTimeMessage(timeDiff) {
        let result = "";

        if (timeDiff.diffYear > 0) {
            result = timeDiff.diffYear + " years";
        } else if (timeDiff.diffMonth > 0) {
            result = timeDiff.diffMonth + " months";
        } else if (timeDiff.diffDay > 0) {
            result = timeDiff.diffDay + " days";
        } else if (timeDiff.diffHour > 0) {
            result = timeDiff.diffHour + " hours";
        } else if (timeDiff.diffMinutes > 0) {
            result = timeDiff.diffMinutes + " minutes";
        } else {
            result = "less a minute";
        }

        return result + " ago";
    }

    function loadHistoryBar() {
        window.document.querySelector(".history_block").innerHTML = "";
        let i = 0;
        if (notificationsModel.storage.length > HISTORY_BAR_LENGTH) {
            i = notificationsModel.storage.length - HISTORY_BAR_LENGTH;
        }

        for (i; i < notificationsModel.storage.length; i++) {
            let msg = notificationsModel.storage[i];
            createHistoryBarBlock(msg);
        }
    }

    function loadHistoryPage() {
        Utils.resetInnerHTML(window.document.querySelector(".history_content"));

        for (let elem of window.document.querySelectorAll(".nav_menu a")) {
            elem.classList.remove("active")
        }
        window.document.querySelector(".nav_menu .history").classList
            .add("active");

        for (let mainDiv of window.document.querySelectorAll(
            ".main > div:not(:last-of-type)")) {
            mainDiv.classList.remove("flex");
            mainDiv.classList.add("hidden");
        }

        let template = window.document.querySelector("#history_page_template");
        let historyPage = window.document.querySelector(".history_content");

        for (let i = 0; i < notificationsModel.storage.length; i++) {

            let historyBlock = template.content.cloneNode(true);

            historyBlock.querySelector("p").innerHTML =
                formNotificationMessage(notificationsModel.storage[i]);

            let date = notificationsModel.storage[i].date;
            let dateString = date.getFullYear() + "." + (date.getMonth() + 1) +
                "." + date.getDate() + " " + date.getHours() + ":" +
                date.getMinutes() +
                ":" + date.getSeconds();

            historyBlock.querySelector(".history_log").innerHTML +=
                dateString;

            historyPage.appendChild(historyBlock);
        }
    }

    function addSearchNotification() {
        let searchText = window.document.querySelector("#search").value;
        let activeCategory = window.document.querySelector(
            ".main_sort .sort .active");
        addNotification([searchText, activeCategory.innerHTML],
            notificationType.SEARCH);
    }

    function addNotification(text, type) {
        notificationsController.addNotification(text, type);
    }

    window.document.querySelector(".nav_menu .history")
        .addEventListener("click", function () {
            loadHistoryPage();
        });

    window.document.querySelector("#search")
        .addEventListener("input", function () {
            addSearchNotification();
        });

    model.onNotificationAdd.subscribe(loadHistoryBar);

    return {
        loadHistoryBar,
        loadHistoryPage,
        addNotification
    };
}