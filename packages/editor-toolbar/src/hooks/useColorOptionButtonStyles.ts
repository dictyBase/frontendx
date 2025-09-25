type useColorOptionButtonStylesProperties = {
  color: string
}

const useColorOptionButtonStyles = ({
  color,
}: useColorOptionButtonStylesProperties) => ({
  root: {
    height: "25px",
    minWidth: "25px",
    border: "1px solid hsl(0, 0%, 75%)",
    backgroundColor: color,
    "&:hover": {
      // Overrides default mui button hover color transition
      backgroundColor: color,
    },
  },
})

export { useColorOptionButtonStyles }
