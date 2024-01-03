import { Editor } from "editor"
import { useParams } from "react-router-dom"
import { useCreateContentMutation } from "dicty-graphql-schema"
import { NAMESPACE } from "../../common/constants/namespace"
import { getSlug } from "../../common/utils/getSlug"

const AddPageView = () => {
  const { name, subname } = useParams()
  const slug = getSlug({ name, subname })
  const [createContent] = useCreateContentMutation()
  const handleSave = (content: string) => {
    createContent({
      variables: {
        input: {
          content,
          // eslint-disable-next-line camelcase
          created_by: "Kevin Tun",
          namespace: NAMESPACE,
          name: slug,
        },
      },
    })
  }
  return <Editor editable handleSave={handleSave} />
}

export { AddPageView }
