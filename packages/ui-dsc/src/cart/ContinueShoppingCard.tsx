import { Link } from "react-router-dom"
import { Theme } from "@mui/material/styles";
import { makeStyles } from 'tss-react/mui';
import { grey } from "@mui/material/colors"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles()((theme: Theme) => ({
  continueBtn: {
    fontWeight: 600,
    marginTop: theme.spacing(2),
    "&:hover": {
      color: grey[900],
    },
  },
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: grey[100],
  },
}));

/**
 * ContinueShoppingCard is the card below the total/checkout card on the cart page.
 */
const ContinueShoppingCard = () => {
  const { classes } = useStyles()

  return (
    (<Card className={classes.card}>
      <Typography variant="h3" align="center">
        Need something else?
      </Typography>
      <Button
        component={Link}
        to="/strains"
        variant="contained"
        size="large"
        fullWidth
        startIcon={<FontAwesomeIcon icon="share" />}
        className={classes.continueBtn}>
        Strains Catalog
      </Button>
      <Button
        component={Link}
        to="/plasmids"
        variant="contained"
        size="large"
        fullWidth
        startIcon={<FontAwesomeIcon icon="share" />}
        className={classes.continueBtn}>
        Plasmids Catalog
      </Button>
    </Card>)
  );
}

export { ContinueShoppingCard }
