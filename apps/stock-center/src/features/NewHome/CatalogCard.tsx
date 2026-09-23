import { Typography, Card, CardContent, List, ListItem } from "@mui/material"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { useNavigate } from "react-router-dom"
import { NestedLink } from "./NestedLink"

type CatalogCardProperties = {
  icon: string
  title: string
  href: string
  sublinks: Array<{
    label: string
    href: string
  }>
}

const CatalogCard = ({
  icon,
  title,
  href,
  sublinks,
}: CatalogCardProperties) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(href)
  }
  return (
    <Card
      elevation={1}
      onClick={onClick}
      sx={{
        flex: "1 1 240px",
        maxWidth: 320,
        borderRadius: "16px",
        border: "2px solid transparent",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          cursor: "pointer",
          transform: "translateY(-6px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          borderColor: "#004080",
        },
      }}>
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          gap: 2,
          p: 4,
          "&:last-child": { pb: 4 },
        }}>
        <Typography sx={{ fontSize: "3rem", lineHeight: 1 }}>{icon}</Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#1a202c",
          }}>
          {title}
        </Typography>
        <List sx={{ width: "100%" }}>
          {pipe(
            sublinks,
            Amap(({ label, href: subHref }) => (
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <NestedLink href={subHref}>{label}</NestedLink>
              </ListItem>
            )),
          )}
          <ListItem sx={{ px: 0, py: 0.5 }}>
            <NestedLink href={href}>Explore →</NestedLink>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export { CatalogCard }
