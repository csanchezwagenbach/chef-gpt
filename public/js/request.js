const ingredientInput = document.querySelector("#ingredient-input");
const addIngredientButton = document.querySelector("#add-ingredient");
const ingredientsList = document.querySelector("#ingredient-list");

const restrictionInput = document.querySelector("#restriction-input");
const addRestrictionButton = document.querySelector("#add-restriction");
const restrictionsList = document.querySelector("#restriction-list");

const confirmIngredientsList = document.querySelector(
  "#confirm-ingredient-list"
);
const confirmRestrictionList = document.querySelector(
  "#confirm-restriction-list"
);
const confirmedDetails = document.querySelector("#confirm-details");

const timeCheck = document.querySelector("#time-constraint");
const minutesToCook = document.querySelector("#minutes");

const groceryStore = document.querySelector("#grocery-store");

const generateConfirmationButton = document.querySelector("#send-button");

const yesChef = document.querySelector("#yes-chef");

let ingredients = [];
let restrictions = [];
let details = [];
let detailsToConfirm = "";

function addIngredient() {
  let ingredient = ingredientInput.value;
  if (!ingredient) {
    return;
  }
  ingredients.push(ingredient);
  ingredientsList.innerHTML = "";
  ingredients.forEach((ingredient) => {
    let listItem = document.createElement("li");
    listItem.textContent = ingredient;
    ingredientsList.append(listItem);
    listItem.innerHTML +=
      '<span onclick="deleteIngredient(this)" style="float:right;cursor:pointer;">X</span>';
  });
}

function deleteIngredient(ingredient) {
  for (let i = 0; i < ingredientsList.childElementCount; i++) {
    if (ingredientsList.children[i] === ingredient.parentElement) {
      ingredients.splice(i, 1);
    }
  }
  ingredientInput.value = "";
  ingredient.parentElement.remove();
}

function addRestriction() {
  let restriction = restrictionInput.value;
  let restrictionId = restrictionInput.getAttribute("data-number");
  if (!restriction) {
    return;
  }
  restrictions.push(restriction);
  restrictionsList.innerHTML = "";
  restrictions.forEach((restriction) => {
    let listItem = document.createElement("li");
    listItem.textContent = restriction;
    listItem.setAttribute("data-number", restrictionId);
    restrictionsList.append(listItem);
    listItem.innerHTML +=
      '<span onclick="deleteRestriction(this)" style="float:right;cursor:pointer;">X</span>';
  });
}

function deleteRestriction(restriction) {
  for (let i = 0; i < restrictionsList.childElementCount; i++) {
    if (restrictionsList.children[i] === restriction.parentElement) {
      restrictions.splice(i, 1);
    }
  }
  restriction.parentElement.remove();
}

function confirmIngredients() {
  confirmIngredients.innerHTML = "";
  ingredients.forEach((ingredient) => {
    let listItem = document.createElement("li");
    listItem.textContent = ingredient;
    confirmIngredientsList.append(listItem);
  });
}

function confirmRestrictions() {
  restrictions.forEach((restriction) => {
    let listItem = document.createElement("li");
    listItem.textContent = restriction;
    confirmRestrictionList.append(listItem);
  });
}

function gatherDetails() {
  if (timeCheck.checked) {
    details.push("I can only cook for " + minutesToCook.value + " minutes.");
  }
  if (groceryStore.checked) {
    details.push("I'll be going by the grocery store.");
  }
  detailsToConfirm = details.join(" ");
  console.log(detailsToConfirm);
}

function confirmDetails() {
  let confirmations = document.createElement("p");
  confirmations.textContent = detailsToConfirm;
  confirmedDetails.append(confirmations);
}

function generateConfirmations() {
  confirmIngredients();
  confirmRestrictions();
  gatherDetails();
  confirmDetails();
}

async function sendRequest() {
  const response = await fetch(`/makesuggestion`, {
    method: "POST",
    body: JSON.stringify({ ingredients, restrictions, detailsToConfirm }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const text = await response.json();
  console.log(text.suggestion);
  const suggestion = encodeURI(text.suggestion).toString();
  document.location.replace(`/newsuggestion?suggestion=${suggestion}`);
}

addIngredientButton.addEventListener("click", addIngredient);

addRestrictionButton.addEventListener("click", addRestriction);

generateConfirmationButton.addEventListener("click", generateConfirmations);

yesChef.addEventListener("click", sendRequest);
