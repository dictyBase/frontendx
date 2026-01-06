import { Link } from "react-router-dom"
import Typography from "@mui/material/Typography"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
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
