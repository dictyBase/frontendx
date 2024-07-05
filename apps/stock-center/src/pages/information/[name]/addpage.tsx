import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Container } from "@material-ui/core"
import {
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { AddPageView } from "../../../components/AddPageView"
import { NAMESPACE } from "../../../namespace"
import { useSlug } from "../../../hooks/useSlug"
import { useContentPath } from "../../../hooks/useContentPath"

const AddPage = () => {
  const slug = useSlug()
  const contentPath = useContentPath()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  })
  return match({
    ...result,
  })
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ data: { contentBySlug: P.select({ content: P.string }) } }, () => (
      <Navigate to="../editable" replace relative="path" />
    ))
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <Container>
          <AddPageView
            namespace={NAMESPACE}
            name={slug}
            contentPath={contentPath}
          />
        </Container>
      )),
    )
    .otherwise(() => <> This message should not appear </>)
}

// eslint-disable-next-line import/no-default-export
export default AddPage
export const access = ACCESS.private
export const roles = ["content-admin"]
