import BrokenImageTwoToneIcon from "@material-ui/icons/BrokenImageTwoTone"
import { SvgIcon, Container } from "@material-ui/core"

/**
 * A component to display an error message with an icon
 *
 * @param {Object} props - The component props
 * @param {string} props.icons - The CSS classname for the icon
 * @returns {JSX.Element} - The rendered component
 */
const ErrorDisplay = ({ icons }: { icons: string }) => (
  <Container disableGutters className={icons}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </Container>
)

export default ErrorDisplay
