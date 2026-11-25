import { type ReactNode } from "react"
import { Box } from "@mui/material"
import { useAuraStyles } from "../hooks/useAuraStyles"

type AuraProperties = {
  children: ReactNode
}

const Aura = ({ children }: AuraProperties) => {
  const styles = useAuraStyles()
  return <Box sx={styles.root}>{children}</Box>
}

export { Aura }
