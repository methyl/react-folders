/** @jsx React.DOM */

var React = window.React = require('react'),
    mountNode = document.getElementById("app");

var FoldersApp = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="small-12 columns">
          <h2>Hello world!</h2>
        </div>
      </div>
    );
  }
});

React.renderComponent(<FoldersApp />, mountNode);
