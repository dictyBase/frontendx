import { useRouter } from "next/router"
import { Grid, Chip } from "@material-ui/core"

type MentionedGenesProperties = {
  genes: Array<{ id: string; name: string }>
}

const MentionedGenes = ({ genes }: MentionedGenesProperties) => {
  const router = useRouter()
  return (
    <Grid container direction="column">
      <Grid item>
        {genes.map((gene) => (
          <Chip
            clickable
            onClick={() => router.push(`/${gene.name}`)}
            key={gene.id}
            label={gene.name}
            size="medium"
            style={{ margin: "0px 5px 5px 0px" }}
            variant="outlined"
          />
        ))}
      </Grid>
    </Grid>
  )
}

export { MentionedGenes }
