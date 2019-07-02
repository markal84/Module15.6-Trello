var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id); //About this feature we will tell later
    },
    element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
    var name = prompt('Enter a column name'); // name of table
    var data = new FormData(); 
    data.append('name', name);
    
    var prefix = "https://cors-anywhere.herokuapp.com/";

    fetch(prefix + baseUrl + '/column', { //in case of problems add prefix var
        method: 'POST', // send data to server
        headers: myHeaders,
        body: data,
      })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        var column = new Column(resp.id, name);
        board.addColumn(column);
      });
  });
	
function initSortable(id) {
  	var el = document.getElementById(id);
  	var sortable = Sortable.create(el, {
    	group: 'kanban',
    	sort: true
  	});
}