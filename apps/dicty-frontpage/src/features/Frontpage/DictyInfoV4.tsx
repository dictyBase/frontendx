import { Box, makeStyles } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import { purple } from "@material-ui/core/colors"
import { NAMESPACE } from "../../common/constants/namespace"

const useStyles = makeStyles({
  root: {
    backgroundColor: purple[50],
    height: "100%",
    color: "#04313f",
    padding: "5rem",
  },
})

const DictyInfo = () => {
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-info` },
  })
  const classes = useStyles()
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <Box className={classes.root}>
          <Editor content={{ editorState: content, storageKey: slug }} />
        </Box>
      ),
    )
    .with({ data: { contentBySlug: P.nullish } }, () => <></>)
    .with({ loading: true }, () => <></>)
    .with({ error: P.select(P.not(undefined)) }, () => <></>)
    .otherwise(() => <> This message should not appear. </>)
}

export { DictyInfo }
