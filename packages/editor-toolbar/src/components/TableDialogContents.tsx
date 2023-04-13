import {
  Button,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core"
import useTableFormControls from "../hooks/useTableFormControls"
import TableDialogTextFields from "./TableDialogTextFields"

const TableDialogContents = () => {
  const { textFieldProperties, handleConfirm } = useTableFormControls()

  return (
    <Card>
      <CardContent>
        <CardHeader title="Insert Table" />
        <Grid container direction="column" spacing={1}>
          <TableDialogTextFields textFieldProperties={textFieldProperties} />
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleConfirm}> Confirm </Button>
      </CardActions>
    </Card>
  )
}

export default TableDialogContents
