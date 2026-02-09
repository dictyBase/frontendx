import Skeleton from "react-loading-skeleton"
import { Box } from "@mui/material"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import { NAMESPACE } from "../../common/constants/namespace"

const dataPattern = {
  data: {
    contentBySlug: {
      content: P.select("content"),
      slug: P.select("slug"),
    },
  },
}
const LoadingDisplay = () => (
  <Box>
    <br />
    <Skeleton count={2} />
    <br />
    <br />
    <Skeleton count={5} />
  </Box>
)

/**
 * Displays the Special Thanks section of the About page.
 */

const TechnicalSummary = () => {
  const result = useContentBySlugQuery({
    variables: {
      slug: `${NAMESPACE}-technicalsummary`,
    },
  })
  return (
    <>
      {match(result)
        .with(dataPattern, ({ content, slug }) => (
          <Editor
            content={{
              editorState: content,
              storageKey: slug,
            }}
            editable={false}
          />
        ))
        .with({ loading: true }, () => <LoadingDisplay />)
        .with({ error: P.not(undefined) }, () => (
          <Box>Error retrieving technical summary information</Box>
        ))
        .otherwise(() => (
          <></>
        ))}
    </>
  )
}

export { TechnicalSummary }
