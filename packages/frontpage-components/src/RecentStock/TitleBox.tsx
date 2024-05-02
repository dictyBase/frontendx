import { Grid, Typography, makeStyles } from "@material-ui/core"
import { ReactElement } from "react"

const useTitleBoxStyles = makeStyles((theme) => ({
  container: {
    height: "3rem",
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: "#005ab3",
    // backgroundColor: "#b2ddec",
    color: "#eef6ff",
    columnGap: "0.5rem",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
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
