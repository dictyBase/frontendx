import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { type CatalogItem } from "../types"
import { getCatalogItemPathAndDescriptor } from "../utils/getCatalogItemPathAndDescriptor"

type AddToCartDialogContentProperties = {
  /** Stock data */
  data: Array<CatalogItem>
}

/**
 * AddToCartDialogContent is the main content of the add to cart dialog box.
 */

const AddToCartDialogContent = ({ data }: AddToCartDialogContentProperties) => (
  <DialogContent>
    {data.map((item) => {
      const { itemPath, itemDescriptor } = getCatalogItemPathAndDescriptor(item)
      return (
        <DialogContentText key={item.id}>
          <Typography gutterBottom>
            <strong>
              <Link to={`/${itemPath}/${item.id}`}>{itemDescriptor}</Link>
            </strong>
          </Typography>
          <Typography gutterBottom>
            <em>{item.summary}</em>
          </Typography>
          <Typography variant="body2">{item.id}</Typography>
        </DialogContentText>
      )
    })}
  </DialogContent>
)

export { AddToCartDialogContent }
