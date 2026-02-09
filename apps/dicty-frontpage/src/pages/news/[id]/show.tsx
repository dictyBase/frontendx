import { useContentBySlugQuery } from "dicty-graphql-schema"
import { Typography, Container, Grid } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import { match, P } from "ts-pattern"
import {
  FullPageLoadingDisplay,
  CopyLinkButton,
  BrowseNewsButton,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth-mui5"
import { Editor } from "@dictybase/editor"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import { ErrorPageWrapper } from "../../../common/components/errors/ErrorPageWrapper"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { useSlug } from "../../../common/hooks/useSlug"

const useStyles = makeStyles()((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Show = () => {
  const { classes } = useStyles()
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NEWS_NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, created_at }) => (
        <Container className={classes.container}>
          <Grid spacing={1} container alignItems="baseline">
            <Grid item>
              <Typography variant="h2">
                {pipe(created_at, parseISO, format("PPPP"))}
              </Typography>
            </Grid>
            <Grid item>
              <CopyLinkButton />
            </Grid>
            <Grid item>
              <BrowseNewsButton />
            </Grid>
          </Grid>
          <Editor content={{ storageKey: undefined, editorState: content }} />
        </Container>
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default Show
export const access = ACCESS.public
