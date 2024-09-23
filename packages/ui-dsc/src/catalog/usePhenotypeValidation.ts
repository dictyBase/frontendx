import { useMemo } from "react"
import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, matchW as OmatchW } from "fp-ts/Option"
import { useForm } from "react-hook-form"
import { object, string } from "yup"
import { usePublicationLazyQuery } from "dicty-graphql-schema"
import { yupResolver } from "@hookform/resolvers/yup"

const usePhenotypeValidation = () => {
  const [getPublication] = usePublicationLazyQuery()

  const schemaValidation = useMemo(
    () =>
      object().shape({
        phenotype: string().required("* Phenotype is required"),
        environment: string().default(""),
        assay: string().default(""),
        publication: string()
          .required("* Reference Publication is required")
          .test(async (value, context) => {
            if (value.length === 0) return false
            const { data } = await getPublication({ variables: { id: value } })
            return pipe(
              data,
              OfromNullable,
              OmatchW(
                () =>
                  context.createError({
                    message: "* Reference Publication not found",
                  }),
                () => true,
              ),
            )
          }),
        note: string(),
      }),
    [getPublication],
  )

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      phenotype: "",
      environment: "",
      assay: "",
      publication: "",
      note: "",
    },
  })
  return { methods, schemaValidation }
}

export { usePhenotypeValidation }
