import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { pipe } from "fp-ts/function"
import { Eq as SEq } from "fp-ts/string"
import {
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
  Applicative as OApplicative,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  elem as RAelem,
  map as RAmap,
  sequence as RAsequence,
} from "fp-ts/ReadonlyArray"
import { useContentBySlugLazyQuery } from "dicty-graphql-schema"
import { getCreateContentSlug } from "../utils/getCreateContentSlug"
import { matchContentNamespace } from "../utils/matchContentNamespace"

const useValidateCreateContent = () => {
  const [getContent] = useContentBySlugLazyQuery()
  const validationSchema = object()
    .shape({
      section: string()
        .required("* Section is required")
        .lowercase("Section must be lowercase"),
      name: string()
        .required("* Name is required")
        .lowercase("Name must be lowercase"),
      subname: string().lowercase("subname must be lowercase"),
    })
    .test(
      "createContent",
      "Content already exists",
      async ({ section, name, subname }) => {
        const slug = getCreateContentSlug({ name, subname })
        const namespace = matchContentNamespace(section)
        const { error } = await getContent({
          variables: { slug: `${namespace}-${slug}` },
        })
        return pipe(
          error,
          OfromNullable,
          OflatMap(({ graphQLErrors }) =>
            pipe(
              graphQLErrors,
              RAmap(({ extensions }) =>
                pipe(
                  extensions,
                  OfromNullable,
                  Omap((extension) => extension.code as string),
                ),
              ),
              RAsequence(OApplicative),
            ),
          ),
          Omap((codes) => pipe(codes, RAelem(SEq)("NotFound"))),
          OgetOrElse(() => false),
        )
      },
    )
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: { section: "", name: "", subname: "" },
  })
  return { methods, validationSchema }
}

export { useValidateCreateContent }
