import { pipe } from "fp-ts/function"
import { range as NEArange, map as NEAmap } from "fp-ts/NonEmptyArray"
import { Content, User } from "dicty-graphql-schema"

type ContentUser = Pick<
  User,
  "__typename" | "id" | "email" | "first_name" | "last_name"
>

type AdditionalContentProperties = {
  created_by: ContentUser
  updated_by: ContentUser
}

const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

const mockContent = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "font-size: 20px;",
                text: sampleText,
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

const generateMockNews = (
  length: number,
): Array<
  Omit<Content, "created_by" | "updated_by" | "namespace"> &
    AdditionalContentProperties
> =>
  pipe(
    NEArange(1, length),
    NEAmap((index) => ({
      __typename: "Content",
      id: `id_${index}`,
      content: JSON.stringify(mockContent),
      name: `${index}`,
      slug: `news-${index}`,
      created_at: "2023-11-17T00:00:00.000Z",
      updated_at: "2023-11-17T00:00:00.000Z",
      created_by: {
        __typename: "User",
        id: `user_id_${index}`,
        email: `user${index}@example.com`,
        first_name: `First${index}`,
        last_name: `Last${index}`,
      },
      updated_by: {
        __typename: "User",
        id: `user_id_${index}`,
        email: `user${index}@example.com`,
        first_name: `First${index}`,
        last_name: `Last${index}`,
      },
    })),
  )

export { generateMockNews }
