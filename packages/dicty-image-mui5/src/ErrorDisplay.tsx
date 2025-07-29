import BrokenImageTwoToneIcon from "@mui/icons-material/BrokenImageTwoTone"
import { SvgIcon, Container } from "@mui/material"
import { useIconStyles } from "./imageStyles"

const ErrorDisplay = () => {
  const { classes } = useIconStyles()
  return (
    <Container disableGutters className={classes.icons}>
      <SvgIcon fontSize="large" color="error">
        <BrokenImageTwoToneIcon />
      </SvgIcon>
    </Container>
  )
}

export { ErrorDisplay }
