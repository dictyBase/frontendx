import { useNavigate } from "react-router-dom"
import { useCreateContentMutation } from "dicty-graphql-schema"
import slugify from "slugify"

const useCreateNews = (title: string) => {
  const [createContent] = useCreateContentMutation()
  const navigate = useNavigate()

  const handleCreate = async (content: string) => {
    const created = await createContent({
      variables: {
        input: {
          content,
          slug: slugify(title, { lower: true }),
          name: title,
          namespace: "news",
          createdBy: "george@vandelayindustries.com",
        },
      },
    })
    navigate(`/news/${created.data?.createContent?.slug}`)
  }

  return { handleCreate }
}

export { useCreateNews }
