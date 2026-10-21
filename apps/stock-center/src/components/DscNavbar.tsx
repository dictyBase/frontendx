import { useRef, useState } from "react"
import {
  AppBar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Portal,
  Toolbar,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from "@mui/icons-material/Search"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"
import {
  Option,
  some,
  none,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { currentCartQuantityAtom } from "../cartState"
import { useComprehensiveSearch } from "../features/NewHome/useComprehensiveSearch"
import { SearchDropdown } from "../features/NewHome/SearchDropdown"
import { MIN_CHARS } from "../features/NewHome/types"
import { DscNavbarMenu } from "./DscNavbarMenu"

/**
 * Routes that already provide their own full-page search experience.
 * The navbar search input is suppressed on these paths.
 */
const SEARCH_HIDDEN_PATHS = new Set(["/", "/catalog"])

const createAuthNavbarItems = (
  frontPageUrl: string,
  stockCenterUrl: string,
) => ({
  data: [
    // {
    //   label: "Genomes",
    //   sections: [
    //     [
    //       {
    //         category: some("GENOMES"),
    //         links: [
    //           {
    //             label: "Dictyostelium discoideum AX4",
    //             href: "/",
    //           },
    //           {
    //             label: "Dictyostelium purpureum AX1",
    //             href: "http://genomes.dictybase.org/purpureum",
    //           },
    //           {
    //             label: "Dictyostelium fasciculatum SH3",
    //             href: "http://genomes.dictybase.org/fasciculatum",
    //           },
    //           {
    //             label: "Polysphondylium pallidum PN500",
    //             href: "http://genomes.dictybase.org/pallidum",
    //           },
    //         ],
    //       },
    //     ],
    //   ],
    // },
    // {
    //   label: "Tools",
    //   sections: [
    //     [
    //       {
    //         category: some("TOOLS"),
    //         links: [
    //           {
    //             label: "Genome Browser",
    //             href: "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
    //           },
    //           {
    //             label: "Dashboard",
    //             href: "/dictyaccess",
    //           },
    //         ],
    //       },
    //     ],
    //   ],
    // },
    {
      label: "Explore",
      sections: [
        [
          {
            category: some("EXPLORE"),
            links: [
              {
                label: "Dicty Art",
                href: `${stockCenterUrl}/explore/art/show`,
              },
              {
                label: "Gallery",
                href: `${stockCenterUrl}/explore/gallery/show`,
              },
              {
                label: "Learn About Dicty",
                href: `${stockCenterUrl}/explore/learn/show`,
              },
              {
                label: "Teaching Protocols",
                href: `${stockCenterUrl}/explore/teach/show`,
              },
              {
                label: "Useful Links",
                href: `${stockCenterUrl}/explore/links/show`,
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Research",
      sections: [
        [
          {
            category: some("RESEARCH"),
            links: [
              {
                label: "Techniques",
                href: `${stockCenterUrl}/research/techniques/show`,
              },
              {
                label: "Anatomy Ontology",
                href: `${stockCenterUrl}/research/ontology/show`,
              },
              {
                label: "Codon Bias Table",
                href: `${stockCenterUrl}/research/codon/show`,
              },
              {
                label: "Nomenclature Guidelines",
                href: `${stockCenterUrl}/research/nomenclature/show`,
              },
              {
                label: "Phenotyping",
                href: `${stockCenterUrl}/research/phenotype/show`,
              },
              {
                label: "Axenic Strain History",
                href: `${stockCenterUrl}/research/strain-history/show`,
              },
              {
                label: "Track Maxima",
                href: `${stockCenterUrl}/research/trackmaxima/show`,
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Dicty Stock Center",
      sections: [
        [
          {
            category: some("HOME"),
            links: [
              {
                label: "Stock Center Home",
                href: `${stockCenterUrl}`,
              },
            ],
          },
          {
            category: some("CATALOGS"),
            links: [
              {
                label: "Full Catalog",
                href: `${stockCenterUrl}/catalog`,
              },
              {
                label: "Strains",
                href: `${stockCenterUrl}/strains`,
              },
              {
                label: "Plasmids",
                href: `${stockCenterUrl}/plasmids`,
              },
            ],
          },
        ],
        [
          {
            category: some("INFORMATION"),
            links: [
              {
                label: "Ordering",
                href: `${stockCenterUrl}/information/order/show`,
              },
              {
                label: "Depositing Materials",
                href: `${stockCenterUrl}/information/deposit/show`,
              },
              {
                label: "Payment Information",
                href: `${stockCenterUrl}/information/payment/show`,
              },
              {
                label: "Standard Operating Procedures",
                href: "https://northwestern.box.com/s/p0f8m70whgiuib2u0wt8gtn497ncmq8i",
              },
              {
                label: "FAQ",
                href: `${stockCenterUrl}/information/faq/show`,
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Community",
      sections: [
        [
          {
            category: some("COMMUNITY"),
            links: [
              {
                label: "Cite Us",
                href: `${stockCenterUrl}/community/citation/show`,
              },
              {
                label: "Dicty Annual Conferences",
                href: `${stockCenterUrl}/community/conference/show`,
              },
              {
                label: "Dicty Email Forum",
                href: `${stockCenterUrl}/community/listserv/show`,
              },
              {
                label: "Dicty Labs",
                href: `${stockCenterUrl}/community/labs/show`,
              },
              {
                label: "History",
                href: `${stockCenterUrl}/community/history/show`,
              },
              {
                label: "Jobs",
                href: `${stockCenterUrl}/community/jobs/show`,
              },
              {
                label: "Community Annotations",
                href: `${stockCenterUrl}/community/annotations/show`,
              },
            ],
          },
        ],
      ],
    },
  ],
})

export { createAuthNavbarItems }
/** Shared sx styles applied to every nav button in the toolbar. */
const navButtonSx = {
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
} as const

/**
 * Compact search bar rendered inside the navbar on pages that do not have
 * their own full-page search (i.e. any page other than `/` and `/catalog`).
 *
 * Reuses {@link useComprehensiveSearch} and {@link SearchDropdown} from the
 * landing-page hero search. The input and backdrop are styled to fit the dark
 * toolbar while preserving identical query and keyboard-navigation behaviour.
 */
const NavbarSearch = () => {
  const anchorReference = useRef<HTMLDivElement>(null)
  const {
    inputValue,
    searchTerm,
    open,
    activeIndex,
    navItems,
    isLoading,
    hasResults,
    handleInputChange,
    handleKeyDown,
    handleClickAway,
    handleFocus,
  } = useComprehensiveSearch()

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative", width: 320 }}>
        <Paper
          ref={anchorReference}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            height: 38,
            px: 1.5,
            zIndex: 1200,
            backgroundColor: "#ffffff",
            border: "1.5px solid #e2e8f0",
          }}>
          <SearchIcon
            sx={{
              color: "#a0aec0",
              fontSize: "1.1rem",
              mr: 0.75,
            }}
          />
          <InputBase
            fullWidth
            placeholder="Search strains and plasmids"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            sx={{
              color: "#1a202c",
              fontSize: "0.875rem",
              "& input::placeholder": {
                color: "#a0aec0",
                opacity: 1,
              },
            }}
            inputProps={{ "aria-label": "search strains and plasmids" }}
          />
        </Paper>

        <SearchDropdown
          open={open && searchTerm.length >= MIN_CHARS}
          anchorEl={anchorReference.current}
          navItems={navItems}
          activeIndex={activeIndex}
          isLoading={isLoading}
          hasResults={hasResults}
          searchTerm={searchTerm}
        />

        {/* Backdrop — clicking it closes the dropdown */}
        <Portal>
          <Box
            data-testid="navbar-search-backdrop"
            onClick={handleClickAway}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1299,
              backgroundColor: "rgba(0,0,0,0.3)",
              opacity: pipe(
                open,
                Bmatch(
                  () => 0,
                  () => 1,
                ),
              ),
              pointerEvents: pipe(
                open,
                Bmatch(
                  () => "none" as const,
                  () => "auto" as const,
                ),
              ),
              transition: "opacity 0.2s ease",
            }}
          />
        </Portal>
      </Box>
    </ClickAwayListener>
  )
}

/**
 * Application-level navigation bar and layout wrapper for the Dicty Stock
 * Center. Renders a sticky top bar then delegates page content via
 * `<Outlet />`.
 *
 * The bar exposes:
 * - A brand link back to the home page.
 * - Individual buttons for **Catalog**, **Order Information**, **Payment
 *   Information**, **Deposit Information**, and **FAQs**.
 * - A compact search input (left of the cart) on every page except `/` and
 *   `/catalog`, which provide their own full-page search experience.
 * - A shopping-cart icon badge showing the live item count, linking to the
 *   cart page.
 *
 * This component replaces the legacy `HeaderWithAuth` + `NavbarWithAuth`
 * pair and must be rendered inside a React Router context (it uses
 * `useNavigate`, `useLocation`, and renders `<Outlet />`).
 */
const DscNavbar = () => {
  const [openMenu, setOpenMenu] = useState<Option<string>>(none)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const cartCount = useAtomValue(currentCartQuantityAtom)

  const cartAriaLabel = `Cart, ${cartCount} item${pipe(
    cartCount === 1,
    Bmatch(
      () => "s", // onFalse: not exactly 1 → plural
      () => "", //  onTrue: exactly 1 → singular
    ),
  )}`

  const { data: navItems } = createAuthNavbarItems(
    import.meta.env.VITE_APP_FRONTPAGE_URL,
    import.meta.env.VITE_APP_STOCKCENTER_URL,
  )

  return (
    <>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.dark,
          zIndex: 1300,
          mb: 4,
        })}>
        <Toolbar sx={{ gap: 0.5 }}>
          {/* Brand */}
          <Button
            onClick={() => navigate("/")}
            sx={{
              ...navButtonSx,
              fontWeight: 700,
              fontSize: "1rem",
              mr: 1,
            }}>
            <Box
              aria-label="logo"
              sx={(theme) => ({
                width: 120,
                height: 60,
                backgroundColor: theme.palette.primary.contrastText,
                maskImage: `url(${import.meta.env.BASE_URL}/logo.svg)`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              })}
            />
          </Button>

          <Divider
            orientation="vertical"
            flexItem
            sx={(theme) => ({
              borderColor: theme.palette.primary.contrastText,
              mx: 0.5,
            })}
          />

          {/* Catalog + ordering links */}
          {pipe(
            navItems,
            Amap(({ label, sections }) => (
              <DscNavbarMenu
                key={label}
                setOpenMenu={setOpenMenu}
                label={label}
                sections={sections}
                open={pipe(
                  openMenu,
                  Omap((a) => a === label),
                  OgetOrElse(() => false),
                )}
              />
            )),
          )}
          <Box sx={{ flex: 1 }} />

          {/* Contextual search — suppressed on pages with their own search */}
          {pipe(
            SEARCH_HIDDEN_PATHS.has(pathname),
            Bmatch(
              () => <NavbarSearch />,
              () => <></>,
            ),
          )}

          {/* Cart */}
          <IconButton
            aria-label={cartAriaLabel}
            onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  )
}

export { DscNavbar }
