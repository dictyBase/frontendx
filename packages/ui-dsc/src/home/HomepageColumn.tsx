import { Link as RouterLink } from "react-router-dom"
import { v4 as uuid4 } from "uuid"
import Typography from "@material-ui/core/Typography"

type LinkProperties = {
  name: string
  to: string
}

type HomepageColumnProperties = {
  title: string
  entries: Array<LinkProperties>
}

/**
 * HomepageColumn handles formatting for each column on the homepage.
 */
const HomepageColumn = ({ title, entries }: HomepageColumnProperties) => {
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      {entries.map(({ name, to }) => (
        <RouterLink key={uuid4()} to={to}>
          {name}
        </RouterLink>
      ))}
    </>
  )
}

export { HomepageColumn }
