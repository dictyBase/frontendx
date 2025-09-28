import { Link, useLocation, useParams } from "react-router-dom"
import Grid from "@mui/material/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BackToHomePageButton } from "./BackToHomePageButton"
import sadDicty from "./assets/sad-dicty.png"
import {
  Error400Container,
  MainGrid,
  Paragraph,
  Link as StyledLink,
  AddPageButton,
} from "./errorStyles"

type Properties = {
  /** Error message to display */
  error: string
}

type Parameters_ = {
  /** Name param in URL */
  name: string
  /** Subname param in URL */
  subname: string
}

/**
 * UI display when an item was not found.
 */

// While not currently used in the component, sometimes NotFoundError is invoked by other components that provide it an error prop, so the parameter will not be removed for now.
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotFoundError = ({ error }: Properties) => {
  const { name, subname } = useParams<Parameters_>()
  const location = useLocation()

  return (
    <MainGrid container justifyContent="center">
      <Grid item xs={10} md={8}>
        <Error400Container>
          <img src={sadDicty} alt="Sad Dicty -- Page Not Found" />
          <h3>Page Not Found</h3>
          <Paragraph>Sorry! We can&apos;t find that page.</Paragraph>
          <Paragraph>
            You can try one of the links in our navbar above, or head back to
            the homepage.
          </Paragraph>
          <BackToHomePageButton />
          <div>
            <br />
            <Link
              to="/addpage"
              state={{
                name,
                subname,
                url: location.pathname,
              }}>
              <AddPageButton size="small" variant="contained" color="primary">
                <FontAwesomeIcon icon="plus" />
                &nbsp; Add a page to this route
              </AddPageButton>
            </Link>
          </div>
        </Error400Container>
      </Grid>
    </MainGrid>
  )
}

export { NotFoundError }
