const elForm = document.getElementById('form');
const elList = document.getElementById('list');
const clearAllButton = document.getElementById('clear-all');

let myData = JSON.parse(localStorage.getItem("myData")) || [];


myData.forEach((element) => {
    elList.innerHTML += createCard(element);
});


function createCard({ inputNameValue, inputEmailValue, inputAgeValue, id }) {
    return `
    <li>
        <h3>${inputNameValue}</h3>
        <mark>${inputEmailValue}</mark>
        <strong>${inputAgeValue}</strong>
        <button id="${id}">Delete</button>
    </li>
    `;
}


elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputNameValue = e.target["text"].value;
    const inputEmailValue = e.target["email"].value;
    const inputAgeValue = e.target["age"].value;
    const result = {
        inputNameValue,
        inputEmailValue,
        inputAgeValue,
        id: Date.now()
    };
    myData.push(result);
    e.target.reset();
    localStorage.setItem("myData", JSON.stringify(myData));
    elList.innerHTML += createCard(result);
});


document.addEventListener("click", (e) => {
    if (e.target.textContent === "Delete") {
        const updatedData = myData.filter((element) => element.id.toString() !== e.target.getAttribute("id"));
        myData = updatedData;
        elList.innerHTML = "";
        localStorage.setItem("myData", JSON.stringify(myData));

        myData.forEach((element) => {
            elList.innerHTML += createCard(element);
        });
    }
});


clearAllButton.addEventListener("click", () => {
    myData = [];
    localStorage.removeItem("myData");
    elList.innerHTML = "";
});
