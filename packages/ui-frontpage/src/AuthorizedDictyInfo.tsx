import { Typography, Box, IconButton, makeStyles } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import { LoadingDisplay } from "@dictybase/ui-common"
import { ContentBySlugQueryHookResult } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import { teal } from "@material-ui/core/colors"
import { AuthorizedDictyInfoDisplay } from "./AuthorizedDictyInfoDisplay"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: teal[50],
    color: "#04313f",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
}))

type AuthorizedDictyInfoProperties = {
  result: ContentBySlugQueryHookResult
}

const AuthorizedDictyInfo = ({ result }: AuthorizedDictyInfoProperties) => {
  const classes = useStyles()
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <AuthorizedDictyInfoDisplay content={content} slug={slug} />
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

export { AuthorizedDictyInfo }
