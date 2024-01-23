import { type Either, left, right } from "fp-ts/Either"

const RSS_URL =
  "https://pubmed.ncbi.nlm.nih.gov/rss/search/1xSjLNP-2lGAmjK0hZKzE4pxRxyAAh7BAEFNc5kyVReacTxspv/?limit=15&utm_campaign=pubmed-2&fc=20231211102630"

type Error<E = string> = E

const fetchPublicationData = async (): Either<Error, Response> => {
  try {
    const data = await fetch(RSS_URL)
    return right(data)
  } catch (error) {
    return left(error.message)
  }
}
