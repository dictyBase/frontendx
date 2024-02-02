import { Container, Grid, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { SinglePublication } from "./SinglePublication"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type PublicationsViewProperties = {
  data: Array<PublicationItem>
}

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    boxSizing: "border-box",
    marginBottom: "10px",
    "@media (max-width: 768px)": {
      // height: "350px",
    },
  },
  title: {
    paddingLeft: "5px",
    color: "#086a87",
    fontSize: "20px",
    verticalAlign: "top",
    textAlign: "left",
  },
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 30px 0px 35px",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "13px",
    overflow: "hidden",
    marginBottom: "5px",
    marginTop: "12px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
  bottomLink: {
    textDecoration: "underline",
    fontWeight: "normal",
    textAlign: "right",
    paddingBottom: "10px",

    "@media (min-width: 1400px)": {},
  },
})

const PublicationsView = ({ data }: PublicationsViewProperties) => {
  const { container, listBox, header } = useStyles()
  return (
    <Container className={container}>
      <Box className={header}>
        <Typography variant="h1" align="center">
          Publications
        </Typography>
      </Box>
      <Grid
        container
        spacing={1}
        direction="column"
        component="ul"
        className={listBox}>
        {data.map((p) => (
          <Grid key={p.pubmedId} item>
            <SinglePublication data={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export { PublicationsView }
