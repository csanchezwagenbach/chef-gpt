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
const notQuite = document.querySelector("#not-quite");

const loader = document.querySelector("#loading");
const wholeForm = document.querySelector("#whole-form");
const main = document.querySelector("#main-container");
const confirmModal = document.querySelector("#confirmModal");

let ingredients = [];
let restrictions = [];
let details = [];
let detailsToConfirm = "";

// The JS above grabs references to all buttons and form inputs. All functions below represent functionality around capturing form input, formatting input and presenting it for confirmation, and sending all that data off as a POST request to controllers/homeRoutes

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
  ingredientInput.value = "";
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

// Functionality around dropping primary display and displaying bouncing chef loader

function displayLoading() {
  wholeForm.innerHTML = `<div class = "row align-items-center justify-content-center w-100 bg-white"> <img id="loading" src="images/chef.jpg" alt="Chef-GPT" class="col-12 display"> </div>`;
  bod.style.background="none";
}

function reload() {
  restrictions = [];
  ingredients = [];
  document.location.reload();
}

// Functioning sending off call to back end (where API is accessed) and redirecting user to the page holding their freshly generated suggestion. New suggestions are encoded within the URL where the user is sent upon receiving a successful response from the API.

async function sendRequest() {
  displayLoading();
  const response = await fetch(`/makesuggestion`, {
    method: "POST",
    body: JSON.stringify({ ingredients, restrictions, detailsToConfirm }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  restrictions = [];
  ingredients = [];
  const text = await response.json();
  const suggestion = encodeURI(text.suggestion).toString();
  document.location.replace(`/newsuggestion?suggestion=${suggestion}`);
}

addIngredientButton.addEventListener("click", addIngredient);

addRestrictionButton.addEventListener("click", addRestriction);

generateConfirmationButton.addEventListener("click", generateConfirmations);

yesChef.addEventListener("click", sendRequest);

notQuite.addEventListener("click", reload);
