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
    return <div>
      <table>
        <tbody>
          {this.tableHeader()}
          {this.items()}
        </tbody>
      </table>
    </div>;
  },

  items: function() {
    var _this = this;
    return this.state.items.map(function(item) {
      var handleChange = function() {
        return _this.handleItemChange(item);
      };

      var handleCancelClick = function() {
        return _this.handleItemCancelClick(item);
      };

      var handleSave = function(name) {
        return _this.handleItemSave(item, name);
      };

      return <Item key={item.id} name={item.name} checked={item.checked} 
                   renaming={item.renaming} onChange={handleChange} 
                   onCancelClick={handleCancelClick} onSave={handleSave} />;
    });
  },

  tableHeader: function() {
    var disableButtons = !this.isAnyItemSelected();
    return <tr>
      <th><input type="checkbox" checked={this.areAllItemsSelected()} onChange={this.handleSelectAllChange} /></th>
      <th>
        <button className="button tiny" disabled={disableButtons} onClick={this.handleRenameClick}>Rename</button>
        <button className="button tiny alert" disabled={disableButtons} onClick={this.handleDeleteClick}>Delete</button>
        <button className="button tiny success" disabled={disableButtons}>New folder</button>
      </th>
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

  getCheckedItems: function() {
    return this.state.items.filter(function(item) {
      return item.checked;
    });
  },

  areAllItemsSelected: function() {
    return this.state.items.length !== 0 && this.getCheckedItems().length === this.state.items.length;
  },

  isAnyItemSelected: function() {
    return this.getCheckedItems().length > 0;
  },

  areManyItemSelected: function() {
    return this.getCheckedItems().length > 1;
  },

  renameSelected: function() {
    var items = this.state.items.map(function(item) {
      item.renaming = item.checked;
      return item;
    });
    this.setState({ items: items });
  },

  cancelItem: function(item) {
    var items = this.state.items.map(function(_item) {
      if (item.id === _item.id) {
        _item.renaming = false;
        _item.checked = false;
      }
      return _item;
    });
    this.setState({ items: items });
  },

  saveItem: function(item, name) {
    var items = this.state.items.map(function(_item) {
      if (item.id === _item.id) {
        _item.name = name;
        _item.renaming = false;
        _item.checked = false;
      }
      return _item;
    });
    this.setState({ items: items });
  },

  showDeletePopup: function() {
    var pluralized = this.areManyItemSelected() ? 'items' : 'item';
    if (confirm("Are you sure want to delete "+ pluralized + '?')) {
      var items = this.state.items.filter(function(item) {
        return !item.checked;
      });
      this.setState({ items: items });
    }
  },

  handleDeleteClick: function(item) {
    this.showDeletePopup();
  },

  handleItemCancelClick: function(item) {
    this.cancelItem(item);
  },

  handleItemSave: function(item, name) {
    this.saveItem(item, name);
  },

  handleRenameClick: function() {
    this.renameSelected();
  },

  handleSelectAllChange: function() {
    this.toggleAll();
  },

  handleItemChange: function(item) {
    this.toggleItem(item);
  }
});

module.exports = Folders;
