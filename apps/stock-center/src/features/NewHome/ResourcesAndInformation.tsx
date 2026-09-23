import { Box, Stack, Typography, List, ListItem } from "@mui/material"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"

type ResourcesAndInformationProperties = {
  resources: Array<{
    title: string
    links: Array<{ label: string; href: string }>
  }>
}

const ResourcesAndInformation = ({
  resources,
}: ResourcesAndInformationProperties) => (
  <Box sx={{ width: "100%" }}>
    <Stack direction="row" sx={{ width: "100%" }} justifyContent="space-around">
      {pipe(
        resources,
        Amap(({ title, links }) => (
          <Box>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {title}
            </Typography>
            <List sx={{ p: 0 }}>
              {pipe(
                links,
                Amap(({ href, label }) => (
                  <ListItem
                    key={href}
                    sx={{ p: 0, mb: 1, "&:last-child": { mb: 0 } }}>
                    <Link to={href}>{label}</Link>
                  </ListItem>
                )),
              )}
            </List>
          </Box>
        )),
      )}
    </Stack>
  </Box>
)

export { ResourcesAndInformation }
