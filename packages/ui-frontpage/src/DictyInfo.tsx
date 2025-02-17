import { Typography, Box, makeStyles } from "@material-ui/core"
import { LoadingDisplay } from "@dictybase/ui-common"
import { ContentBySlugQueryHookResult } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import { teal } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: teal[50],
    color: "#04313f",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
}))

type DictyInfoProperties = {
  result: ContentBySlugQueryHookResult
}

const DictyInfo = ({ result }: DictyInfoProperties) => {
  const classes = useStyles()
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <Box className={classes.root}>
          <Typography color="secondary" variant="h2">
            Dictyostelium discoideum
          </Typography>
          <Editor content={{ editorState: content, storageKey: slug }} />
        </Box>
      ),
    )
    .with({ data: { contentBySlug: P.nullish } }, () => <></>)
    .with({ loading: true }, () => (
      <Box className={classes.root}>
        <LoadingDisplay rows={5} />
      </Box>
    ))
    .with({ error: P.select(P.not(undefined)) }, () => <></>)
    .otherwise(() => <> This message should not appear. </>)
}

export { DictyInfo }
