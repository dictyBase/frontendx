import { useNavigate } from "react-router-dom"
import { Typography, Box, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import { Editor } from "@dictybase/editor"
import { teal } from "@mui/material/colors"

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: teal[50],
  color: "#04313f",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}))

const StyledIconButton = styled(IconButton)({
  paddingBottom: 0,
  paddingTop: 0,
})

type AuthorizedDictyInfoDisplayProperties = {
  content: string
  slug: string
}

const AuthorizedDictyInfoDisplay = ({
  content,
  slug,
}: AuthorizedDictyInfoDisplayProperties) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate("/community/info/edit")
  }
  return (
    <StyledBox>
      <Typography color="secondary" variant="h2">
        Dictyostelium discoideum
        <StyledIconButton color="secondary" size="small" onClick={onClick}>
          <EditIcon />
        </StyledIconButton>
      </Typography>
      <Editor content={{ editorState: content, storageKey: slug }} />
    </StyledBox>
  )
}

export { AuthorizedDictyInfoDisplay }
