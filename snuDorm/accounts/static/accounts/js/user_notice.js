window.onload = function () {
    var check = document.getElementsByName("read");
    check.forEach(w => {
        if (w.innerHTML == "True") {
            var before = w.previousElementSibling;
            var child = before.previousElementSibling.firstElementChild;
            child.classList.add("nk-checked");
            before.previousElementSibling.classList.add("content-checked");
            before.firstElementChild.classList.add("date-checked");
        }
    });
};