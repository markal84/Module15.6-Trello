/*function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });
}
    this.element.querySelector('.column').addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
            self.removeColumn();
    }
  
    if (event.target.classList.contains('add-card')) {
        var cardName = prompt("Enter the name of the card"); // create card name by prompt 
        event.preventDefault(); // prevent form default action 
        
        var data = new FormData(); //The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method
        data.append('name', cardName); //appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
        data.append('bootcamp_kanban_column_id', self.id);
        
        fetch(baseUrl + '/card', { // in case of problems add prefix var
            method: 'POST', // send data to server
            headers: myHeaders,
            body: data,
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(resp) {
            var card = new Card(resp.id, cardName);
            self.addCard(card);
          });
    }

  Column.prototype = {
    addCard: function(card) {
      this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function() {
      var self = this;
      fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders }) // in case of problems create prefix var 
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
    }
  } */
  
  function Column(id, name) {
  	var self = this;

  	this.id = id;
  	this.name = name || 'No name';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  	this.element.querySelector('.column').addEventListener('click', function (event) {
	    if (event.target.classList.contains('btn-delete')) {
	      	self.removeColumn();
	    }
	
	    if (event.target.classList.contains('add-card')) {
        var cardName = prompt("Enter the name of the card"); // create card name by prompt 
        event.preventDefault(); // prevent form default action 
        
        var data = new FormData(); //The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method
        data.append('name', cardName); //appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
        data.append('bootcamp_kanban_column_id', self.id);
        
        fetch(baseUrl + '/card', { // in case of problems add prefix var
            method: 'POST', // send data to server
            headers: myHeaders,
            body: data,
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(resp) {
            var card = new Card(resp.id, cardName);
            self.addCard(card);
          });
	    }
	});
}

Column.prototype = {
	addCard: function(card) {
	  this.element.querySelector('ul').appendChild(card.element);
	},
	removeColumn: function() {
    var self = this;
    var prefix = "https://cors-anywhere.herokuapp.com/";
      fetch(prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders }) // in case of problems create prefix var 
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
	}
};
