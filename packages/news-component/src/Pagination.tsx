import { Grid, Button } from "@material-ui/core"
import { useAtom, useAtomValue } from "jotai"
import {
  articlesListCurrentPageAtom,
  articlesPageCountAtom,
} from "./atomConfigs"

const Pagination = () => {
  const [currentPage, setCurrentPage] = useAtom(articlesListCurrentPageAtom)
  const pageCount = useAtomValue(articlesPageCountAtom)

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, pageCount))
  }

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1))
  }

  return (
    <Grid container direction="row">
      <Grid item>
        <Button onClick={handlePreviousPage}> Prev </Button>
      </Grid>
      <Grid item>
        <Button disabled> {`${currentPage} / ${pageCount}`} </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleNextPage}> Next </Button>
      </Grid>
    </Grid>
  )
}

export default Pagination
