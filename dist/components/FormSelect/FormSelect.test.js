"use strict";

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("./Select"));

var _react2 = require("@testing-library/react");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('../../images/dropdown.svg', function () {
  return {
    ReactComponent: 'caret-icon'
  };
});

var renderComponent = function renderComponent(props) {
  return (0, _react2.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, _objectSpread({}, props)));
};

describe('Select component', function () {
  var wrapper;
  var mockClick = jest.fn();
  beforeEach(function () {
    var props = {
      label: 'Select',
      floatingLabel: true,
      selectedId: 'test1',
      onClick: mockClick,
      options: [{
        label: 'Test1',
        id: 'test1',
        subLabel: 'test sub label'
      }]
    };
    wrapper = renderComponent(props);
  });
  afterEach(_react2.cleanup);
  it('renders without crashing', function () {
    expect(wrapper.queryByTestId('select')).not.toBeNull();
  });
  it('should show select body after click by select header', function () {
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    expect(wrapper.queryByTestId('select-body')).not.toBeNull();
  });
  it('should hide the select body when scrolling', function () {
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    expect(wrapper.queryByTestId('select-body')).not.toBeNull();

    _react2.fireEvent.scroll(window);

    expect(wrapper.queryByTestId('select-body')).toBeNull();
  });
  it('should call "onClick" callback with "test1"', function () {
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    var selectOption = wrapper.getByTestId('select-option');

    _react2.fireEvent.click(selectOption);

    expect(mockClick).toHaveBeenCalledWith('test1');
  });
  it('should not close "selectBody" if click by disabled option', function () {
    var props = {
      options: [{
        label: 'Test1',
        id: 'test1'
      }],
      disabledOptions: ['test1']
    };
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, _objectSpread({}, props)));
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    var selectOption = wrapper.getByTestId('select-option');

    _react2.fireEvent.click(selectOption);

    expect(wrapper.queryByTestId('select-body')).not.toBeNull();
  });
  it('should display selected option', function () {
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    var selectOption = wrapper.getByTestId('select-option');

    _react2.fireEvent.click(selectOption);

    expect(mockClick).toHaveBeenCalledWith('test1');
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
      options: [{
        label: 'Test1',
        id: 'test1'
      }],
      selectedId: "test1"
    }));
    var selectedOption = wrapper.getByTestId('selected-option');
    expect(selectedOption.textContent).toEqual('Test1');
  });
  it('should add className "select__label_floating" to select label if props floatingLabel "true"', function () {
    expect(wrapper.getByTestId('select-label').className).toMatch('select__label_floating');
  });
  it('should not open select body if props disabled set to "true"', function () {
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
      options: [{
        label: 'Test1',
        id: 'test1'
      }],
      disabled: true
    }));
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    expect(wrapper.queryByTestId('select-body')).toBeNull();
  });
  it('should display a "subLabel" if it exists in the option', function () {
    var subLabel = wrapper.queryByTestId('select-subLabel');
    expect(subLabel).not.toBeNull();
  });
  it('should call handler callback if it exists in the option', function () {
    var mockHandler = jest.fn();
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
      options: [{
        label: 'Test1',
        id: 'test1',
        handler: mockHandler
      }]
    }));
    var select = wrapper.getByTestId('select');

    _react2.fireEvent.click(select);

    var selectOption = wrapper.getByTestId('select-option');

    _react2.fireEvent.click(selectOption);

    expect(mockHandler).toHaveBeenCalled();
  });
});