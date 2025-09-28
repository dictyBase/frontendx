import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { LoadingDisplay } from "@dictybase/ui-common"
import { ContentBySlugQueryHookResult } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { teal } from "@mui/material/colors"
import { AuthorizedDictyInfoDisplay } from "./AuthorizedDictyInfoDisplay"

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: teal[50],
  color: "#04313f",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}))

type AuthorizedDictyInfoProperties = {
  queryResult: ContentBySlugQueryHookResult
}

const AuthorizedDictyInfo = ({ queryResult }: AuthorizedDictyInfoProperties) =>
  match(queryResult)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <AuthorizedDictyInfoDisplay content={content} slug={slug} />
      ),
    )
    .with({ data: { contentBySlug: P.nullish } }, () => <></>)
    .with({ loading: true }, () => (
      <StyledBox>
        <LoadingDisplay rows={5} />
      </StyledBox>
    ))
    .with({ error: P.select(P.not(undefined)) }, () => <></>)
    .otherwise(() => <> This message should not appear. </>)

export { AuthorizedDictyInfo }
