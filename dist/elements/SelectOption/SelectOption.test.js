"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _SelectOption = _interopRequireDefault(require("./SelectOption"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var renderComponent = function renderComponent(props) {
  return (0, _react2.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectOption.default, _objectSpread({}, props)));
};

jest.mock('../../images/checkbox-unchecked.svg', function () {
  return {
    ReactComponent: 'unchecked-icon'
  };
});
jest.mock('../../images/checkbox-checked.svg', function () {
  return {
    ReactComponent: 'unchecked-icon'
  };
});
describe('SelectOption component', function () {
  var wrapper;
  beforeEach(function () {
    var props = {
      item: {
        label: 'Test1',
        id: 'test1',
        icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: "icon"
        }),
        subLabel: 'Test1'
      },
      selectType: ''
    };
    wrapper = renderComponent(props);
  });
  afterEach(_react2.cleanup);
  it('renders without crashing', function () {
    expect(wrapper.queryByTestId('select-option')).not.toBeNull();
  });
  it('should display checkbox inside option if props selectType is "checkbox"', function () {
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectOption.default, {
      item: {
        label: 'Test1',
        id: 'test1'
      },
      selectType: "checkbox",
      selectedId: "test1"
    }));
    expect(wrapper.queryByTestId('select-checkbox')).not.toBeNull();
  });
  it('should display select icon if it exists in the props "item"', function () {
    expect(wrapper.getByTestId('select-icon')).not.toBeNull();
  });
  it('should won\'t call onClick callback if props disable set to "true"', function () {
    var mockCLick = jest.fn();
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectOption.default, {
      item: {
        label: 'Test1',
        id: 'test1'
      },
      onCLick: mockCLick,
      selectType: "test1",
      disabled: true
    }));
    var selectOption = wrapper.getByTestId('select-option');

    _react2.fireEvent.click(selectOption);

    expect(mockCLick).toHaveBeenCalledTimes(0);
  });
  it('should display subLabel if it exists in props item', function () {
    expect(wrapper.queryByTestId('tooltip-wrapper')).not.toBeNull();
  });
  it('should add class "disabled" to SelectOption if props disabled set to "true"', function () {
    wrapper.rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectOption.default, {
      item: {
        label: 'Test1',
        id: 'test1'
      },
      selectType: "test1",
      disabled: true
    }));
    var selectOption = wrapper.getByTestId('select-option');
    expect(selectOption.className).toMatch('disabled');
  });
});