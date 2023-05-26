import { useNavigate } from "react-router-dom"
import { useUpdateContentMutation } from "dicty-graphql-schema"
import slugify from "slugify"

const useUpdateNews = (id: string | undefined, title: string) => {
  if (!id) throw new Error("Content ID not found")
  const [updateContent] = useUpdateContentMutation()
  const navigate = useNavigate()

  const handleUpdate = async (content: string) => {
    const updated = await updateContent({
      variables: {
        input: {
          id,
          name: title,
          slug: slugify(title, { lower: true }),
          content,
          updatedBy: "george@vandelayindustries.com",
        },
      },
    })
    navigate(`/news/${updated.data?.updateContent?.slug}`)
  }

  return { handleUpdate }
}

export default useUpdateNews
