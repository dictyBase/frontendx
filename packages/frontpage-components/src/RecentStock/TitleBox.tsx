import { Grid, Typography, makeStyles } from "@material-ui/core"
import { ReactElement } from "react"

const useTitleBoxStyles = makeStyles((theme) => ({
  container: {
    paddingTop: ".75rem",
    paddingBottom: ".75rem",
    paddingLeft: ".75rem",
    paddingRight: ".75rem",
    backgroundColor: "#81b6e8",
    color: "#0a2238",
    columnGap: "0.5rem",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    alignText: "center"
  },
  title: {
    fontWeight: "normal",
  },
  titleIcon: {
  }
}))

type TitleBoxProperties = {
  icon: ReactElement
  content: string
}

const TitleBox = ({ icon, content }: TitleBoxProperties) => {
  const { title, container, titleIcon } = useTitleBoxStyles()
  return (
      <Grid
        container
        className={container}
        justifyContent="center"
        alignItems="center">
        <Grid className={titleIcon} item>{icon}</Grid>
        <Grid item>
          <Typography variant="h2" className={title}>
            {content}
          </Typography>
        </Grid>
      </Grid>
  )
}

export { TitleBox }
