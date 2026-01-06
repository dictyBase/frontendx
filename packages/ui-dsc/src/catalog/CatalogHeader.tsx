import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const useStyles = makeStyles((theme: Theme) => ({
  notice: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}))

type CatalogHeaderProperties = {
  /** Title of catalog page */
  title: "Strain Catalog" | "Plasmid Catalog"
}

/**
 * CatalogHeader is the header at the top of every stock catalog page.
 */

const CatalogHeader = ({ title }: CatalogHeaderProperties) => {
  const classes = useStyles()

  return (
    <Box textAlign="center" p={1}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
    </Box>
  )
}

export { CatalogHeader }
