import { useState } from "react"
import { Box, ButtonBase, Collapse, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap } from "fp-ts/Array"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"
import { SEARCH_MAX_WIDTH } from "./types"

/** An optional inline link rendered beneath a step's description. */
type StepLink = {
  /** The clickable text for the link. */
  label: string
  /** The internal route path the link navigates to. */
  href: string
}

/** A single step in the ordering process. */
type OrderingStep = {
  /** 1-based position in the ordering sequence. */
  step: number
  /** Emoji icon representing the step. */
  icon: string
  /** Short, scannable title for the step. */
  title: string
  /** Sentence-length explanation of what the user should do. */
  description: string
  /** Optional supplementary link rendered beneath the description. */
  link?: StepLink
}

/**
 * Ordered list of steps a user follows to place an order at the
 * Dicty Stock Center.
 */
const ORDERING_STEPS: Array<OrderingStep> = [
  {
    step: 1,
    icon: "🔍",
    title: "Search or Browse the Catalog",
    description:
      "Use the search bar above or explore the Strain and Plasmid catalogs to find the materials you need.",
  },
  {
    step: 2,
    icon: "🛒",
    title: "Add Items to Your Cart",
    description:
      "Open a catalog, select items, and click Add to Cart. You can include up to 12 items per order.",
  },
  {
    step: 3,
    icon: "📋",
    title: "Review Your Order",
    description:
      "Confirm item quantities and proceed to checkout to enter your institution and shipping details.",
  },
  {
    step: 4,
    icon: "💳",
    title: "Submit with Payment",
    description:
      "Provide your payment details. We accept purchase orders, credit cards, and institutional billing.",
    link: {
      label: "View accepted payment methods →",
      href: "/information/payment",
    },
  },
  {
    step: 5,
    icon: "📬",
    title: "Receive Confirmation",
    description:
      "Orders are typically processed within 2–3 business days. You will receive an email confirmation once your order ships.",
  },
]

/**
 * Expandable section displayed beneath the landing-page search bar that
 * walks users through the five steps needed to place an order at the
 * Dicty Stock Center.
 *
 * The section is collapsed by default; clicking the toggle button expands
 * or collapses the step list with a smooth animation.
 */
const OrderingSteps = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleLabel = pipe(
    isOpen,
    Bmatch(
      () => "How to place an order ▾",
      () => "How to place an order ▲",
    ),
  )

  return (
    <Box sx={{ width: "100%", maxWidth: SEARCH_MAX_WIDTH, my: 1.5 }}>
      <ButtonBase
        aria-expanded={isOpen}
        aria-controls="ordering-steps-content"
        onClick={() => setIsOpen((previous) => !previous)}
        sx={(theme) => ({
          width: "100%",
          justifyContent: "center",
          py: 0.75,
          px: 2,
          borderRadius: "8px",
          color: theme.palette.secondary.dark,
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "background-color 0.15s ease",
          "&:hover": { backgroundColor: "rgba(49, 130, 206, 0.07)" },
        })}>
        {toggleLabel}
      </ButtonBase>

      <Collapse in={isOpen} unmountOnExit>
        <Box
          id="ordering-steps-content"
          sx={{
            mt: 1.5,
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1.5px solid #e2e8f0",
            p: 3,
          }}>
          {pipe(
            ORDERING_STEPS,
            Amap(({ step, icon, title, description, link }) => (
              <Box
                key={step}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2.5,
                  "&:last-child": { mb: 0 },
                }}>
                {/* Numbered circle */}
                <Box
                  aria-hidden="true"
                  sx={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#2b6cb0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0.25,
                  }}>
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      lineHeight: 1,
                    }}>
                    {step}
                  </Typography>
                </Box>

                {/* Step body */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}>
                    <Typography
                      aria-hidden="true"
                      sx={{ fontSize: "1.1rem", lineHeight: 1 }}>
                      {icon}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.925rem",
                        color: "#1a202c",
                      }}>
                      {title}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#718096",
                      lineHeight: 1.65,
                    }}>
                    {description}
                  </Typography>

                  {pipe(
                    OfromNullable(link),
                    Omatch(
                      () => <></>,
                      ({ label, href }) => (
                        <Typography
                          component={Link}
                          to={href}
                          sx={{
                            display: "inline-block",
                            mt: 0.75,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#3182ce",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}>
                          {label}
                        </Typography>
                      ),
                    ),
                  )}
                </Box>
              </Box>
            )),
          )}
        </Box>
      </Collapse>
    </Box>
  )
}

export { OrderingSteps }
