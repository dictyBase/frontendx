import { Publication } from "dicty-graphql-schema"
const data: { publication: Publication } = {
  publication: {
    id: "12345678",
    doi: "9.0909/j.diff.1964.02.01",
    title: "This is a fake publication title that should be at least ten words",
    abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    journal:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    pub_date: "1964-01-29",
    pages: "71-79",
    issue: "101",
    volume: "999",
    authors: [
      {
        last_name: "Costanza",
        initials: "GC",
      },
      {
        last_name: "Kramer",
        initials: "CK",
      },
    ],
    pub_type: "",
    source: "",
  },
}

export { data }
