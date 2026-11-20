import { type Theme } from "@mui/material"

export const footerStyles = {
  footer: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    fontFamily: `${theme.typography.fontFamily}!important`,
    color: "rgb(216, 216, 216)!important",
  }),
  header: {
    fontSize: "1.2rem",
    color: "rgb(235, 233, 122)!important",
  },
  support: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  }),
  separator: {
    "&::after": {
      content: "'•'",
      margin: "0px 7px",
    },
    "&:last-child": {
      "&::after": {
        content: "''",
        margin: "0px",
      },
    },
  },
}
