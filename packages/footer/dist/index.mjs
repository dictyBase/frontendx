var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// react-shim.js
import React from "react";

// src/components/Footer.tsx
import { MuiThemeProvider } from "@material-ui/core";

// ../navbar/src/styles/customTheme.ts
import { createTheme } from "@material-ui/core";
var primaryColor = "#004080";
var blueSecondaryColor = "#001b53";
var muiTheme = createTheme({
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
import { Box as Box3, Grid as Grid4 } from "@material-ui/core";

// src/styles/footerStyles.ts
import { makeStyles } from "@material-ui/core";
var footerStyles = makeStyles((theme) => ({
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
import { Box, Grid, Typography } from "@material-ui/core";
var FooterHead = ({ title }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* @__PURE__ */ React.createElement(Box, {
    my: 2,
    textAlign: "center"
  }, /* @__PURE__ */ React.createElement(Typography, {
    className: classes.header
  }, title)));
};

// src/components/FooterSponsors.tsx
import { Box as Box2, Grid as Grid2 } from "@material-ui/core";
var FooterSponsors = () => {
  const classes = footerStyles();
  return /* @__PURE__ */ React.createElement(Grid2, {
    item: true,
    xs: 12,
    container: true,
    justifyContent: "flex-end",
    className: classes.support
  }, /* @__PURE__ */ React.createElement(Box2, {
    mt: 1,
    mb: 2,
    mr: 1,
    className: classes.link
  }, /* @__PURE__ */ React.createElement("em", null, "Supported by", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://reporter.nih.gov/project-details/10024726",
    target: "_blank",
    rel: "noopener"
  }, "NIH"), "/", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.nigms.nih.gov/",
    target: "_blank",
    rel: "noopener"
  }, "NIGMS"))));
};

// src/components/FooterLinks.tsx
import { Grid as Grid3 } from "@material-ui/core";

// src/components/FooterLink.tsx
import { Typography as Typography2 } from "@material-ui/core";
var FooterLink = ({ url, description }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ React.createElement(Typography2, {
    variant: "body2",
    className: `${classes.link} ${classes.separator}`
  }, /* @__PURE__ */ React.createElement("a", {
    href: url
  }, description));
};

// src/components/FooterLinks.tsx
var FooterLinks = ({ links }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ React.createElement(Grid3, {
    item: true,
    container: true,
    justifyContent: "center"
  }, links.map((data, i) => /* @__PURE__ */ React.createElement(FooterLink, __spreadProps(__spreadValues({}, data), {
    key: i
  }))));
};

// src/components/FooterContainer.tsx
var FooterContainer = ({ links, title }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ React.createElement("footer", {
    className: classes.footer
  }, /* @__PURE__ */ React.createElement(Box3, {
    px: 2
  }, /* @__PURE__ */ React.createElement(Grid4, {
    container: true,
    justifyContent: "center"
  }, /* @__PURE__ */ React.createElement(FooterHead, {
    title
  }), /* @__PURE__ */ React.createElement(FooterLinks, {
    links
  }), /* @__PURE__ */ React.createElement(FooterSponsors, null))));
};

// src/components/Footer.tsx
var Footer = (_a) => {
  var _b = _a, { theme } = _b, rest = __objRest(_b, ["theme"]);
  const customTheme = theme ? theme : muiTheme;
  return /* @__PURE__ */ React.createElement(MuiThemeProvider, {
    theme: customTheme
  }, /* @__PURE__ */ React.createElement(FooterContainer, __spreadValues({}, rest)));
};

// src/data/footerData.ts
var footerData = [
  {
    url: "/research/techniques",
    description: "Techniques"
  },
  {
    url: "/research/teach",
    description: "Teaching Protocols"
  },
  {
    url: "/stockcenter",
    description: "Dicty Stock Center"
  },
  {
    url: "http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&loc=6%3A1..50022&tracks=reference%2Cgene%2Ctranscript&highlight=",
    description: "Genome Browser"
  },
  {
    url: "/dictyaccess",
    description: "DictyAccess"
  },
  {
    url: "/community/conference",
    description: "Conference"
  },
  {
    url: "/community/labs",
    description: "Labs"
  },
  {
    url: "/about",
    description: "About"
  },
  {
    url: "/stockcenter/contact",
    description: "Contact"
  }
];
export {
  Footer,
  footerData,
  footerStyles
};
