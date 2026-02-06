import { Fragment } from "react"
import { makeStyles } from "tss-react/mui"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { Download, DownloadItem } from "dicty-graphql-schema"

const useStyles = makeStyles()({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  head: {
    backgroundColor: "#004080",
  },
  headerCell: {
    fontWeight: 400,
    fontSize: "1.2em",
    color: "#fff",
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fafafa",
    },
  },
  button: {
    padding: "10px",
    textTransform: "none",
    backgroundColor: "#e6f2ff",
    color: "rgba(0, 0, 0, 0.87)",
    "&:hover": {
      backgroundColor: "#0073e6",
      color: "#fff",
    },
  },
  link: {
    textDecoration: "none",
  },
})

type Properties = {
  data: Array<Download>
}

/**
 * Displays the table on the downloads page.
 */

const DownloadsTable = ({ data }: Properties) => {
  const { classes } = useStyles()
  return (
    <Paper className={classes.root}>
      <Table>
        <colgroup>
          <col style={{ width: "90%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        {data.map((section: Download) => (
          <Fragment key={section.title}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.headerCell}>
                  {section.title}
                </TableCell>
                <TableCell className={classes.headerCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {section.items.map((row: DownloadItem) => (
                <TableRow className={classes.row} key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>
                    <a
                      className={classes.link}
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Button
                        className={classes.button}
                        size="small"
                        variant="contained">
                        Download
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Fragment>
        ))}
      </Table>
    </Paper>
  )
}

export { DownloadsTable }
