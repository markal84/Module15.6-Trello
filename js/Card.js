// KLASA KANBAN CARD
function Card(id, name) {
    var self = this;

    this.id = id;
    this.description = name || 'no name given';
    this.element = generateTemplate('card-template', { description: this.name }, 'li');

    this.element.querySelector('.card').addEventListener('click', function (event) {
      event.stopPropagation();

      if (event.target.classList.contains('btn-delete')) {
            self.removeCard();
      }
    });
}
Card.prototype = {
  removeCard: function() {
    var self = this;
    var prefix = "https://cors-anywhere.herokuapp.com/";

    fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders }) // in case of problems add prefix var
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      })
  }
}