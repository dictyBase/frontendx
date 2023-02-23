import { makeStyles } from "@material-ui/core/styles"

const headerStyles = makeStyles({
  header: {
    display: "flex",
    gap: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoTitle: {
    fontStyle: "italic",
    color: "hsl(210, 100%, 25%)",
    fontWeight: 410,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  search: {
    flexBasis: "25%",
  },
  linksIcon: { fontSize: "2.2rem" },
  linksButton: {
    display: "flex",
    flexDirection: "column",
    color: "hsl(210, 100%, 25%)",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
})

export default headerStyles
