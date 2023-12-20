import { Helmet } from "react-helmet"

const metaDesc =
  "The Dicty Stock Center is a rapidly growing central repository for Dictyostelium discoideum strains and those of related species, plasmids, commonly used food bacteria, and other materials such as antibodies."

const Title = () => (
  <Helmet>
    <title>Dicty Stock Center</title>
    <meta name="description" content={metaDesc} />
  </Helmet>
)

export { Title }
