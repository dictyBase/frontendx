import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import {
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { Container } from "@material-ui/core"
import { ACCESS } from "@dictybase/auth"
import { match, P } from "ts-pattern"
import { EditView } from "../../../components/EditView"
import { NAMESPACE } from "../../../namespace"
import { useSlug } from "../../../hooks/useSlug"

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  return match(result)
    .with(
      {
        data: { contentBySlug: P.select({ content: P.string }) },
      },
      (content) => (
        <Container>
          <EditView data={content} />
        </Container>
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <Navigate to="../notfoundauth" replace relative="path" />
      )),
    )
    .otherwise(() => <> This message should not appear </>)
}

// eslint-disable-next-line import/no-default-export
export default Edit
export const access = ACCESS.private
export const roles = ["content-admin"]
