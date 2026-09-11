import {
  Box,
  Typography,
  Paper,
  Divider,
  Popper,
  ClickAwayListener,
} from "@mui/material"
import { match } from "ts-pattern"
import type { NavItem } from "./types"
import { ResultItem } from "./ResultItem"
import { ResultFooterLink } from "./ResultFooterLink"

type SearchDropdownProperties = {
  open: boolean
  anchorEl: HTMLDivElement | null
  navItems: Array<NavItem>
  activeIndex: number
  isLoading: boolean
  hasResults: boolean
  onClickAway: () => void
}

const SearchDropdown = ({
  open,
  anchorEl,
  navItems,
  activeIndex,
  isLoading,
  hasResults,
  onClickAway,
}: SearchDropdownProperties) => (
  <ClickAwayListener onClickAway={onClickAway}>
    <Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: anchorEl?.offsetWidth, zIndex: 1300 }}
        modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}>
        <Paper elevation={8} sx={{ borderRadius: "12px", overflow: "hidden" }}>
          {match({ isLoading, hasResults })
            .with({ isLoading: true }, () => (
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography sx={{ fontSize: "0.875rem", color: "#718096" }}>
                  Searching...
                </Typography>
              </Box>
            ))
            .with({ hasResults: true }, () => (
              <>
                {navItems.map((item, index) =>
                  match(item)
                    .with({ type: "strain" }, (s) => (
                      <ResultItem
                        key={s.id}
                        id={s.id}
                        descriptor={s.descriptor}
                        summary={s.summary}
                        path="strains"
                        kind="strain"
                        isActive={activeIndex === index}
                      />
                    ))
                    .with({ type: "plasmid" }, (p) => (
                      <ResultItem
                        key={p.id}
                        id={p.id}
                        descriptor={p.descriptor}
                        summary={p.summary}
                        path="plasmids"
                        kind="plasmid"
                        isActive={activeIndex === index}
                      />
                    ))
                    .with({ type: "strainFooter" }, (f) => (
                      <ResultFooterLink
                        key="strain-footer"
                        to={f.to}
                        label={f.label}
                        isActive={activeIndex === index}
                      />
                    ))
                    .with({ type: "plasmidFooter" }, (f) => (
                      <ResultFooterLink
                        key="plasmid-footer"
                        to={f.to}
                        label={f.label}
                        isActive={activeIndex === index}
                      />
                    ))
                    .with({ type: "divider" }, () => <Divider key="divider" />)
                    .exhaustive(),
                )}
              </>
            ))
            .otherwise(() => undefined)}
        </Paper>
      </Popper>
    </Box>
  </ClickAwayListener>
)

export { SearchDropdown }
