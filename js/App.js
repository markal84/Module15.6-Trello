var baseUrl = 'https://kodilla.com/pl/bootcamp-api'; // for API
var myHeaders = { // for API - requied to connect to API
  'X-Client-Id': '4156',
  'X-Auth-Token': '835024f34ab54b39fd2a1fb9215e5af9'
};
var prefix = "https://cors-anywhere.herokuapp.com/"; // prevents CORS error

// Main function

fetch(prefix + baseUrl + '/board', { headers: myHeaders }) // function asking server about board object
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) { // after returning response 
    setupColumns(resp.columns); // start setupColumns function
  });

function setupColumns(columns) { 
	columns.forEach(function(column) { // for each column
		var col = new Column(column.id, column.name); // create new column with name and id
		board.addColumn(col);	// add colum to board object
		setupCards(col, column.cards);  // start setupCards function
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) { // for evry card
    var cardObj = new Card(card.id, card.name); // create card object
  	col.addCard(cardObj); // add card to column object
	});
}

/*function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	var str = '', i;
	for (i = 0; i < 10; i++) {
	  str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
} */

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

/*// TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
board.createColumn(todoColumn);
board.createColumn(doingColumn);
board.createColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// DODAWANIE KART DO KOLUMN
todoColumn.createCard(card1);
doingColumn.createCard(card2); */