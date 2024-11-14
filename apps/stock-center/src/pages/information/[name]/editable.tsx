import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Container } from "@material-ui/core"
import { FullPageLoadingDisplay, GraphQLErrorPage } from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { NAMESPACE } from "../../../namespace"
import { useSlug } from "../../../hooks/useSlug"
import { EditableView } from "../../../components/EditableView"

const Editable = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (contentBySlug) => (
        <Container>
          <EditableView data={contentBySlug} />
        </Container>
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

// eslint-disable-next-line import/no-default-export
export default Editable
export const access = ACCESS.private
export const roles = ["content-admin"]
