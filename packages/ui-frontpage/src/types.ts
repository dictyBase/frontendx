import { User, Role, Permission, Maybe } from "dicty-graphql-schema"

type UpdatedByUser = Pick<User, "id" | "email" | "first_name" | "last_name"> & {
  roles?: Maybe<
    Array<
      { __typename?: "Role" } & Pick<Role, "role"> & {
          permissions?: Maybe<
            Array<
              { __typename?: "Permission" } & Pick<
                Permission,
                "permission" | "resource"
              >
            >
          >
        }
    >
  >
}

enum Status {
  UP = "up",
  DOWN = "down",
}

type UptimeProperties = {
  name: string
  url: string
  status: Status
}

type Citation = {
  title: string
  authors: string
  pubmed_id: string
  journal: string
}

type DownloadItem = {
  title: string
  url: string
}

type Download = {
  title: string
  items: Array<DownloadItem>
}

type Organism = {
  taxon_id: string
  scientific_name: string
  citations: Array<Citation>
  downloads: Array<Download>
}

export type {
  UpdatedByUser,
  UptimeProperties,
  Citation,
  Download,
  DownloadItem,
  Organism,
  Status,
}
