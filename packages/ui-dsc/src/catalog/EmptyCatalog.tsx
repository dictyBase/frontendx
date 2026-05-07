import { Stack, Typography, Paper, Box } from "@mui/material"
import sadDicty from "../assets/sad-dicty.png"

const EmptyCatalog = ({ message }: { message: string }) => (
  <Paper sx={{ height: "100%", overflow: "hidden" }}>
    <Stack justifyContent="center" direction="row" sx={{ height: "100%" }}>
      <Stack justifyContent="center" alignItems="center" direction="column">
        <img src={sadDicty} alt="Sad Dicty -- Page Not Found" />
        <Typography variant="subtitle1">{message}</Typography>
        <Box height={(theme) => theme.spacing(10)} />
      </Stack>
    </Stack>
  </Paper>
)

export { EmptyCatalog }
