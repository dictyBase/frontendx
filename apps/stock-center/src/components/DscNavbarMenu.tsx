import { useRef, Dispatch, SetStateAction } from "react"
import { Typography, Paper, Stack, Button, Popper } from "@mui/material"
import { indigo, blueGrey } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { Option, match as Omatch, some, none } from "fp-ts/Option"

type LinkProperties = { label: string; href: string; description?: string }

type NavbarDropdownSectionProperties = {
  category: Option<string>
  links: Array<LinkProperties>
}

const LinkGroup = ({ category, links }: NavbarDropdownSectionProperties) => (
  <Stack spacing={0.5}>
    {pipe(
      category,
      Omatch(
        () => <></>,
        (a) => <Typography variant="subtitle1">{a}</Typography>,
      ),
    )}
    {pipe(
      links,
      Amap(({ label, href }) => (
        <Typography
          component={Link}
          to={href}
          variant="body1"
          sx={{
            fontWeight: 500,
            color: blueGrey[700],
            "&:hover": { color: indigo[300] },
          }}>
          {label}
        </Typography>
      )),
    )}
  </Stack>
)

type DscNavbarDropdownProperties = {
  label: string
  setOpenMenu: Dispatch<SetStateAction<Option<string>>>
  sections: Array<Array<NavbarDropdownSectionProperties>>
  open: boolean
}

type MenuColumnProperties = {
  items: Array<NavbarDropdownSectionProperties>
}

const MenuColumn = ({ items }: MenuColumnProperties) => (
  <Stack direction="column" spacing={2}>
    {pipe(
      items,
      Amap(({ category, links }) => (
        <LinkGroup category={category} links={links} />
      )),
    )}
  </Stack>
)

const DscNavbarMenu = ({
  label,
  setOpenMenu,
  sections,
  open,
}: DscNavbarDropdownProperties) => {
  const anchorReference = useRef(null)
  const onMouseEnter = () => {
    setOpenMenu(some(label))
  }
  const onMouseLeave = () => {
    setOpenMenu(none)
  }
  return (
    <Button
      role="navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={anchorReference}
      sx={(theme) => ({
        color: theme.palette.primary.contrastText,
        alignSelf: "stretch",
      })}>
      {label}
      <Popper
        open={open}
        anchorEl={anchorReference.current}
        sx={{ zIndex: 9000 }}>
        <Paper elevation={4} sx={{ py: 3, px: 4, borderRadius: 3 }}>
          <Stack direction="row" spacing={8} flexWrap="nowrap">
            {pipe(
              sections,
              Amap((section) => <MenuColumn items={section} />),
            )}
          </Stack>
        </Paper>
      </Popper>
    </Button>
  )
}

export { DscNavbarMenu }
