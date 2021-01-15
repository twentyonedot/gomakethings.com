//
// Variables
//

// DOM elements
var flip = document.querySelector('#flip')
var messsage = document.querySelector('#message')

// Cards
var cardVals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'K', 'Q', 'A']
var cardSuits = ['♣', '♥', '♠', '◆']
var deck = []
var currentCard, warStack

// Players
var p1 = {
	elem: document.querySelector('#player1'),
	id: '1',
}

var p2 = {
	elem: document.querySelector('#player2'),
	id: '2',
}

//
// Methods
//

/**
 * Create the deck of cards from the values and suits
 */
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
 * Update the number of wins for a player
 * @param  {Node}    player The player element in the UI
 * @param  {Integer} wins   Their number of wins
 */
function updateWins(player) {
	player.elem.textContent = player.wins
}

/**
 * Reset the player stats
 * @param  {Object} player The player object
 * @param  {Array}  deck   The player's deck of cards
 */
function resetPlayer(player, deck) {
	player.deck = deck
	player.wins = 0
	updateWins(player)
}

/**
 * Update player wins
 * @param  {Object} player The player object
 */
function updatePlayer(player) {
	player.wins += warStack + 1
	updateWins(player)
	warStack = 0
	return `Player ${player.id} wins this round.`
}

/**
 * Setup the game
 */
function startGame() {
	message.textContent = ''
	shuffle(deck)
	resetPlayer(p1, deck.slice(0, deck.length / 2))
	resetPlayer(p2, deck.slice(deck.length / 2))
	currentCard = 0
	warStack = 0
}

/**
 * Check who won the round
 * @param  {Object} p1Card Player 1's card data
 * @param  {Object} p2Card Player 2's card data
 * @return {String}        The winner
 */
function checkWinner(p1Card, p2Card) {
	// Get the indexes
	var p1Index = cardVals.indexOf(p1Card.val)
	var p2Index = cardVals.indexOf(p2Card.val)

	// If player 1 wins
	if (p1Index > p2Index) {
		return updatePlayer(p1)
	}

	// If player 2 wins
	if (p2Index > p1Index) {
		return updatePlayer(p2)
	}

	// If it's a war, increase stack
	warStack++

	// Check if it's the last card
	if (currentCard + warStack > 25) {
		currentCard++
		return 'Stalemate.'
	}

	// Otherwise, go to war
	return 'Go to war! Flip again.'
}

/**
 * Check if someone won the entire game
 */
function checkVictor() {
	// If there's still cards in the deck, do nothing
	if (currentCard < 26) return

	// Announce the winner
	if (p1.wins > p2.wins) {
		alert('Player 1 wins the game!')
	} else if (p2.wins > p1.wins) {
		alert('Player 2 wins the game!')
	} else if (p1.wins === p2.wins) {
		alert(`It's a tie...`)
	}

	// Reset the game
	startGame()
}

/**
 * Handle flipping the cards
 */
function flipHandler() {
	// Get the current card for each player
	var p1Card = p1.deck[currentCard]
	var p2Card = p2.deck[currentCard]
	var winner = checkWinner(p1Card, p2Card)

	// Advance the cards
	currentCard++

	// Show the message
	message.textContent = `Player 1 flips a ${
		p1Card.val + p1Card.suit
	}. Player 2 flips a ${p2Card.val + p2Card.suit}. ${winner}`

	// Check if someone won the game
	checkVictor()
}

//
// Inits & Event Listeners
//

createDeck()
startGame()
flip.addEventListener('click', flipHandler)
