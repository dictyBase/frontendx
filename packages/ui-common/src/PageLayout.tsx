import { type ReactNode } from "react"
import { Box, Container } from "@mui/material"

type PageLayoutProperties = {
  title: string
  metaContent: string
  children: ReactNode
}

const PageLayout = ({ title, metaContent, children }: PageLayoutProperties) => (
  <Container maxWidth="lg">
    <Box textAlign="center">
      <title>{title}</title>
      <meta name="description" content={metaContent} />
      {children}
    </Box>
  </Container>
)

export { PageLayout }
