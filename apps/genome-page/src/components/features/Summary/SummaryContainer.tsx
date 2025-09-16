import Typography from "@material-ui/core/Typography"
import { GeneralInfoQuery } from "components/features/Summary/Panels/GeneralInfoQuery"
import { GoaQuery } from "components/features/Summary/Panels/GoaQuery"
import { ReferencesQuery } from "components/features/Summary/Panels/ReferencesQuery"

const SummaryContainer = () => (
  <Typography component="div">
    <GeneralInfoQuery />
    <GoaQuery />
    <ReferencesQuery />
  </Typography>
)

export { SummaryContainer }
