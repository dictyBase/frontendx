import Typography from "@mui/material/Typography"

type SearchResultsHeaderProperties = {
  /** Type of search results */
  property: string
  /** Item being searched for */
  description: string
}

const SearchResultsHeader = ({
  property,
  description,
}: SearchResultsHeaderProperties) => {
  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: "10px" }}>
        {property} Search Results
      </Typography>
      <Typography variant="h3" color="textSecondary">
        <em>{description}</em>
      </Typography>
    </>
  )
}

export { SearchResultsHeader }
