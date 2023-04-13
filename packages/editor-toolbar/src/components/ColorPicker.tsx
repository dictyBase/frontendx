import { Grid } from "@material-ui/core"
import useColorPickerStyles from "../hooks/useColorPickerStyles"
import ColorOptionButton from "./ColorOptionButton"

type ColorPickerProperties = {
  colorOptions: string[]
}

const ColorPicker = ({ colorOptions }: ColorPickerProperties) => {
  const { root } = useColorPickerStyles()

  return (
    <Grid container spacing={1} className={root}>
      {colorOptions.map((color) => (
        <Grid key={color} item>
          <ColorOptionButton color={color} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ColorPicker
