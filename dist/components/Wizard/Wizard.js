"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Modal = _interopRequireDefault(require("../Modal/Modal"));

var _WizardSteps = _interopRequireDefault(require("./WizardSteps/WizardSteps"));

var _constants = require("../../constants");

var _types = require("../../types");

require("./Wizard.scss");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Wizard = function Wizard(_ref) {
  var children = _ref.children,
      className = _ref.className,
      formState = _ref.formState,
      isWizardOpen = _ref.isWizardOpen,
      onWizardResolve = _ref.onWizardResolve,
      onWizardSubmit = _ref.onWizardSubmit,
      location = _ref.location,
      size = _ref.size,
      title = _ref.title,
      stepsConfig = _ref.stepsConfig,
      submitButtonLabel = _ref.submitButtonLabel;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeStepNumber = _useState2[0],
      setActiveStepNumber = _useState2[1];

  var activeStepTemplate = (0, _react.useMemo)(function () {
    return _react.default.Children.toArray(children)[activeStepNumber];
  }, [children, activeStepNumber]);
  var totalSteps = (0, _react.useMemo)(function () {
    return _react.default.Children.count(children) - 1 || 0;
  }, [children]);
  var isLastStep = (0, _react.useMemo)(function () {
    return activeStepNumber === totalSteps;
  }, [activeStepNumber, totalSteps]);
  var stepsMenu = (0, _react.useMemo)(function () {
    return (stepsConfig === null || stepsConfig === void 0 ? void 0 : stepsConfig.map(function (step) {
      return {
        id: step.id,
        label: step.label
      };
    })) || [];
  }, [stepsConfig]);
  var wizardClasses = (0, _classnames.default)('wizard-form', className);

  var goToNextStep = function goToNextStep() {
    setActiveStepNumber(function (prevStep) {
      return Math.min(++prevStep, totalSteps);
    });
  };

  var goToPreviousStep = function goToPreviousStep() {
    return setActiveStepNumber(function (prevStep) {
      return Math.max(--prevStep, 0);
    });
  };

  var jumpToStep = function jumpToStep(idx) {
    return setActiveStepNumber(idx);
  };

  var handleSubmit = function handleSubmit() {
    formState.handleSubmit();

    if (formState.valid) {
      if (isLastStep) {
        onWizardSubmit(formState.values);
      } else {
        goToNextStep();
      }
    }
  };

  var getDefaultActions = function getDefaultActions() {
    return [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      onClick: goToPreviousStep,
      disabled: activeStepNumber === 0,
      label: "Back",
      type: "button"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      onClick: handleSubmit,
      disabled: formState.submitting || formState.invalid && formState.submitFailed,
      label: isLastStep ? submitButtonLabel : 'Next',
      type: "button",
      variant: _constants.SECONDARY_BUTTON
    })];
  };

  var renderModalActions = function renderModalActions() {
    var _stepsConfig$activeSt;

    if ((_stepsConfig$activeSt = stepsConfig[activeStepNumber]) !== null && _stepsConfig$activeSt !== void 0 && _stepsConfig$activeSt.getActions) {
      return stepsConfig[activeStepNumber].getActions({
        formState: formState,
        goToNextStep: goToNextStep,
        goToPreviousStep: goToPreviousStep,
        onWizardResolve: onWizardResolve,
        handleSubmit: handleSubmit
      }).map(function (action) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, _objectSpread({}, action));
      });
    } else {
      return getDefaultActions();
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Modal.default, {
    actions: renderModalActions(),
    className: wizardClasses,
    onClose: onWizardResolve,
    location: location,
    show: isWizardOpen,
    size: size,
    title: title,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_WizardSteps.default, {
      activeStepNumber: activeStepNumber,
      jumpToStep: jumpToStep,
      steps: stepsMenu
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "wizard-form__content",
      children: activeStepTemplate
    })]
  });
};

Wizard.defaultProps = {
  className: '',
  confirmClose: false,
  size: _constants.MODAL_MD,
  stepsConfig: [],
  submitButtonLabel: 'Submit'
};
Wizard.propsTypes = {
  className: _propTypes.default.string,
  confirmClose: _propTypes.default.bool,
  formState: _propTypes.default.object.isRequired,
  isWizardOpen: _propTypes.default.bool.isRequired,
  onWizardResolve: _propTypes.default.func.isRequired,
  onWizardSubmit: _propTypes.default.func.isRequired,
  location: _propTypes.default.string.isRequired,
  size: _types.MODAL_SIZES,
  title: _propTypes.default.string.isRequired,
  stepsConfig: _types.WIZARD_STEPS_CONFIG,
  submitButtonLabel: _propTypes.default.string
};

Wizard.Step = function (_ref2) {
  var children = _ref2.children;
  return children;
};

var _default = Wizard;
exports.default = _default;