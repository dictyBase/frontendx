type Extension = {
  id: string
  db: string
  relation: string
  name: string
}

type With = {
  id: string
  db: string
  name: string
}

type GeneGOA = {
  assigned_by: string
  date: string
  evidence_code: string
  extensions?: Array<Extension>
  go_term: string
  id: string
  publication: string
  qualifier: string
  type: string
  with?: Array<With>
}

export type { Extension, With, GeneGOA }
