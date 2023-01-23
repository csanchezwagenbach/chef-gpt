let saveButton = document.querySelector("#save-button");

let titleInput = document.querySelector("#new-suggestion-title");
let contentInput = document.querySelector("#new-suggestion-content");

let name = titleInput.value;
let title = contentInput.value;

async function saveSuggestion() {
  if (!title) {
    return;
  }
  const response = await fetch(`/api/suggestions`, {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resolved = await response.json();
  console.log(resolved);
}

saveButton.addEventListener("click", saveSuggestion());
