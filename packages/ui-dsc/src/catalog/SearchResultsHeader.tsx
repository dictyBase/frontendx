import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography"

const useStyles = makeStyles({
  title: {
    marginBottom: "10px",
  },
})

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
  const classes = useStyles()

  return (
    <>
      <Typography variant="h1" className={classes.title}>
        {property} Search Results
      </Typography>
      <Typography variant="h3" color="textSecondary">
        <em>{description}</em>
      </Typography>
    </>
  )
}

export { SearchResultsHeader }
