import { pipe } from "fp-ts/function"
import { match as Amatch } from "fp-ts/Array"
import { Grid, makeStyles } from "@material-ui/core"
import { SinglePublication } from "./SinglePublication"
import { EmptyPublications } from "./EmptyPublications"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

const useStyles = makeStyles({
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "13px",
    overflow: "hidden",
    marginBottom: "5px",
    marginTop: "12px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
})

type PublicationsListProperties = {
  /**
   * Object containing sorted publications grouped by tab name.
   */
  sortedPublications: Record<string, Array<PublicationItem>>
  /**
   * The name of the current tab being displayed.
   */
  currentTab: string
}

/**
 * PublicationsList component to display a list of publications based on the current tab.
 */
const PublicationsList = ({
  sortedPublications,
  currentTab,
}: PublicationsListProperties) => {
  const { listBox } = useStyles()

  return (
    <>
      {pipe(
        sortedPublications[currentTab],
        Amatch(
          () => <EmptyPublications range={currentTab} />,
          (publications) => (
            <Grid
              container
              spacing={3}
              direction="column"
              component="ol"
              className={listBox}>
              {publications.map((p) => (
                <Grid key={p.pubmedId} item>
                  <SinglePublication data={p} />
                </Grid>
              ))}
            </Grid>
          ),
        ),
      )}
    </>
  )
}
export { PublicationsList }
