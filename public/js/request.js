let ingredientInput = document.querySelector("#ingredient-input");
let addIngredientButton = document.querySelector("#add-ingredient");
let ingredientsList = document.querySelector("#ingredient-list");


let ingredients = [];

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
        ingredientsList.append(listItem)
        listItem.innerHTML +='<span onclick="deleteIngredient(this)" style="float:right;cursor:pointer;">X</span>';
    })
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

addIngredientButton.addEventListener("click", addIngredient);