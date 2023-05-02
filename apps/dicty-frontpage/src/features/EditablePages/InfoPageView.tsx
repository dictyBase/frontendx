import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { Editor } from "dicty-editor"
import Box from "@material-ui/core/Box"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import { appTheme } from "../../app/layout/AppProviders"
import InfoPageViewToolbar from "./InfoPageViewToolbar"

type Properties = {
  /** Page content object */
  data: ContentBySlugQuery["contentBySlug"]
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageView = ({ data }: Properties) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(`${location.pathname}/edit`, {
      state: {
        data,
      },
    })
  }

  return (
    <Box>
      {data?.updated_by && (
        <InfoPageViewToolbar
          handleClick={handleClick}
          lastUpdate={data?.updated_at}
          user={data.updated_by}
        />
      )}
      <ThemeProvider theme={appTheme}>
        <Editor content={data?.content} editable={false} />
      </ThemeProvider>
    </Box>
  )
}

export default InfoPageView
