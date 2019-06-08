function showTables(countPlace, countTables) {
    var div = document.getElementById(countPlace);
    div.innerHTML = "";
    for (let index = 0; index < countTables; ++index) {
        var id = makeid();
        var button = document.createElement("button");
        button.id = id;

        button.addEventListener("click", function () {
            makeOrder(this.id, countPlace);
        }, );
        button.dataset.toggle = "modal"
        button.dataset.target = "#exampleModal"

        button.className = "btn btn-secondary";
        button.innerHTML = index + 1 + "nd Tables";
        div.appendChild(button);
    }

}

function makeOrder(id, countPlace) {
    console.log(id)
    var divModalButtons = document.getElementById("modalButtons");
    divModalButtons.innerHTML = "";

    var n = document.createElement("button");
    var o = document.createElement("button");
    var i = document.createElement("button");

    n.className = "btn btn-success btn-lg btn-block";
    o.className = "btn btn-danger btn-lg btn-block";
    i.className = "btn btn-warning btn-lg btn-block";

    n.innerHTML = "направена";
    o.innerHTML = "отказана";
    i.innerHTML = "изпълнена";

    n.addEventListener("click", function () {
        setStatus(id, "btn btn-success");
    }, );

    o.addEventListener("click", function () {
        setStatus(id, "btn btn-danger");
    }, );

    i.addEventListener("click", function () {
        setStatus(id, "btn btn-warning");
    }, );
    divModalButtons.appendChild(n);
    divModalButtons.appendChild(o);
    divModalButtons.appendChild(i);
}

function setStatus(id, className) {
    var button = document.getElementById(id);
    button.className = className;

}