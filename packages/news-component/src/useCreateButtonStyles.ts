import { Theme, makeStyles } from "@material-ui/core"

type useCreateButtonStylesProperties = {
  show: boolean
}

const useCreateButtonStyles = makeStyles<
  Theme,
  useCreateButtonStylesProperties
>({
  root: {
    opacity: ({ show }) => (show ? "1" : "0"),
  },
})

export default useCreateButtonStyles
