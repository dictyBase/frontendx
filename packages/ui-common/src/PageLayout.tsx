import { FC } from "react"
import { Helmet } from "react-helmet"
import { Box, Container } from "@mui/material"

const PageLayout: FC<{ title: string; metaContent: string }> = ({
  title,
  metaContent,
  children,
}) => (
  <Container maxWidth="lg">
    <Box textAlign="center">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaContent} />
      </Helmet>
      {children}
    </Box>
  </Container>
)

export { PageLayout }
