console.log("HELLO")

var menuJson = [{
    id: "d2qw13",
    title: "KUKURUDZA",
    description: "KUKURUDZA",
    category: "SALAT",
    price: 47,
    removed: false,
    reasonForDeletion: ""
}, {
    id: "d23w13",
    title: "KUKURUDZA1",
    description: "KUKURUDZA1",
    category: "SALAT",
    price: 27,
    removed: false,
    reasonForDeletion: ""
}, {
    id: "d2rew13",
    title: "KUKURUDZA2",
    description: "KUKURUDZA",
    category: "SALAT",
    price: 17,
    removed: false,
    reasonForDeletion: ""
}];

generateMenu();

function clearList() {
    var ul = document.getElementById("ulMenu");
    ul.innerHTML = "";
}

function generateMenu() {
    clearList();
    for (let index = 0; index < menuJson.length; index++) {
        addItemToMenu(menuJson[index].title, menuJson[index].description, menuJson[index].category, menuJson[index].price, menuJson[index].id, menuJson[index].removed, false);
    }
    console.log(makeid());
}

function sendParams() {
    var title = document.getElementById("Title").value;
    var description = document.getElementById("Description").value;
    var category = document.getElementById("Category").value;
    var price = document.getElementById("Price").value;

    if (title == "" | description == "" | category == "" | price == "") {
        alert("There are empty fields")
        return;
    }
    addItemToMenu(title, description, category, price, makeid(), false, true);
}

function addItemToMenu(title, description, category, price, id, removed, isNew) {

    if (isNew) {
        var newItem = {};
        newItem.id = id;
        newItem.title = title;
        newItem.description = description;
        newItem.category = category;
        newItem.price = price;
        newItem.removed = false;
        newItem.reasonForDeletion = "";
        menuJson.push(newItem);

    }

    var ul = document.getElementById("ulMenu");
    var divCard = document.createElement("DIV");
    var divCardBody = document.createElement("DIV");
    var divCardFooter = document.createElement("DIV");
    var divPrice = document.createElement("DIV");
    var deleteButton = document.createElement("BUTTON");
    var returnButton = document.createElement("BUTTON");
    var textArea = document.createElement("textarea");


    deleteButton.id = id;

    deleteButton.addEventListener("click", function () {
        deleteItem(deleteButton.id, textArea.value);
    }, );

    returnButton.addEventListener("click", function () {
        returnItem(deleteButton.id);
    }, );

    textArea.className = "form-control";
    deleteButton.className = "btn btn-danger";
    returnButton.className = "btn btn-success";

    divPrice.className = "badge badge-primary text-wrap";
    divCardFooter.className = "card-footer text-muted";

    if (removed) {
        divCard.className = "card text-center bg-warning mb-3";
    } else {
        divCard.className = "card text-center";
    }
    divCardBody.className = "card-body";
    var h5 = document.createElement("H5");
    var h6 = document.createElement("H6");
    var p = document.createElement("P");

    p.className = "card-text";
    h5.className = "card-title";
    h5.className = "card-subtitle mb-2 text-muted";
    h5.innerHTML = title;
    p.innerHTML = description;
    h6.innerHTML = category;
    divPrice.innerHTML = price + " $ ";
    deleteButton.innerHTML = "Delete";
    returnButton.innerHTML = "Return";

    if (removed) {
        divCardFooter.appendChild(returnButton);
    } else {
        divCardFooter.appendChild(deleteButton);
        divCardFooter.appendChild(textArea);
    }
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(h6);
    divCardBody.appendChild(divPrice);
    divCardBody.appendChild(divCardFooter);
    ul.appendChild(divCard);
}

function deleteItem(id, reasonForDeletion) {
    if (reasonForDeletion == "") {
        alert("No reason for deletion");
        return;
    }
    for (let index = 0; index < menuJson.length; index++) {
        if (menuJson[index].id == id) {
            menuJson[index].removed = true;
            menuJson[index].reasonForDeletion = reasonForDeletion;
        }
    }
    generateMenu();

}

function returnItem(id) {

    for (let index = 0; index < menuJson.length; index++) {
        if (menuJson[index].id == id) {
            menuJson[index].removed = false;
            menuJson[index].reasonForDeletion = "";
        }
    }
    generateMenu();

}