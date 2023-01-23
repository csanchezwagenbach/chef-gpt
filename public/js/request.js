let ingredientInput = document.querySelector("#ingredient-input");
let addIngredientButton = document.querySelector("#add-ingredient");
let ingredientsList = document.querySelector("#ingredient-list");

let restrictionInput = document.querySelector("#restriction-input");
let addRestrictionButton = document.querySelector("#add-restriction");
let restrictionsList = document.querySelector("#restriction-list");

let sendButton = document.querySelector("#send-button");

let ingredients = [];
let restrictions = [];

function addIngredient () {
    let ingredient = ingredientInput.value;
    if (!ingredient) {
        return;
    }
    ingredients.push(ingredient);
    ingredientsList.innerHTML = "";
    ingredients.forEach(ingredient => {
        let listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientsList.append(listItem);
        listItem.innerHTML +='<span onclick="deleteIngredient(this)" style="float:right;cursor:pointer;">X</span>';
    });
}

function deleteIngredient (ingredient) {
    for (let i = 0; i < ingredientsList.childElementCount; i++) {
        if (ingredientsList.children[i] === ingredient.parentElement) {
            ingredients.splice(i, 1);
        }
    }
    ingredientInput.value = "";
    ingredient.parentElement.remove();
}

function addRestriction () {
    let restriction = restrictionInput.value;
    let restrictionId = restrictionInput.getAttribute("data-number");
    if (!restriction) {
        return;
    }
    restrictions.push(restriction);
    restrictionsList.innerHTML = "";
    restrictions.forEach(restriction => {
        let listItem = document.createElement("li");
        listItem.textContent = restriction;
        listItem.setAttribute("data-number", restrictionId)
        restrictionsList.append(listItem);
        listItem.innerHTML += '<span onclick="deleteRestriction(this)" style="float:right;cursor:pointer;">X</span>';
    });
}

function deleteRestriction (restriction) {
    for (let i = 0; i < restrictionsList.childElementCount; i++) {
        if (restrictionsList.children[i] === restriction.parentElement) {
            restrictions.splice(i, 1);
        }
    }
    restriction.parentElement.remove();
}



addIngredientButton.addEventListener("click", addIngredient);
addRestrictionButton.addEventListener("click", addRestriction);