import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Container } from "@material-ui/core"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth-mui5"
import { ErrorPageWrapper } from "@dictybase/ui-dsc"
import { NAMESPACE } from "../../../namespace"
import { useSlug } from "../../../hooks/useSlug"
import { ShowView } from "../../../components/ShowView"

const Show = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => (
        <Container>
          <ShowView data={content} />
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
