let NotificationsView = (function (controller, model) {
    "use strict";

    function createHistoryBarBlock(notification) {
        let history = window.document.querySelector(".history_block");
        let timeHistory = controller.getFlowedTime(notification.date);

        let code = "<div class=\"history_log\">" +
            "<div class=\"history_pic\"></div>" +
            "<div class=\"history_text\"><p>" + notification.text +
            "</p>" + timeHistory + " ago</div></div>";
        history.innerHTML = code + history.innerHTML;
    }

    function loadHistoryBar() {
        window.document.querySelector(".history_block").innerHTML = "";
        let i = 0;
        if (model.storage.length > 5) {
            i = model.storage.length - 5;
        }

        for (i; i < model.storage.length; i++) {
            let msg = model.storage[i];
            createHistoryBarBlock(msg);
        }
    }

    function loadHistoryPage() {
        window.document.querySelector(".history_content").innerHTML = "";
        for (let elem of window.document.querySelectorAll(".nav_menu a")) {
            elem.classList.remove("active")
        }
        window.document.querySelector(".nav_menu .history").classList.add("active");
        for (let mainDiv of  window.document.querySelectorAll(".main > div:not(:last-of-type)")) {
            mainDiv.style = 'display: none';
        }

        let mainCode = "";
        for (let i = 0; i < model.storage.length; i++) {
            mainCode += "<div class=\"history_log\"><p>" +
                model.storage[i].text + "</p>";

            let date = model.storage[i].date;
            let dateString = date.getFullYear() + "." + (date.getMonth() + 1) +
                "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +
                ":" + date.getSeconds();

            mainCode += dateString + "</div>";
        }
        window.document.querySelector(".history_content").innerHTML += mainCode;

    }

    function addSearchNotification() {
        let searchText = window.document.querySelector("#search").value;
        let activeCategory = window.document.querySelector(".main_sort .sort .active");
        controller.addNotification(
            "You searched <b>" + searchText +
            "</b> in <b>" + activeCategory.innerHTML + "</b>");
        loadHistoryBar();
    }

    function addNotification(text) {
        controller.addNotification(text);
        loadHistoryBar();
    }

    window.document.querySelector(".nav_menu .history").addEventListener("click", function () {
        loadHistoryPage();
    });


    window.document.querySelector("#search").addEventListener("change", function () {
        addSearchNotification();
    });


    return {
        loadHistoryBar,
        loadHistoryPage,
        addNotification
    };
}(NotificationsController, NotificationsModel));