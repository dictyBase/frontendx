import { Fragment } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { Download, DownloadItem } from "dicty-graphql-schema"

const headerCellStyle = {
  fontWeight: 400,
  fontSize: "1.2em",
  color: "#fff",
}

type Properties = {
  data: Array<Download>
}

/**
 * Displays the table on the downloads page.
 */

const DownloadsTable = ({ data }: Properties) => (
  <Paper sx={{ width: "100%", overflowX: "auto" }}>
    <Table>
      <colgroup>
        <col style={{ width: "90%" }} />
        <col style={{ width: "10%" }} />
      </colgroup>
      {data.map((section: Download) => (
        <Fragment key={section.title}>
          <TableHead sx={{ backgroundColor: "#004080" }}>
            <TableRow>
              <TableCell sx={headerCellStyle}>{section.title}</TableCell>
              <TableCell sx={headerCellStyle} />
            </TableRow>
          </TableHead>
          <TableBody>
            {section.items.map((row: DownloadItem) => (
              <TableRow
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "#fafafa",
                  },
                }}
                key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>
                  <Box
                    component="a"
                    sx={{ textDecoration: "none" }}
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button
                      sx={{
                        padding: "10px",
                        textTransform: "none",
                        backgroundColor: "#e6f2ff",
                        color: "rgba(0, 0, 0, 0.87)",
                        "&:hover": {
                          backgroundColor: "#0073e6",
                          color: "#fff",
                        },
                      }}
                      size="small"
                      variant="contained">
                      Download
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Fragment>
      ))}
    </Table>
  </Paper>
)

export { DownloadsTable }
