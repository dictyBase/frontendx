import { makeStyles } from "@material-ui/core/styles"
import { ListRecentPublicationsQuery } from "dicty-graphql-schema"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    marginBottom: "10px",
  },
  leadText: {
    color: "#0b3861",
    paddingRight: "10px",
  },
  mainContent: {
    paddingRight: "10px",
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

interface PaperContainerProperties {
  data: ListRecentPublicationsQuery | undefined
}

const PapersItem = ({ data }: PaperContainerProperties) => {
  const classes = useStyles()

  const filteredPublications =
    data?.listRecentPublications?.filter((paper) => !!paper.authors) || []

  const recentPublications = filteredPublications.map((paper) => {
    const { authors, id, title, journal } = paper
    const doi = paper?.doi
    const lastname = authors.map((author) => author.lastName).join(", ")

    return (
      <li className={classes.listItem} key={id}>
        <span className={classes.leadText}>{lastname || ""}</span>
        <span className={classes.mainContent}>
          <strong>
            <em>{title}</em>
          </strong>
        </span>
        <br />
        <span className={classes.sourceContent}>
          <span className={classes.sourceTitle}>Journal:{"\u00A0"}</span>
          <span>{journal}</span>
          <a
            className={classes.link}
            href={doi || ""}
            target="_blank"
            rel="noopener noreferrer">
            {"\u00A0"}
            Pubmed
          </a>
        </span>
      </li>
    )
  })
  return <>{recentPublications}</>
}

export { PapersItem }
