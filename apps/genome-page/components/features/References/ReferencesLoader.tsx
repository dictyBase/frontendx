import { Box, Skeleton } from "@mui/material"

const ReferencesLoader = () => (
  <Box mt="10px" data-testid="skeleton-loader">
    {new Array(10).map((item, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton animation="wave" key={key} />
    ))}
  </Box>
)

export { ReferencesLoader }
