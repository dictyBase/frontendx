import { Grid } from "@mui/material"
import { useColorPickerStyles } from "../hooks/useColorPickerStyles"
import { ColorOptionButton } from "./ColorOptionButton"

type ColorPickerProperties = {
  colorOptions: string[]
}

const ColorPicker = ({ colorOptions }: ColorPickerProperties) => {
  const styles = useColorPickerStyles()

  return (
    <Grid container spacing={1} sx={styles.root}>
      {colorOptions.map((color) => (
        <Grid key={color} item>
          <ColorOptionButton color={color} />
        </Grid>
      ))}
    </Grid>
  )
}

export { ColorPicker }
