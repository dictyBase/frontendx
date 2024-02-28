import { Grid, makeStyles } from "@material-ui/core"
import { CartIcon } from "@dictybase/ui-dsc"
import { useAtomValue } from "jotai"
import { Outlet } from "react-router-dom"
import { Breadcrumbs } from "./Breadcrumbs"
import { isFullAtom, strainItemsAtom } from "../state"

const useStyles = makeStyles({
  container: {
    marginBottom: "1rem",
  },
})
/**
 * This is the cart component that displays between the Navbar and body content on every page.
 * It has a cart icon with the current number of added items next to it.
 */
const HeaderRow = () => {
  const isFull = useAtomValue(isFullAtom)
  const strainItems = useAtomValue(strainItemsAtom)
  const { container } = useStyles()

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={container}>
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid item>
          <CartIcon isFull={isFull} items={strainItems} />
        </Grid>
      </Grid>
      <Outlet />
    </>
  )
}

export { HeaderRow }
