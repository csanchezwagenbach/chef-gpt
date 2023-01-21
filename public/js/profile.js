var container = $(".container")

container.on("click", async function(event) {
    let element = event.target;
    let card = element.parents(".suggestion-card")
    let suggestionId = card.getAttribute("data-number");
    console.log(element);
    console.log(card);
    console.log(suggestionId);
    if (suggestionId) {
        document.location.replace(`/suggestion/${suggestionId}`)
    }
});