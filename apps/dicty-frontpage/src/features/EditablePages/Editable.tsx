import { useParams } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { EditableView } from "./EditableView"
import { getSlug } from "../../common/utils/getSlug"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { Loader } from "../../common/components/Loader"

const Editable = () => {
  const { name, subname } = useParams()
  const slug = getSlug({ name, subname })
  const { loading, error, data } = useContentBySlugQuery({
    variables: { slug },
  })

  return match({ loading, error, data })
    .with({ loading: true }, () => <Loader />)
    .with({ error: P.select(P.not(undefined)) }, (error_) => (
      <GraphQLErrorPage error={error_} />
    ))
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditableView data={content} />,
    )
}

export { Editable as Show }
