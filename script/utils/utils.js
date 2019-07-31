//Общие Функции
var Utils = (function() {
    "use strict";
    
    //Текущая дата
    function updateDate() {
        var nowDate = new Date();
        var nowHour = nowDate.getHours();
        var nowMinutes = nowDate.getMinutes();
        var nowDay = nowDate.getDate();
        var nowMonth = nowDate.getMonth();
        var nowYear = nowDate.getFullYear();

        return {
            nowDay: nowDay,
            nowMonth: nowMonth,
            nowYear: nowYear,
            nowHour: nowHour,
            nowMinutes: nowMinutes
        };
    }
    
    updateDate();

    //Пустая ли строка
    function isBlank(string) {
        string = string.replace(/\s{2,}/g, ' ');

        return string != ' ' && string != '';
    }

    return {
        updateDate: updateDate,
        isBlank: isBlank
    };
} ());