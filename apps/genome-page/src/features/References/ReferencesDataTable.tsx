import OtherError from "components/errors/OtherError"
import { GeneQuery, PublicationWithGene } from "dicty-graphql-schema"

interface Props {
  data: GeneQuery
}

const ReferencesDataTable = ({ data }: Props) => {
  if (!data.allPublications) return <OtherError />
  const publications = data.allPublications

  console.log(publications)

  return (
    <>
      {publications.map((p, i) => (
        <p>{p.title}</p>
      ))}
    </>
  )
}

export default ReferencesDataTable
