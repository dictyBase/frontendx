import { CircularProgress } from "@mui/material"
import { StyledIconContainer } from "./StyledIconContainer"

const LoadingDisplay = () => (
  <StyledIconContainer disableGutters>
    <CircularProgress size={56} thickness={6} />
  </StyledIconContainer>
)

export { LoadingDisplay }
