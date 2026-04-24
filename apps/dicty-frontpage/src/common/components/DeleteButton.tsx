import { Button } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import { useAuthorizedDeleteContent } from "../hooks/useAuthorizedDeleteContent"
import { contentIdAtom } from "../../state"

const useStyles = makeStyles()((theme) => ({
  button: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}))

const DeleteButton = () => {
  const {
    classes: { button },
  } = useStyles()
  const navigate = useNavigate()
  const id = useAtomValue(contentIdAtom)
  const authorizedDeleteContent = useAuthorizedDeleteContent(id)
  const handleDelete = async () => {
    // handle error / success state
    pipe(
      await authorizedDeleteContent(),
      Ematch(
        () => {},
        () => {
          navigate("/news/editable", { relative: "path" })
        },
      ),
    )
  }

  return (
    <Button className={button} variant="contained" onClick={handleDelete}>
      Delete
    </Button>
  )
}

export { DeleteButton }
