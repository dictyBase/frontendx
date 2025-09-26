import { Grid } from "@mui/material"
import { ColorOptionButton } from "./ColorOptionButton"

type ColorPickerProperties = {
  colorOptions: string[]
}

const ColorPicker = ({ colorOptions }: ColorPickerProperties) => (
  <Grid
    container
    spacing={1}
    sx={{
      padding: "5px",
      margin: 0,
    }}>
    {colorOptions.map((color) => (
      <Grid key={color} item>
        <ColorOptionButton color={color} />
      </Grid>
    ))}
  </Grid>
)

export { ColorPicker }
