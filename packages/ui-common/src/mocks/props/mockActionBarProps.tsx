import { Button, Typography } from "@mui/material"

const mockActionBarPropsArray = [
  {
    descriptionElement: <Typography>This is a description</Typography>,
    children: [
      <Button key="1" variant="contained">
        Save
      </Button>,
      <Button key="2" variant="outlined">
        Cancel
      </Button>,
    ],
  },
  {
    descriptionElement: <Typography>Single action</Typography>,
    children: (
      <Button variant="contained" color="primary">
        Submit
      </Button>
    ),
  },
  {
    children: (
      <Button variant="contained" color="primary">
        Action
      </Button>
    ),
  },
]

export { mockActionBarPropsArray }
