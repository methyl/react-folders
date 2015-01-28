/** @jsx React.DOM */

jest.dontMock('../Item.js');

var React = require('react/addons');
var Item = require('../Item.js');
var TestUtils = React.addons.TestUtils;

describe('Item', function() {
  it('is checked with checked prop passed', function() {
    var item = TestUtils.renderIntoDocument(
      <Item name="Test.js" checked={true} />
    );
    var input = TestUtils.findRenderedDOMComponentWithTag(item, 'input');
    expect(input.getDOMNode().checked).toBe(true);
  });

  it('triggers onClick', function() {
    var onClickMock = jest.genMockFunction();

    var item = TestUtils.renderIntoDocument(
      <Item name="Test.js" onClick={onClickMock} />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(item, 'input');

    TestUtils.Simulate.click(input);

    expect(onClickMock.mock.calls.length).toBe(1);
  });
});
