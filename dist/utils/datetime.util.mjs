import a from "moment";
function m() {
  const e = /* @__PURE__ */ new Set(["en-GB", "en-US"]);
  return (navigator.languages || [navigator.language]).find((o) => e.has(o)) || "en-US";
}
const c = m(), d = (e, t, n = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}, o = c) => {
  if (!e)
    return t;
  const r = new Date(e);
  return isNaN(r) || typeof r != "object" || !(r instanceof Date) || isNaN(r) ? t : new Intl.DateTimeFormat(o, {
    numberingSystem: "latn",
    calendar: "gregory",
    ...n
  }).format(r);
}, g = (e) => {
  const [t, n] = e.split(":");
  return n ? {
    hour: t.replace(/_/g, "0"),
    minute: n.replace(/_/g, "0")
  } : {
    hour: "0",
    minute: "0"
  };
}, h = (e) => (a.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
}), a.utc(e).fromNow()), p = (e, t) => a(e).format(t), y = (e = [], t, n = !0) => [...e].sort((o, r) => {
  const s = Date.parse(o[t]), u = Date.parse(r[t]);
  return n ? s - u : u - s;
});
export {
  d as formatDatetime,
  p as getDateAndTimeByFormat,
  g as getFormatTime,
  m as getSupportedLocale,
  h as getTimeElapsedByDate,
  y as sortListByDate,
  c as supportedLocale
};
//# sourceMappingURL=datetime.util.mjs.map
