import { useNavigate } from "react-router-dom"
import { useUpdateContentMutation } from "dicty-graphql-schema"

const useUpdateNews = (
  id: string | undefined,
  slug: string | undefined,
  title: string,
) => {
  if (!slug) throw new Error("Slug not found")
  if (!id) throw new Error("Content ID not found")
  const [updateContent] = useUpdateContentMutation()
  const navigate = useNavigate()

  const handleUpdate = async (content: string) => {
    const updated = await updateContent({
      variables: {
        input: {
          id,
          name: title,
          slug,
          content,
          updatedBy: "george@vandelayindustries.com",
        },
      },
    })
    navigate(`/news/${updated.data?.updateContent?.slug}`)
  }

  return { handleUpdate }
}

export { useUpdateNews }
