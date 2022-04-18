function getMessage() {
    let message = document.getElementById("txtMessage").value;
    displayMessage(message);
}


function displayMessage(message) {

    // let item = `<li class="list-group-item">${message}</li>`;

    // getting ol element from the page
    element = document.getElementById("results");

    // create a new li element
    let item = document.createElement("li");
    //add class to the element
    item.classList.add("list-group-item");
    item.classList.add("messageClass");

    //set the message for the li element
    item.innerHTML = message;
    // add new item to list
    element.appendChild(item);


    // element.insertAdjacentHTML("beforeend", item);
    let clearForm = document.getElementById("txtMessage");
    clearForm.innerHTML = "";
}