import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import type { HeaderProperties } from "./types"

const Header = ({ navigation, logoHref = "/", sx }: HeaderProperties) => (
  <AppBar
    position="static"
    elevation={0}
    sx={{
      bgcolor: dscHomeTheme.colors.primary,
      ...sx,
    }}>
    <Toolbar>
      <Typography
        variant="h6"
        component="a"
        href={logoHref}
        sx={{
          flexGrow: 1,
          textDecoration: "none",
          color: "inherit",
          fontWeight: 700,
        }}>
        DSC
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {navigation.map((item) => (
          <Button
            key={item.href}
            href={item.href}
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                bgcolor: dscHomeTheme.colors.primaryLight,
              },
            }}>
            {item.label}
          </Button>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
)

export { Header }
