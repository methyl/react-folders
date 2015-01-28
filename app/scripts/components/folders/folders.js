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
      var handleChange = function() {
        return _this.handleItemChange(item);
      };

      return <Item key={item.id} name={item.name} checked={item.checked} onChange={handleChange} />
    });
  },

  tableHeader: function() {
    return <tr>
      <th><input type="checkbox" checked={this.areAllItemsSelected()} onChange={this.handleSelectAllChange} /></th>
      <th>Rename</th>
      <th>Delete</th>
      <th>New folder</th>
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

  handleSelectAllChange: function() {
    this.toggleAll();
  },

  handleItemChange: function(item) {
    this.toggleItem(item);
  }
});

module.exports = Folders;
