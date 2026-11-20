import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import { useAuthorizedDeleteContent } from "../hooks/useAuthorizedDeleteContent"
import { contentIdAtom } from "../../state"

const DeleteButton = () => {
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
    <Button
      sx={{
        backgroundColor: "error.main",
        color: "error.contrastText",
      }}
      variant="contained"
      onClick={handleDelete}>
      Delete
    </Button>
  )
}

export { DeleteButton }
