import { MouseEventHandler } from "react"
import { pipe } from "fp-ts/function"
import { map as Amap, head as Ahead, tail as Atail } from "fp-ts/Array"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { Stack, Box, Card, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { blueGrey } from "@mui/material/colors"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Plasmid2Icon } from "../../icons/Plasmid2Icon"

type CatalogCardBProperties = {
  description: string
  links: Array<{ href: string; label: string }>
}

const CatalogCardB = ({ links, description }: CatalogCardBProperties) => {
  const mainLink = pipe(
    links,
    Ahead,
    OgetOrElse(() => ({ label: "No link provided", href: "/" })),
  )
  const subLinks = pipe(
    links,
    Atail,
    OgetOrElse(() => [] as Array<{ href: string; label: string }>),
  )
  const navigate = useNavigate()
  const onCardClick: MouseEventHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    navigate(mainLink.href)
  }
  return (
    <Card
      onClick={onCardClick}
      elevation={0}
      sx={(theme) => ({
        height: "100%",
        p: 2,
        borderRadius: theme.shape.borderRadius,
        border: `solid 2px ${theme.palette.secondary.light}`,
        transition: "all 0.3s ease",
        backgroundColor: theme.palette.primary.light,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[2],
          cursor: "pointer",
        },
      })}>
      <Stack sx={{ height: "100%" }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Plasmid2Icon fontSize="large" color="tertiary" />
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon htmlColor={blueGrey[700]} />}>
            <Typography
              flexGrow={1}
              sx={{
                textWrap: "nowrap",
                fontSize: 18,
                fontWeight: 600,
                color: blueGrey[700],
              }}>
              {mainLink.label}
            </Typography>
          </Button>
        </Stack>
        <Box flexGrow={1}>
          <Typography
            variant="body2"
            color={blueGrey[800]}
            fontSize={12}
            sx={{ px: 1, pb: 2 }}>
            {description}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} justifyContent="stretch">
          {pipe(
            subLinks,
            Amap(({ label, href }) => (
              <Button
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  navigate(href)
                }}
                color="primary"
                variant="outlined"
                sx={{
                  // textWrap: "nowrap",
                  color: blueGrey[700],
                  borderColor: blueGrey[100],
                  borderWidth: "2px",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: blueGrey[300],
                    borderWidth: "2px",
                  },
                }}>
                {label}
              </Button>
            )),
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export { CatalogCardB }
