import Grid from "@material-ui/core/Grid"
import {
  useStyles,
  Title,
  Heading,
  Slide,
  CatalogLinks,
  FileLinks,
} from "@dictybase/ui-dsc"
import {
  EditableEditor,
  LoadingDisplay,
  OtherError,
} from "@dictybase/ui-common"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ACCESS } from "auth"
import { NAMESPACE } from "../../namespace"
/**
 * Homepage is the main homepage component for DSC.
 */
const EditableHomepage = () => {
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-intro` },
  })

  const classes = useStyles({})
  return (
    <>
      <Title />
      <Grid container justifyContent="space-between" spacing={3}>
        <Heading />
        <Grid item xs={12} className={classes.intro}>
          {match(result)
            .with(
              { data: { contentBySlug: P.select({ content: P.string }) } },
              (content) => <EditableEditor data={content} />,
            )
            .with({ loading: true }, () => <LoadingDisplay rows={4} />)
            .with({ error: P.not(undefined) }, () => <OtherError />)
            .otherwise(() => (
              <> This message should not appear. </>
            ))}
        </Grid>
        <Grid container item xs={12} spacing={4} justifyContent="flex-start">
          <Slide />
          <CatalogLinks isAuthorized />
          <FileLinks />
        </Grid>
      </Grid>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default EditableHomepage
export const access = ACCESS.private
export const roles = ["content-admin"]
