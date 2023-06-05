import { makeStyles } from "@material-ui/core"

export const footerStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    fontFamily: `${theme.typography.fontFamily}!important`,
    color: "rgb(216, 216, 216)!important",
  },
  header: {
    fontSize: "1.2rem",
    color: "rgb(235, 233, 122)!important",
  },
  link: {
    color: "rgb(216, 216, 216)",
    "& a": {
      color: "rgb(216, 216, 216)",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  support: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
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
}))
