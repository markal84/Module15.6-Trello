document.addEventListener('DOMContentLoaded', function() { // here we will put the code of our application
    
    function randomString() { // generate a random strid for ID
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function generateTemplate(name, data, basicElement) { // mustache template generator
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
      
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
      
        return element;
      }

    function Column(name) { // column creator
        var self = this; // fix the problem with passing function as an argument
        this.id = randomString(); // generated random string
        this.name = name; // function parameter
        this.element = generateTemplate('column-template', { name: this.name });

        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
              self.removeColumn();
            }
          
            if (event.target.classList.contains('add-card')) {
              self.addCard(new Card(prompt("Enter the name of the card")));
            }
        });
    }
      
    Column.prototype = { // add card to column
        addCard: function(card) {
          this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function() {
          this.element.parentNode.removeChild(this.element);
        }
    };

    function Card(description) { // card creator
        var self = this;
      
        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description }, 'li');

        this.element.querySelector('.card').addEventListener('click', function (event) { // remove card on click 
            event.stopPropagation();
            if (event.target.classList.contains('btn-delete')) {
                self.removeCard();
            }
        });
    }
    Card.prototype = {
        removeCard: function() { // remove card
            this.element.parentNode.removeChild(this.element);
        }
    }

    var board = { // board object
        name: 'Kanban Board',
        addColumn: function(column) {
          this.element.appendChild(column.element);
          function initSortable(id) { // not working properly sortable plugin to move cards between columns
            var el = document.getElementById(id);
            var sortable = Sortable.create(el, {
              group: 'kanban',
              sort: true
            });
          }
          //initSortable(column.id);
        },
        element: document.querySelector('#board .column-container')
    };

    document.querySelector('#board .create-column').addEventListener('click', function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);


});