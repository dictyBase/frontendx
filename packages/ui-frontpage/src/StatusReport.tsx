import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { grey, green, red } from "@mui/material/colors"
import { UptimeProperties, Status } from "./types"

const StyledGrid = styled(Grid)({
  color: "black",
  padding: "0.3rem",
  columnGap: "1rem",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: grey[200],
  },
})

const StatusGrid = styled(Grid)({
  lineHeight: 0,
})

const StyledCheckCircleIcon = styled(CheckCircleIcon)({
  color: green[700],
})

const StyledErrorIcon = styled(ErrorIcon)({
  color: red[700],
})

const StyledTypography = styled(Typography)({
  fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
})

const StatusReport = ({ name, url, status }: UptimeProperties) => {
  const statusIcon = match(status)
    .with(Status.UP, () => <StyledCheckCircleIcon />)
    .with(Status.DOWN, () => <StyledErrorIcon />)
    .exhaustive()

  return (
    <Link to={url}>
      <StyledGrid container justifyContent="space-between">
        <Grid item>
          <StyledTypography>{name}</StyledTypography>
        </Grid>
        <StatusGrid item>{statusIcon}</StatusGrid>
      </StyledGrid>
    </Link>
  )
}

export { StatusReport }
