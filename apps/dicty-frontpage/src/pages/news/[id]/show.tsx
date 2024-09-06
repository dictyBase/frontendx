import { useContentBySlugQuery } from "dicty-graphql-schema"
import { Typography, Container, Grid } from "@material-ui/core"
import { match, P } from "ts-pattern"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
  CopyLinkButton,
  BrowseNewsButton,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { Editor } from "@dictybase/editor"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { useSlug } from "../../../common/hooks/useSlug"

const Show = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NEWS_NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, created_at }) => (
        <Container>
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
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => <NotFoundError />),
    )
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default Show
export const access = ACCESS.public
