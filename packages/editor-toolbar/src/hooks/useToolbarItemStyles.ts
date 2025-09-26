const useToolbarItemStyles = () => ({
  root: {
    borderRadius: "15%",
    "&:disabled": {
      cursor: "not-allowed",
      "& i": {
        opacity: "0.2",
      },
    },
  },
  spaced: {
    marginRight: "7px",
    marginLeft: "7px",
  },
  active: {
    backgroundColor: "rgba(223, 232, 250, 0.3)",
    "& i": {
      opacity: "1",
    },
  },
})

export { useToolbarItemStyles }
