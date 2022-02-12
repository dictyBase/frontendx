var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Footer: () => Footer
});

// react-shim.js
var import_react = __toESM(require("react"));

// src/components/Footer.tsx
var import_core8 = require("@material-ui/core");

// ../navbar/src/styles/customTheme.ts
var import_core = require("@material-ui/core");
var primaryColor = "#004080";
var blueSecondaryColor = "#001b53";
var muiTheme = (0, import_core.createTheme)({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: blueSecondaryColor
    }
  }
});

// src/components/FooterContainer.tsx
var import_core7 = require("@material-ui/core");

// src/styles/footerStyles.ts
var import_core2 = require("@material-ui/core");
var footerStyles = (0, import_core2.makeStyles)((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    fontFamily: `${theme.typography.fontFamily}!important`,
    color: "rgb(216, 216, 216)!important"
  },
  header: {
    fontSize: "1.2rem",
    color: "rgb(235, 233, 122)!important"
  },
  link: {
    color: "rgb(216, 216, 216)",
    "& a": {
      color: "rgb(216, 216, 216)",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    }
  },
  support: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center"
    }
  },
  separator: {
    "&::after": {
      content: "'\u2022'",
      margin: "0px 7px"
    },
    "&:last-child": {
      "&::after": {
        content: "''",
        margin: "0px"
      }
    }
  }
}));

// src/components/FooterHead.tsx
var import_core3 = require("@material-ui/core");
var FooterHead = () => {
  const classes = footerStyles();
  return /* @__PURE__ */ import_react.default.createElement(import_core3.Grid, {
    item: true,
    xs: 12
  }, /* @__PURE__ */ import_react.default.createElement(import_core3.Box, {
    my: 2,
    textAlign: "center"
  }, /* @__PURE__ */ import_react.default.createElement(import_core3.Typography, {
    className: classes.header
  }, "Dicty Community Resource")));
};

// src/components/FooterSponsors.tsx
var import_core4 = require("@material-ui/core");
var FooterSponsors = () => {
  const classes = footerStyles();
  return /* @__PURE__ */ import_react.default.createElement(import_core4.Grid, {
    item: true,
    xs: 12,
    container: true,
    justifyContent: "flex-end",
    className: classes.support
  }, /* @__PURE__ */ import_react.default.createElement(import_core4.Box, {
    mt: 1,
    mb: 2,
    mr: 1,
    className: classes.link
  }, /* @__PURE__ */ import_react.default.createElement("em", null, "Supported by", " ", /* @__PURE__ */ import_react.default.createElement("a", {
    href: "https://reporter.nih.gov/project-details/10024726",
    target: "_blank",
    rel: "noopener"
  }, "NIH"), "/", /* @__PURE__ */ import_react.default.createElement("a", {
    href: "https://www.nigms.nih.gov/",
    target: "_blank",
    rel: "noopener"
  }, "NIGMS"))));
};

// src/components/FooterLinks.tsx
var import_core6 = require("@material-ui/core");

// src/components/FooterLink.tsx
var import_core5 = require("@material-ui/core");
var FooterLink = ({ url, description }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ import_react.default.createElement(import_core5.Typography, {
    variant: "body2",
    className: `${classes.link} ${classes.separator}`
  }, /* @__PURE__ */ import_react.default.createElement("a", {
    href: url
  }, description));
};

// src/components/FooterLinks.tsx
var FooterLinks = ({ links }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ import_react.default.createElement(import_core6.Grid, {
    item: true,
    container: true,
    justifyContent: "center"
  }, links.map((data, i) => /* @__PURE__ */ import_react.default.createElement(FooterLink, __spreadProps(__spreadValues({}, data), {
    key: i
  }))));
};

// src/components/FooterContainer.tsx
var FooterContainer = ({ links }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ import_react.default.createElement("footer", {
    className: classes.footer
  }, /* @__PURE__ */ import_react.default.createElement(import_core7.Box, {
    px: 2
  }, /* @__PURE__ */ import_react.default.createElement(import_core7.Grid, {
    container: true,
    justifyContent: "center"
  }, /* @__PURE__ */ import_react.default.createElement(FooterHead, null), /* @__PURE__ */ import_react.default.createElement(FooterLinks, {
    links
  }), /* @__PURE__ */ import_react.default.createElement(FooterSponsors, null))));
};

// src/components/Footer.tsx
var Footer = ({ theme, links }) => {
  const customTheme = theme ? theme : muiTheme;
  return /* @__PURE__ */ import_react.default.createElement(import_core8.MuiThemeProvider, {
    theme: customTheme
  }, /* @__PURE__ */ import_react.default.createElement(FooterContainer, {
    links
  }));
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Footer
});
