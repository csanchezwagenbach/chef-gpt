$(".suggestion-card").click(function(event){
    let element = event.target;
    console.log(element);
    let parentCard = $(element).parents(".card")
    let suggestionId = $(parentCard).attr("data-number")
    
    if(suggestionId) {
        document.location.replace(`/suggestion/${suggestionId}`)
    }
});

//Functionality adding click element navigation to cards rendered on a user's dashboard. Suggestion ID's are hidden within the data-number attribute of a card, then grabbed from there and placed into the URL where the user is directed.
