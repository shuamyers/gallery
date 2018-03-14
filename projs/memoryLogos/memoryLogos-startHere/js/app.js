// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 12;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');


var gCards = getNumsForCards();
console.log(gCards)
render(gCards);

function render(cards) {
    var strHtmls = getCardsHtml(cards)
    document.querySelector('.board').innerHTML = strHtmls
}

function getCardsHtml(cards) {
    strHtml = ''
    cards.forEach(function (card) {
        strHtml += `
        <div class="card-wrapper">
            <div class="card" data-card="${card.id}" onclick="cardClicked(this)">
               <img  src="img/cards/back.png" >
               <div class="card-face">
                    <img  src="img/cards/${card.id}.png" >
                    <h2>${card.compyName}</h2>
               </div>
            </div>
        </div>        
        `
    });
    return strHtml
}




// This function is called whenever the user click a card
function cardClicked(elCard) {

    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    // Flip it
    elCard.classList.add('flipped');

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 1 second
        if (card1 !== card2) {
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
            }, 1000)

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPreviousCard = null;

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audioWin.play();
            }
        }
    }
}


function getNumsForCards() {
    return getCard(12)
        .concat(getCard(12))

}


function getCard(size) {
    var cards = [];
    var compyNames = ['Node Js', 'Fire Fox', 'Opera', 'Webpack', 'Angular', 'React', 'Vue', 'Java', 'Mongodb', 'Npm', 'Safari', 'Vs Code'];
    for (var i = 0; i < size; i++) {
        card = {
            id: i + 1,
            compyName: compyNames[i]
        }
        cards[i] = card;    
    }
    return cards
}