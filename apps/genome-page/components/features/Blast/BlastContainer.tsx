import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import useStyles from "../../../styles/blastContainerStyles"
import {
  Paper,
  Container,
  Typography,
  Card,
  TextField,
  Box,
} from "@material-ui/core"

interface BlastContainerProps {
  gene: GeneQuery
}
const BlastContainer = ({ gene }: BlastContainerProps) => {
  const classes = useStyles()
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Phenotypes for ${geneId}`}
      description={`Gene phenotypes for ${geneId}`}>
      <Container component={Paper} className={classes.root} maxWidth={false}>
        <div className={classes.row}>
          <Box className={classes.titleBox}>
            <Typography className={classes.titleBoxText}>
              Query Sequence
            </Typography>
          </Box>
          <Typography className={classes.titleBoxText}>Or</Typography>
          <Box className={classes.titleBox}>
            <Typography className={classes.titleBoxText}>
              Gene or Gene Model ID
            </Typography>
          </Box>
        </div>
        <Box sx={{ maxWidth: 500, minHeight: 400 }}>
          <Card variant="outlined" className={classes.card}>
            <Typography className={classes.boldText}>
              Enter query sequence in FASTA format
            </Typography>
            <textarea
              rows={10}
              placeholder="Type or paste a query or sequence here..."
              className={classes.textArea}
            />
          </Card>
        </Box>
      </Container>
    </Layout>
  )
}

export default BlastContainer
