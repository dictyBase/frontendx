import { FC } from "react"
import { Helmet } from "react-helmet"
import { Box, Container } from "@mui/material"

const CatalogItemDetailsLayout: FC<{ title: string; label: string }> = ({
  title,
  label,
  children,
}) => (
  <Container maxWidth="lg">
    <Box textAlign="center">
      <Helmet>
        <title>{title} - Dicty Stock Center</title>
        <meta
          name="description"
          content={`Dicty Stock Center strain details page for ${label}`}
        />
      </Helmet>
      {children}
    </Box>
  </Container>
)

export { CatalogItemDetailsLayout }
