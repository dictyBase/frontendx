type Publication = {
  data: {
    publication: {
      id: string
      abstract: string
      authors: Array<{
        first_name: string
        last_name: string
        rank: string
        initials: string
      }>
      doi: string
      issn?: string
      issue: string
      journal: string
      pages: string
      pub_date: string
      pub_type?: string
      source?: string
      status?: string
      title: string
      volume: string
    }
  }
}

export type { Publication }
