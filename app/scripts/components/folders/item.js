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

  componentDidUpdate: function() {
    this.setFocus();
  },

  componentDidMount: function() {
    this.setFocus();
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
    return <form onSubmit={this.handleSubmit} className="edit-form">
      <input type="text" ref="nameInput" value={this.state.name || this.props.name} onChange={this.handleNameChange} />
      <div className="button-group radius">
        <button className="button tiny success" onClick={this.handleSaveClick}>Save</button>
        <button className="button tiny alert" onClick={this.handleCancelClick}>Cancel</button>
      </div>
    </form>;
  },

  setFocus: function() {
    if (this.props.renaming && this.props.isFocused)
      this.refs.nameInput.getDOMNode().focus();
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
