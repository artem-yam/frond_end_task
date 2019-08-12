let Utils = function () {

    function setElementProperty(element, property, value) {
        element[property] = value;
    }

    function resetInnerHTML(element) {
        setElementProperty(element, "innerHTML", "");
    }

    function resetValue(element) {
        setElementProperty(element, "value", "");
    }

    return {
        resetInnerHTML,
        resetValue,
    }

}();

