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

const noSpaceErrorMessage = "* May not contain spaces"
const noHyphenErrorMessage = '* May not contain hyphens ("-")'
const noSlashErrorMesasage = '* May not contain slashes ("/" or "\\")'

const validationSchema = object().shape({
  section: string()
    .required("* Section is required")
    .ensure()
    .matches(/^((?!(\s)).)*$/, noSpaceErrorMessage)
    .matches(/^((?!(-)).)*$/, noHyphenErrorMessage)
    .matches(/^((?!(\/|\\)).)*$/, noSlashErrorMesasage)
    .lowercase("Section must be lowercase"),
  name: string()
    .required("* Name is required")
    .ensure()
    .matches(/^((?!(\s)).)*$/, noSpaceErrorMessage)
    .matches(/^((?!(-)).)*$/, noHyphenErrorMessage)
    .matches(/^((?!(\/|\\)).)*$/, noSlashErrorMesasage)
    .lowercase("Name must be lowercase"),
  subname: string()
    .ensure()
    .matches(/^((?!(\s)).)*$/, noSpaceErrorMessage)
    .matches(/^((?!(-)).)*$/, noHyphenErrorMessage)
    .matches(/^((?!(\/|\\)).)*$/, noSlashErrorMesasage)
    .lowercase("subname must be lowercase"),
})

const useCreateContentForm = () =>
  useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: { section: "", name: "", subname: "" },
  })

const useAvailableContentSlugValidation = () => {
  const [getContent] = useContentBySlugLazyQuery()
  return async (namespace: string, slug: string) => {
    const fetchState = await getContent({
      variables: { slug: `${namespace}-${slug}` },
    })
    const isAvailable = pipe(
      fetchState.error,
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
    return { isAvailable, fetchState }
  }
}

export {
  useCreateContentForm,
  validationSchema,
  useAvailableContentSlugValidation,
}
