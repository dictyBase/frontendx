import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import { ArrowLink } from "./ArrowLink"
import type { InfoCardProperties } from "./types"

const InfoCard = ({ title, icon, links, sx }: InfoCardProperties) => (
  <Card
    elevation={0}
    sx={{
      p: 3,
      borderRadius: dscHomeTheme.borderRadius.lg,
      bgcolor: dscHomeTheme.colors.cardBackground,
      boxShadow: dscHomeTheme.shadows.card,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: dscHomeTheme.shadows.cardHover,
      },
      ...sx,
    }}>
    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {icon && (
          <Box sx={{ fontSize: "1.5rem", mr: 1.5 }} component="span">
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{ color: dscHomeTheme.colors.primary, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {links.map((link) => (
          <ListItem
            key={link.href}
            sx={{ p: 0, mb: 1, "&:last-child": { mb: 0 } }}>
            <ArrowLink href={link.href} external={link.external}>
              {link.label}
            </ArrowLink>
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
)

export { InfoCard }
