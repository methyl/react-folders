'use strict';

var Item = require('./item');

var Folders = React.createClass({
  getInitialState: function(){
    return {
      items: [
        {
          id: 1,
          name: 'Sample.txt'
        },
        {
          id: 2,
          name: 'Other.doc'
        }
      ]
    }
  },

  render: function() {
    return <table>
      {this.tableHeader()}
      {this.items()}
    </table>;
  },

  items: function() {
    var _this = this;
    return this.state.items.map(function(item) {
      var handleClick = function() {
        return _this.handleItemClick(item);
      };

      return <Item key={item.id} name={item.name} checked={item.checked} onClick={handleClick} />;
    });
  },

  tableHeader: function() {
    var disableButtons = !this.isAnyItemSelected();
    return <tr>
      <th><input type="checkbox" checked={this.areAllItemsSelected()} onChange={this.handleSelectAllChange} /></th>
      <th><button disabled={disableButtons}>Rename</button></th>
      <th><button disabled={disableButtons}>Delete</button></th>
      <th><button disabled={disableButtons}>New folder</button></th>
    </tr>;
  },

  toggleAll: function() {
    var checkedValue = !this.areAllItemsSelected();

    var items = this.state.items.map(function(item) {
      item.checked = checkedValue;
      return item;
    });

    this.setState({ items: items });
  },

  toggleItem: function(selectedItem) {
    var items = this.state.items.map(function(item) { 
      if (item.id === selectedItem.id) {
        item.checked = !item.checked;
      }
      return item;
    });

    this.setState({ items: items });
  },

  areAllItemsSelected: function() {
    return this.state.items.reduce(function(bool, item){
      return bool && item.checked;
    }, true);
  },

  isAnyItemSelected: function() {
    return this.state.items.reduce(function(bool, item){
      return bool || item.checked;
    }, false);
  },

  handleSelectAllChange: function() {
    this.toggleAll();
  },

  handleItemClick: function(item) {
    this.toggleItem(item);
  }
});

module.exports = Folders;
