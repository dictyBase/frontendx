import { makeStyles } from "@material-ui/core/styles"

const headerStyles = makeStyles({
  header: {
    display: "flex",
    gap: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  logoTitle: {
    fontStyle: "italic",
    color: "hsl(210, 100%, 25%)",
    fontWeight: 410,
    marginLeft: "1rem",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "1rem",
  },
  search: {
    flexBasis: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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

export { headerStyles }
