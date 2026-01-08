import { FC } from "react"
import { Box } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { useWindowSize } from "@dictybase/hook"

type HeightProperties = {
  height: number
}

const useStyles = makeStyles<HeightProperties>()((_, { height }) => ({
  root: {
    height,
  },
}))

const WindowHeightWrapper: FC = ({ children }) => {
  const { height: windowHeight } = useWindowSize()
  const { classes } = useStyles({ height: windowHeight * 0.6 })
  return <Box className={classes.root}>{children}</Box>
}

export { WindowHeightWrapper }
