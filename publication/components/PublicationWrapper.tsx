import { Publication } from "dicty-graphql-schema"
import PublicationContent from "./PublicationContent"

interface PublicationWrapperProps {
  data: Publication
}

const PublicationWrapper = ({ data }: PublicationWrapperProps) => {
  // Since a title will always be present set title as string
  const title = data.title as string
  return <PublicationContent title={title} data={data} />
}

export default PublicationWrapper
