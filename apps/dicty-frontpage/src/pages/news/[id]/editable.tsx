import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { EditableView } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { useSlug } from "../../../common/hooks/useSlug"

const EditableNews = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NEWS_NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })

  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditableView data={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <NotFoundError />
      )),
    )
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default EditableNews
export const roles = ["content-admin"]
export const access = ACCESS.private
