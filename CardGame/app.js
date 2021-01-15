/* Variables */
var flip = document.querySelector('#flip')
var message = document.querySelector('#message')
var p1 = document.querySelector('#player1')
var p2 = document.querySelector('#player2')

/* Cards */
var cardVals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
var cardSuits = ['♣', '♥', '♠', '◆']
var deck = []
var currentCard, p1Deck, p2Deck, p1Wins, p2Wins, warStack

/* Methods */

/* Create a deck of cards from the values and suits */
function createDeck() {
	cardVals.forEach(function (val) {
		cardSuits.forEach(function (suit) {
			var card = {
				val: val,
				suit: suit,
			}
			deck.push(card)
		})
	})
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
	var currentIndex = array.length
	var temporaryValue, randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

/**
 * @description Update the number of wins for a player
 * @param {Node} player
 * @param {Integer} wins
 */
function updateWins(player, wins) {
	player.textContent = wins
}

/* Setup the game */
function startGame() {
	message.textContent = ''
	shuffle(deck)
	p1Deck = deck.slice(0, deck.length / 2)
	p2Deck = deck.slice(deck.length / 2)
	currentCard = 0
	p1Wins = 0
	p2Wins = 0
	warStack = 0
	updateWins(p1, 0)
	updateWins(p2, 0)
}

/**
 *
 * @param {Object} p1Card [Player's 1 card data]
 * @param {Object} p2Card [Player's 1 card data]
 * @return {String}       [The Winner]
 */

function checkWinner(p1Card, p2Card) {
	/* Get Indexes */
	var p1Index = cardVals.indexOf(p1Card.val)
	var p2Index = cardVals.indexOf(p2Card.val)

	/* Get Winners */
	if (p1Index > p2Index) {
		p1Wins += warStack + 1
		updateWins(p1, p1Wins)
		warStack = 0
		return 'Player 1 wins this round'
	}
	if (p1Index < p2Index) {
		p2Wins += warStack + 1
		updateWins(p2, p2Wins)
		warStack = 0
		return 'Player 2 wins this round'
	}
	warStack++

	if (currentCard + warStack > 25) {
		currentCard++
		return 'Stalemate'
	}
	return `Go to war! Flip again.`
}

/**
 * @description - Check if someone won the entire game
 */
function checkVictor() {
	/* If there's still cards in the deck do nothing */
	if (currentCard < 26) return
	if (p1Wins > p2Wins) {
		alert('Player 1 wins the game!')
	} else if (p1Wins < p2Wins) {
		alert('Player 2 wins the game!')
	} else if (p1Wins == p2Wins) {
		alert("It's a tie....")
	}

	/* Restarting the game */
	startGame()
}

/* Handle flipping the cards */
function flipHandler() {
	/* Get the current card for each player */
	var p1Card = p1Deck[currentCard]
	var p2Card = p2Deck[currentCard]
	var winner = checkWinner(p1Card, p2Card)
	/* Advance the cards */
	currentCard++
	/* Show the message */
	message.textContent = `Player 1 flips a ${
		p1Card.val + p1Card.suit
	}. Player 2 flips a ${p2Card.val + p2Card.suit}. ${winner}`

	/* Check if someone won the game */
	checkVictor()
}

/* Inits and EventListeners */
createDeck()
startGame()
flip.addEventListener('click', flipHandler)
