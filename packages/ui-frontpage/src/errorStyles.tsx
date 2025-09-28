import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

const Error400Container = styled("div")(() => ({
  backgroundColor: "#eff8fb",
  textAlign: "center",
  paddingTop: 30,
  paddingBottom: 30,
  marginBottom: 30,
  borderRadius: 5,
}))

const Error500Container = styled("div")(() => ({
  backgroundColor: "#a63232",
  textAlign: "center",
  paddingTop: 40,
  paddingBottom: 40,
  marginBottom: 30,
  borderRadius: 5,
  color: "#e3e3e3",
}))

const Link500 = styled("a")(() => ({
  color: "#e0e0e0",
  textDecoration: "none",
}))

const MainGrid = styled(Grid)(() => ({
  marginTop: "40px",
}))

const Paragraph = styled("p")(() => ({
  padding: "10px",
}))

const List = styled("ul")(() => ({
  margin: "0 auto",
  display: "table",
}))

const AddPageButton = styled(Button)(({ theme }) => ({
  width: "25%",
  marginTop: "25px",
  padding: "25px",
  textTransform: "none",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

const Link = styled("a")(() => ({
  color: "#428bca",
  textDecoration: "none",
}))

export {
  Error400Container,
  Error500Container,
  Link500,
  MainGrid,
  Paragraph,
  List,
  AddPageButton,
  Link,
}
