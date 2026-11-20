import React from "react"
import { Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TechnicalSummary } from "./TechnicalSummary"
import { SpecialThanks } from "./SpecialThanks"

const itemStyle = {
  width: "50%",
  paddingLeft: "50px",
  paddingBottom: "50px",
  paddingRight: "20px",
  "@media (max-width: 767px)": {
    paddingLeft: "50px",
    paddingBottom: "5px",
    paddingRight: "50px",
    width: "100%",
  },
}

/**
 * This is the About page component. It is the wrapper for two individual components.
 */

const About = () => (
  <Box>
    <title>About Us - dictyBase</title>
    <meta name="description" content="About Us page for dictyBase" />
    <Box
      sx={{
        minHeight: "150px",
        textAlign: "center",
        padding: "48px 30px 48px 30px",
        backgroundColor: "#E0F2F7",
      }}>
      <Box
        component="h1"
        sx={{
          backgroundColor: "#E0F2F7",
          "@media (minWidth: 768px)": {
            fontSize: "63px",
            padding: "2px",
            margin: "2px",
          },
        }}>
        About Us
      </Box>
      <Box component="p" sx={{ fontSize: "21px" }}>
        We{"  "}
        <FontAwesomeIcon icon="heart" size="2x" />
        {"  "}dictyBase
      </Box>
    </Box>
    <br />
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "90%",
        margin: "auto",
        "@media (max-width: 767px)": {
          flexWrap: "wrap",
        },
      }}>
      <Box sx={itemStyle}>
        <TechnicalSummary />
      </Box>
      <Box sx={itemStyle}>
        <SpecialThanks />
      </Box>
    </Box>
  </Box>
)

export { About }
