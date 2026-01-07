import { FC } from "react"
import { Theme, Box } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import { useWindowSize } from "@dictybase/hook"

type HeightProperties = {
  height: number
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles()({
  root: {
    height: ({ height }) => height,
  },
});

const WindowHeightWrapper: FC = ({ children }) => {
  const { height: windowHeight } = useWindowSize()
  const { classes } = useStyles({ height: windowHeight * 0.6 })
  return (
    // eslint-disable-next-line dot-notation
    (<Box className={classes["root"]}>{children}</Box>)
  );
}

export { WindowHeightWrapper }
