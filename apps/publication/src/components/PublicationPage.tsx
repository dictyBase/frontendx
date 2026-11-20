import React from "react"
import { Grid, Container, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Publication } from "dicty-graphql-schema"
import { PublicationSidebar } from "./PublicationSidebar"
import { PublicationBody } from "./PublicationBody"

interface PublicationPageProperties {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProperties) => {
  const { title, doi } = publication
  return (
    <Box sx={{ backgroundColor: grey[100] }}>
      <Container
        disableGutters
        sx={{
          backgroundColor: "white",
          boxShadow: `2px 2px 7px ${grey[300]}, -2px 2px 7px ${grey[300]}`,
        }}>
        <Grid container>
          <title>{`dictyBase Literature - ${title}`}</title>
          <meta
            name="description"
            content={`dictyBase literature page for title ${title}`}
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={1}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
              },
            })}>
            <PublicationSidebar doi={doi} title={title} />
          </Grid>
          <Grid item xs={12} sm={12} md={10}>
            <PublicationBody publication={publication} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export { PublicationPage }
