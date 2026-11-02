import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DownloadIcon from "@mui/icons-material/Download"

/** Default height, in pixels, of the embedded PDF viewer. */
const DEFAULT_VIEWER_HEIGHT = 800

/**
 * Sandbox permissions for the embedded viewer.
 *
 * `allow-same-origin` is the minimum needed for the browser's built-in PDF
 * plugin to load a same-origin document. `allow-scripts` is intentionally
 * excluded to avoid the browser warning about escaping sandboxing.
 */
const VIEWER_SANDBOX = "allow-same-origin"

type PdfDocumentDisplayProperties = {
  /** URL (absolute or app relative) of the PDF document to display. */
  src: string
  /** Name suggested to the browser when the document is downloaded. */
  fileName: string
  /** Heading rendered above the viewer, also used as the iframe title. */
  title: string
  /** Height, in pixels, of the embedded viewer. Defaults to 800. */
  height?: number
}

/**
 * PdfDocumentDisplay renders a static PDF document inside an embedded viewer
 * together with a download action.
 *
 * It follows the same presentation used by the order confirmation page
 * (`OrderSummaryPdf`) so that generated and static documents look alike.
 *
 * @param src - URL of the PDF document to display.
 * @param fileName - Name suggested when the document is downloaded.
 * @param title - Heading rendered above the viewer and the iframe title.
 * @param height - Height of the embedded viewer in pixels.
 */
const PdfDocumentDisplay = ({
  src,
  fileName,
  title,
  height = DEFAULT_VIEWER_HEIGHT,
}: PdfDocumentDisplayProperties) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        marginBottom: 2,
      }}>
      <Typography variant="h2" textAlign="left">
        {title}
      </Typography>
      <Button
        component="a"
        href={src}
        download={fileName}
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}>
        Download PDF
      </Button>
    </Box>
    <iframe
      src={src}
      title={title}
      height={height}
      sandbox={VIEWER_SANDBOX}
      style={{ width: "100%", border: 0, backgroundColor: "#eeeeee" }}
    />
  </Box>
)

export { PdfDocumentDisplay, DEFAULT_VIEWER_HEIGHT }
export type { PdfDocumentDisplayProperties }
