import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    marginBottom: "10px",
    flexBasis: "5rem",
  },
  leadText: {
    color: "#0b3861",
    paddingRight: "10px",
  },
  mainContent: {
    paddingRight: "10px",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  sourceContent: {
    color: "#0b3861",
  },
  sourceTitle: {
    paddingTop: "7px",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "#428bca",
  },
})

type LatestPaperItemProperties = {
  data: PublicationItem
}

const LatestPaperItem = ({ data }: LatestPaperItemProperties) => {
  const { mainContent, listItem, sourceContent, sourceTitle, link } =
    useStyles()
  return (
    <li className={listItem}>
      <Typography className={mainContent}>{data.title}</Typography>
      <br />
      <Typography className={sourceContent}>
        <a href={data.link}>Pubmed</a>
      </Typography>
    </li>
  )
}

export { LatestPaperItem }
