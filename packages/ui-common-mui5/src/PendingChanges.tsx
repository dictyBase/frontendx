import { makeStyles } from "@material-ui/core"
import AutorenewIcon from "@material-ui/icons/Autorenew"

const useStyles = makeStyles({
  spinner: {
    animation: "$spin 1.5s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
})

const PendingChanges = () => {
  const { spinner } = useStyles()
  return <AutorenewIcon className={spinner} />
}

export { PendingChanges }
