import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { Editor } from "dicty-editor"
import Box from "@material-ui/core/Box"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import { appTheme } from "../../app/layout/AppProviders"
import InfoPageViewToolbar from "./InfoPageViewToolbar"
import Fallback from "../../common/components/Fallback"

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

  if (!data) return <Fallback />

  return (
    <Box>
      <InfoPageViewToolbar
        handleClick={handleClick}
        lastUpdate={data.updatedAt}
        user={data.updatedBy}
      />
      <ThemeProvider theme={appTheme}>
        <Editor
          editable={false}
          content={{ storageKey: data.slug, editorState: data.content }}
        />
      </ThemeProvider>
    </Box>
  )
}

export default InfoPageView
