import { Theme, makeStyles } from "@material-ui/core"

type useColorOptionButtonStylesProperties = {
  color: string
}

const useColorOptionButtonStyles = makeStyles<
  Theme,
  useColorOptionButtonStylesProperties,
  "root"
>({
  root: {
    height: "25px",
    minWidth: "25px",
    border: "1px solid hsl(0, 0%, 75%)",
    backgroundColor: ({ color }) => color,
    "&:hover": {
      // Overrides default mui button hover color transition
      backgroundColor: ({ color }: { color: string }) => color,
    },
  },
})

export { useColorOptionButtonStyles }
