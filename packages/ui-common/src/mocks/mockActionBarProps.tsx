import { Button, Typography } from "@mui/material"

const mockActionBarPropsWithDescription = {
  descriptionElement: <Typography>This is a description</Typography>,
  children: [
    <Button key="1" variant="contained">
      Save
    </Button>,
    <Button key="2" variant="outlined">
      Cancel
    </Button>,
  ],
}

const mockActionBarPropsSingleChild = {
  descriptionElement: <Typography>Single action</Typography>,
  children: (
    <Button variant="contained" color="primary">
      Submit
    </Button>
  ),
}

const mockActionBarPropsNoDescription = {
  children: (
    <Button variant="contained" color="primary">
      Action
    </Button>
  ),
}

export {
  mockActionBarPropsWithDescription,
  mockActionBarPropsSingleChild,
  mockActionBarPropsNoDescription,
}
