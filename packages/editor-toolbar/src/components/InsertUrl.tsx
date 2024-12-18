import { useState } from "react"
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core"

type InsertUrlProperties = {
  fileUrl: string
}

const InsertUrl = ({ fileUrl }: InsertUrlProperties) => {
  const [linkText, setLinkText] = useState(fileUrl)

  return (
    <>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Edit and Insert Link </Typography>
      </DialogTitle>
      <DialogContent>{fileUrl}</DialogContent>
      <DialogActions>
        <Button type="button">Insert Link</Button>
      </DialogActions>
    </>
  )
}

export { InsertUrl }
