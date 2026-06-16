import { Container } from "@mui/material"
import type { PageContainerProperties } from "./types"

const PageContainer = ({
  children,
  maxWidth = "lg",
  sx,
}: PageContainerProperties) => (
  <Container maxWidth={maxWidth} sx={{ py: 4, ...sx }}>
    {children}
  </Container>
)

export { PageContainer }
