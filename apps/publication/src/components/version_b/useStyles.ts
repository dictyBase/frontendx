import { makeStyles } from "@material-ui/core/styles"
import { blueGrey, grey, indigo, cyan, teal } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  content: {
    // padding: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
    boxShadow: `0 4px 4px ${blueGrey[200]} `,
    zIndex: 1,
    //    backgroundImage:
    //      "url('https://www.mpg.de/16477350/teaser-1614003793.jpg?t=eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjpudWxsLCJmaXQiOm51bGwsIm9ial9pZCI6MTY0NzczNTB9--01e01ccfe978391987f0884819fb37ae8b17d6a2')",
    //    backgroundFilter: "blur(10px)",
    //    backgroundPositionY: "40%",
    //    backgroundSize: "cover",
    //    boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.8)",
  },
  body: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    backgroundColor: blueGrey[100],
    maxHeight: "50vh",
    overflow: "scroll",
    zIndex: 0,
    //    backgroundImage:
    //      "url('https://www.mpg.de/16477350/teaser-1614003793.jpg?t=eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjpudWxsLCJmaXQiOm51bGwsIm9ial9pZCI6MTY0NzczNTB9--01e01ccfe978391987f0884819fb37ae8b17d6a2')",
    //    backgroundFilter: "blur(10px)",
    //    backgroundPositionY: "40%",
    //    backgroundSize: "cover",
    // boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.8)",
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    zIndex: 2,
  },
}))

export { useStyles }
