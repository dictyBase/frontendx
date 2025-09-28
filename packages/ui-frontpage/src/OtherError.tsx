import Grid from "@mui/material/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import sadDicty from "./assets/sad-dicty.png"
import { ErrorMessage } from "./ErrorMessage"
import { Error400Container, MainGrid } from "./errorStyles"

/**
 * UI display when there is a general error.
 */

const OtherError = () => (
  <MainGrid container justifyContent="center">
    <Grid item xs={10} md={8}>
      <Error400Container>
        <img src={sadDicty} alt="Sad Dicty -- HTTP Error" />
        <h1>
          <FontAwesomeIcon icon="exclamation-circle" /> Error
        </h1>
        <ErrorMessage />
      </Error400Container>
    </Grid>
  </MainGrid>
)

export { OtherError }
