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

  it('triggers onChange', function() {
    var eventMock = jest.genMockFunction();

    var item = TestUtils.renderIntoDocument(
      <Item name="Test.js" onChange={eventMock} />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(item, 'input');

    TestUtils.Simulate.change(input);

    expect(eventMock.mock.calls.length).toBe(1);
  });

  it('can be edited', function() {
    var eventMock = jest.genMockFunction();

    var item = TestUtils.renderIntoDocument(
      <Item name="Test.js" onSave={eventMock} renaming={true} />
    );

    var form = TestUtils.findRenderedDOMComponentWithTag(item, 'form');
    var input = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

    TestUtils.Simulate.change(input, { target: { value: 'Test.txt' } });

    expect(input.getDOMNode().value).toBe('Test.txt');

    TestUtils.Simulate.submit(form);
    expect(eventMock.mock.calls.length).toBe(1);

    // wait for tick
    setTimeout(function() {
      expect(item.props.renaming).toBe(false);
      expect(item.props.name).toBe('Test.txt');
    }, 0);
  });

  it('editing can be canceled', function() {
    var eventMock = jest.genMockFunction();

    var item = TestUtils.renderIntoDocument(
      <Item name="Test.js" onCancelClick={eventMock} renaming={true} />
    );

    var form = TestUtils.findRenderedDOMComponentWithTag(item, 'form');
    var button = TestUtils.scryRenderedDOMComponentsWithTag(form, 'button')[1];

    TestUtils.Simulate.click(button);

    expect(eventMock.mock.calls.length).toBe(1);

    // wait for tick
    setTimeout(function() {
      expect(item.props.renaming).toBe(false);
    }, 0);
  });
});
