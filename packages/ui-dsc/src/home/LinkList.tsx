/* eslint-disable dot-notation */
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { useStyles } from "./homeStyles"

type LinkItem = {
  /** Name of link */
  name: string
  /** URL of link */
  to: string
  /** Indicates if link should use React Router */
  routerAware: boolean
  /** Indicates if link should open in new window */
  newWindow: boolean
}

type LinkListProperties = {
  /** List of links in array form */
  list: Array<LinkItem>
  /** Color of panel background, either gray or blue */
  bgColor: string
}

const getLinkType = (link: LinkItem) => {
  if (link.routerAware) {
    return (
      <Link data-testid={link.name} to={link.to}>
        {link.name}
      </Link>
    )
  }
  if (link.newWindow) {
    return (
      <a href={link.to} target="_blank" rel="noopener noreferrer">
        {link.name}
      </a>
    )
  }
  return <a href={link.to}>{link.name}</a>
}

/**
 * Generates a list of links based on a passed in array
 */

const LinkList = ({ list, bgColor }: LinkListProperties) => {
  const classes = useStyles({ panelBackground: bgColor })

  // add simple header if the link list is for downloads panel
  const isDownloadPanel = list.some(
    (item) => item.name === "Phenotype Ontology",
  )

  return (
    <div className={classes["panel"]}>
      {isDownloadPanel && (
        <Typography variant="h3" gutterBottom>
          Download / View
        </Typography>
      )}
      <ul className={classes["list"]}>
        {list.map((link) => (
          <li key={link.name}>{getLinkType(link)}</li>
        ))}
      </ul>
    </div>
  )
}

export { LinkList }
