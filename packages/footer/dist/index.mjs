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
var FooterContainer = ({ links }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
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
