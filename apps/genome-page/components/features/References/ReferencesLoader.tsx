import { Box, Skeleton } from "@mui/material"

const ReferencesLoader = () => (
  <Box mt="10px" data-testid="skeleton-loader">
    {[...new Array(10)].map((item, key) => (
      <Skeleton animation="wave" key={key} />
    ))}
  </Box>
)

export { ReferencesLoader }
