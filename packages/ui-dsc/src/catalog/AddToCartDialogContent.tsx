import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { strainOrPlasmid } from "../utils/strainOrPlasmid"
import { CartItem } from "../types"

type AddToCartDialogContentProperties = {
  /** Stock data */
  data: Array<Pick<CartItem, "id" | "label" | "summary">>
}

/**
 * AddToCartDialogContent is the main content of the add to cart dialog box.
 */

const AddToCartDialogContent = ({ data }: AddToCartDialogContentProperties) => (
  <DialogContent>
    {data.map((item) => (
      <DialogContentText key={item.id}>
        <Typography gutterBottom>
          <strong>
            <Link to={`/${strainOrPlasmid(item.id)}/${item.id}`}>
              {item.label}
            </Link>
          </strong>
        </Typography>
        <Typography gutterBottom>
          <em>{item.summary}</em>
        </Typography>
        <Typography variant="body2">{item.id}</Typography>
      </DialogContentText>
    ))}
  </DialogContent>
)

export { AddToCartDialogContent }
