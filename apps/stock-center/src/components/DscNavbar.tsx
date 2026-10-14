import { useRef } from "react"
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
  Toolbar,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from "@mui/icons-material/Search"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"
import { currentCartQuantityAtom } from "../cartState"
import { useComprehensiveSearch } from "../features/NewHome/useComprehensiveSearch"
import { SearchDropdown } from "../features/NewHome/SearchDropdown"
import { MIN_CHARS } from "../features/NewHome/types"

const NAV_BG = "#004080"

/**
 * Routes that already provide their own full-page search experience.
 * The navbar search input is suppressed on these paths.
 */
const SEARCH_HIDDEN_PATHS = new Set(["/", "/catalog"])

/** A single navigation link rendered directly in the toolbar. */
type NavItem = {
  /** Visible button label. */
  label: string
  /** Internal route path the button navigates to. */
  href: string
}

/**
 * All top-level navigation links exposed in the toolbar.
 * Catalog browsing and every ordering-flow page each get their own button.
 */
const NAV_ITEMS: Array<NavItem> = [
  { label: "Catalog", href: "/catalog" },
  { label: "Order Information", href: "/information/order" },
  { label: "Payment Information", href: "/information/payment" },
  { label: "Deposit Information", href: "/information/deposit" },
  { label: "FAQs", href: "/information/faq" },
]

/** Shared sx styles applied to every nav button in the toolbar. */
const navButtonSx = {
  color: "#ffffff",
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
        <Box
          data-testid="navbar-search-backdrop"
          onClick={handleClickAway}
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1200,
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

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: NAV_BG, zIndex: 1300, mb: 4 }}>
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
            Dicty Stock Center
          </Button>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(255,255,255,0.25)", mx: 0.5 }}
          />

          {/* Catalog + ordering links — one button each */}
          {pipe(
            NAV_ITEMS,
            Amap(({ label, href }) => (
              <Button
                key={href}
                onClick={() => navigate(href)}
                sx={navButtonSx}>
                {label}
              </Button>
            )),
          )}

          <Box sx={{ flex: 1 }} />

          {/* Contextual search — suppressed on pages with their own search */}
          {pipe(
            SEARCH_HIDDEN_PATHS.has(pathname),
            Bmatch(
              () => <NavbarSearch />,
              () => null,
            ),
          )}

          {/* Cart */}
          <IconButton
            aria-label={cartAriaLabel}
            onClick={() => navigate("/cart")}
            sx={{ color: "#ffffff" }}>
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
