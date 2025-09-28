import { Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Editor } from "@dictybase/editor"
import { teal } from "@mui/material/colors"

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: teal[50],
  color: "#04313f",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}))

type DictyInfoDisplayProperties = {
  content: string
  slug: string
}

const DictyInfoDisplay = ({ content, slug }: DictyInfoDisplayProperties) => {
  return (
    <StyledBox>
      <Typography color="secondary" variant="h2">
        Dictyostelium discoideum
      </Typography>
      <Editor content={{ editorState: content, storageKey: slug }} />
    </StyledBox>
  )
}

export { DictyInfoDisplay }
