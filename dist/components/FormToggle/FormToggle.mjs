import { jsx as l, jsxs as f } from "react/jsx-runtime";
import "react";
import _ from "classnames";
import r from "prop-types";
import { Field as h } from "react-final-form";
import N from "../Tip/Tip.mjs";
import { DENSITY as x } from "../../types.mjs";
/* empty css                 */
const b = ({
  className: a = "",
  density: m = "",
  label: t = "",
  labelTip: o = "",
  name: e,
  readOnly: c = !1,
  onChange: s = () => {
  },
  ...d
}) => {
  const p = _(
    "form-field-toggle",
    "form-field__wrapper",
    m && `form-field__wrapper-${m}`,
    (t || o) && "form-field-toggle_has-label",
    a
  );
  return /* @__PURE__ */ l(h, { name: e, value: d.value, type: "checkbox", children: ({ input: i }) => /* @__PURE__ */ f(
    "div",
    {
      className: p,
      "data-testid": e ? `${e}-form-field-toggle` : "form-field-toggle",
      children: [
        (t || o) && /* @__PURE__ */ f("label", { htmlFor: e, className: "form-field-toggle__label", children: [
          t,
          o && /* @__PURE__ */ l(N, { text: o })
        ] }),
        /* @__PURE__ */ f("label", { htmlFor: e, className: "form-field-toggle__toggle-wrapper", children: [
          /* @__PURE__ */ l(
            "input",
            {
              type: "checkbox",
              "data-testid": e ? `${e}-form-toggle` : "form-toggle",
              id: e,
              ...i,
              ...d,
              value: String(i.checked),
              disabled: c,
              onChange: (g) => {
                s == null || s(g), i.onChange(g);
              }
            }
          ),
          /* @__PURE__ */ l("span", { className: "form-field-toggle__switch" })
        ] })
      ]
    }
  ) });
};
b.propTypes = {
  className: r.string,
  density: x,
  label: r.string,
  labelTip: r.string,
  name: r.string.isRequired,
  readOnly: r.bool,
  onChange: r.func
};
export {
  b as default
};
//# sourceMappingURL=FormToggle.mjs.map
