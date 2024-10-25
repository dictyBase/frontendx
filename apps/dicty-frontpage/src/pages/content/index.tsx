import { ACCESS } from "@dictybase/auth"
import { useListContentByNamespaceQuery } from "dicty-graphql-schema"
import {
  Container,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core"

// const ContentManager = () => {
//   const fetchState = useListContentByNamespaceQuery({
//     variables: { namespace: "news" },
//     fetchPolicy: "cache-and-network",
//   })
// }
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const ContentManagerView = () => {
  const { formControl } = useStyles()
  return (
    <FormControl className={formControl}>
      <InputLabel id="section-select-label"> Section </InputLabel>
      <Select id="section-select" label="Section" autoWidth>
        <MenuItem value={10}> Ten </MenuItem>
        <MenuItem value={20}> Twenty </MenuItem>
        <MenuItem value={30}> Thirty </MenuItem>
      </Select>
    </FormControl>
  )
}

// eslint-disable-next-line import/no-default-export
export default ContentManagerView
export const access = ACCESS.private
export const roles = ["content-admin"]
