import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { useNavigate } from "react-router-dom"
import { StyledHeading } from "./StyledHeading"

const AuthorizedHeading = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate("/information/intro/edit")
  }
  return (
    <StyledHeading>
      <Typography variant="h1">
        Welcome to Dicty Stock Center (DSC)
        <IconButton
          aria-label="Edit DSC Intro"
          size="medium"
          onClick={onClick}
          sx={{
            paddingBottom: 0,
            paddingTop: 0,
          }}>
          <EditIcon
            sx={(theme) => ({
              fontSize: pipe(
                theme.typography.h2.fontSize,
                OfromNullable,
                OgetOrElse(
                  () =>
                    "24px" as NonNullable<typeof theme.typography.h2.fontSize>,
                ),
              ),
            })}
          />
        </IconButton>
      </Typography>
    </StyledHeading>
  )
}

export { AuthorizedHeading }
