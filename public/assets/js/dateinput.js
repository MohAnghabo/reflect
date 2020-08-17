document.getElementById("dateInput").addEventListener("change", function () {
    var input = this.value;
    var dataArray = input.split('-');
    document.getElementById('year').value = dataArray[0];
    document.getElementById('month').value = dataArray[1];
    document.getElementById('day').value = dataArray[2];
});

myID = document.getElementById("toolbar-override");

var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 800) {
        myID.style.display = "none"
    } else {
        myID.style.display = "block"
    }
};

window.addEventListener("scroll", myScrollFunc);