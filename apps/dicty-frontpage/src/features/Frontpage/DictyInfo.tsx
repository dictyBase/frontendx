import { Box } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import { NAMESPACE } from "../../common/constants/namespace"

const DictyInfo = () => {
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-info` },
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <Box>
          <Editor content={{ editorState: content, storageKey: slug }} />
        </Box>
      ),
    )
    .with({ data: { contentBySlug: P.nullish } }, () => <></>)
    .with({ loading: true }, () => <></>)
    .with({ error: P.select(P.not(undefined)) }, () => <></>)
    .otherwise(() => <> This message should not appear. </>)
}

export { DictyInfo }
