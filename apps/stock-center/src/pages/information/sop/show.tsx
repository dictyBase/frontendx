import { Box } from "@mui/material"
import { PageLayout } from "@dictybase/ui-common"
import { PdfDocumentDisplay } from "@dictybase/ui-dsc"
import { ACCESS } from "@dictybase/auth-mui5"
import { getPublicPath } from "../../../getPublicPath"

/** File name of the standard operating procedures document. */
const SOP_FILE_NAME = "DSC_SOP_OIM_Aug22.pdf"

/** Directory, inside the `public` folder, holding the DSC documents. */
const DOCUMENTS_DIRECTORY = "documents"

/** Url path of the SOP document. */
const SOP_DOCUMENT_SRC = getPublicPath(
  `${DOCUMENTS_DIRECTORY}/${SOP_FILE_NAME}`,
)

/** Page title, also used as the embedded viewer title. */
const SOP_TITLE = "Standard Operating Procedures"

/** Content of the page description meta tag. */
const SOP_META_CONTENT =
  "Standard Operating Procedures for ordering, payment, depositing and shipping materials from the Dicty Stock Center"

/**
 * Displays the Dicty Stock Center standard operating procedures document.
 *
 * The document is served as a static asset and rendered with the shared
 * {@link PdfDocumentDisplay} component, which also exposes a download action.
 */
const Sop = () => (
  <PageLayout metaContent={SOP_META_CONTENT} title={SOP_TITLE}>
    <Box py={4}>
      <PdfDocumentDisplay
        src={SOP_DOCUMENT_SRC}
        fileName={SOP_FILE_NAME}
        title={SOP_TITLE}
      />
    </Box>
  </PageLayout>
)

// eslint-disable-next-line import/no-default-export
export default Sop
export const access = ACCESS.public
