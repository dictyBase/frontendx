import { useState, ChangeEvent, Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Typography,
  TextField,
  Container,
  Paper,
  InputLabel,
  Select,
  Grid,
  MenuItem,
  FormControl,
  makeStyles,
} from "@material-ui/core"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { CreateButton } from "../../common/components/CreateButton"

type AddPageViewProperties = {
  namespace: string
  name: string
  contentPath: string
}

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
  },
  grid: {
    alignContent: "baseline",
  },
})

enum Section {
  EMPTY = "",
  EXPLORE = "Explore",
  RESEARCH = "Research",
  COMMUNITY = "Community",
  INFORMATION = "DSC Information",
}

type SectionSelectProperties = {
  section: Section
  setSection: Dispatch<SetStateAction<Section>>
}

const SectionSelect = ({ section, setSection }: SectionSelectProperties) => {
  const onChange = ({
    target: { value },
  }: ChangeEvent<{ name?: string; value: unknown }>) => {
    setSection(value as Section)
  }
  return (
    <>
      <InputLabel id="section-select-label"> Section </InputLabel>
      <Select
        id="section-select"
        labelId="section-select-label"
        autoWidth
        variant="outlined"
        onChange={onChange}>
        <MenuItem value={Section.EXPLORE}>{Section.EXPLORE}</MenuItem>
        <MenuItem value={Section.RESEARCH}>{Section.RESEARCH}</MenuItem>
        <MenuItem value={Section.COMMUNITY}>{Section.COMMUNITY}</MenuItem>
        <MenuItem value={Section.INFORMATION}>{Section.INFORMATION}</MenuItem>
      </Select>
    </>
  )
}

const Controls = () => {
  const { root } = useStyles()
  const [section, setSection] = useState<Section>(Section.EMPTY)
  return (
    <Container>
      <Paper className={root}>
        <Grid container spacing={1}>
          <Grid item>
            <SectionSelect section={section} setSection={setSection} />
          </Grid>
          <Grid item>
            <TextField name="name" variant="outlined" />
          </Grid>
          <Grid item>
            <TextField name="subname" variant="outlined" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

const AddPageView = ({
  namespace,
  name,
  contentPath,
}: AddPageViewProperties) => {
  const navigate = useNavigate()

  const handleCancel = async () => {
    navigate("/content", { relative: "path" })
  }

  const actionBar = (
    <ActionBar
      descriptionElement={
        <Typography>{`Add Editable Page for Route: ${contentPath}`}</Typography>
      }>
      <CreateButton namespace={namespace} name={name} />
      <Button onClick={handleCancel}> Cancel </Button>
    </ActionBar>
  )
  return (
    <Container>
      <Editor editable toolbar={<Controls />} />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default AddPageView
export const access = ACCESS.private
export const roles = ["content-admin"]
