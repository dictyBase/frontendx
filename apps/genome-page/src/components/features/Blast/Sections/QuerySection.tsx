import { Box, Card, Typography, Grid } from "@mui/material"

const QuerySection = () => (
  <Grid item xs={5} md={5}>
    <Box
      sx={{
        position: "relative",
        top: 15,
        backgroundColor: "#DFE8F6",
        border: "1px solid",
        borderColor: "#A3BAE9",
        textAlign: "center",
        maxWidth: 150,
        marginLeft: "25px",
      }}>
      <Typography sx={{ color: "#336699", fontSize: "16px" }}>
        Query Sequence
      </Typography>
    </Box>
    <Card
      variant="outlined"
      sx={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
        Enter query sequence in FASTA format
      </Typography>
      <Box
        component="textarea"
        rows={10}
        placeholder="Type or paste a query or sequence here..."
        sx={{ padding: 0, fontSize: 12, width: "100%" }}
      />
    </Card>
  </Grid>
)

export { QuerySection }
