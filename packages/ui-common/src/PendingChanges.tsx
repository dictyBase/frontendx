import AutorenewIcon from "@mui/icons-material/Autorenew"

const PendingChanges = () => (
  <AutorenewIcon
    sx={{
      animation: "spin 1.5s linear infinite",
      "@keyframes spin": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    }}
  />
)

export { PendingChanges }
