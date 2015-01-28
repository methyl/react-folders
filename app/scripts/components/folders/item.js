var Item = React.createClass({
  getDefaultProps: function() {
    return {
      checked: false
    }
  },

  render: function() {
    return <tr onClick={this.handleClick}>
      <td><input type="checkbox" checked={this.props.checked} readOnly/></td>
      <td>{this.props.name}</td>
    </tr>;
  },

  handleClick: function() {
    this.props.onChange();
  }
});

module.exports = Item;
