import { type ReactNode } from "react"
import { Box } from "@mui/material"
import { useWindowSize } from "@dictybase/hook"

const WindowHeightWrapper = ({ children }: { children: ReactNode }) => {
  const { height: windowHeight } = useWindowSize()
  return <Box sx={{ height: `${windowHeight * 0.6}px` }}>{children}</Box>
}

export { WindowHeightWrapper }
