import { FC } from "react"
import { Theme, Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useWindowSize } from "@dictybase/hook"

type HeightProperties = {
  height: number
}

const useStyles = makeStyles<Theme, HeightProperties>({
  root: {
    height: ({ height }) => height,
  },
})

const WindowHeightWrapper: FC = ({ children }) => {
  const { height: windowHeight } = useWindowSize()
  const classes = useStyles({ height: windowHeight * 0.6 })
  return (
    // eslint-disable-next-line dot-notation
    (<Box className={classes["root"]}>{children}</Box>)
  );
}

export { WindowHeightWrapper }
