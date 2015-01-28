var React = require('react');

var Item = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name
    };
  },

  getDefaultProps: function() {
    return {
      checked: false,
      renaming: false
    };
  },

  render: function() {
    return <tr>
      <td><input type="checkbox" checked={this.props.checked} onChange={this.handleChange} /></td>
      <td>
        {this.props.renaming ? this.editForm() : this.props.name}
      </td>
    </tr>;
  },

  editForm: function() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text" ref="nameInput" value={this.state.name || this.props.name} onChange={this.handleNameChange} />
      <button onClick={this.handleSaveClick}>Save</button>
      <button onClick={this.handleCancelClick}>Cancel</button>
    </form>;
  },

  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  handleSaveClick: function(e) {
    e.preventDefault();
    this.props.onSave(this.state.name);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSave(this.state.name);
  },

  handleCancelClick: function(e) {
    e.preventDefault();
    this.props.onCancelClick();
  },

  handleChange: function() {
    this.props.onChange();
  }
});

module.exports = Item;
