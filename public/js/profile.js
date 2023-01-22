$(".suggestion-card").click(function(event){
    let element = event.target;
    console.log(element);
    let parentCard = $(element).parents(".card")
    let suggestionId = $(parentCard).attr("data-number")
    if(suggestionId) {
        document.location.replace(`/suggestion/${suggestionId}`)
    }
});
