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
import { Box, Grid, Typography } from "@material-ui/core";

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
    paddingRight: theme.spacing(0.5),
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
  }
}));

// src/components/FooterContainer.tsx
var FooterContainer = ({ links }) => {
  const classes = footerStyles();
  return /* @__PURE__ */ React.createElement("footer", {
    className: classes.footer
  }, /* @__PURE__ */ React.createElement(Box, {
    px: 2
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    justifyContent: "center"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12
  }, /* @__PURE__ */ React.createElement(Box, {
    my: 2,
    textAlign: "center"
  }, /* @__PURE__ */ React.createElement(Typography, {
    className: classes.header
  }, "Dicty Community Resource"))), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    container: true,
    justifyContent: "center"
  }, links.map((item, index) => {
    const separator = index ? " \u2022 " : "";
    return /* @__PURE__ */ React.createElement(Typography, {
      key: index,
      variant: "body2",
      className: classes.link
    }, /* @__PURE__ */ React.createElement(Box, {
      component: "span",
      px: 0.5
    }, separator), /* @__PURE__ */ React.createElement("a", {
      href: item.url
    }, item.description));
  })), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12,
    container: true,
    justifyContent: "flex-end",
    className: classes.support
  }, /* @__PURE__ */ React.createElement(Box, {
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
  }, "NIGMS")))))));
};

// src/components/Footer.tsx
var Footer = ({ theme, links }) => {
  const customTheme = theme ? theme : muiTheme;
  return /* @__PURE__ */ React.createElement(MuiThemeProvider, {
    theme: customTheme
  }, /* @__PURE__ */ React.createElement(FooterContainer, {
    links
  }));
};
export {
  Footer
};
