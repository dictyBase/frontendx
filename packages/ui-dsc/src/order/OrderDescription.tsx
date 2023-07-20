import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OrderDescription = () => (
  <>
    <Typography gutterBottom variant="h1">
      <FontAwesomeIcon icon="check-circle" /> Thank you for your order
    </Typography>
    <Box mb={3}>
      <Typography gutterBottom component="p">
        We have sent you a confirmation email.
      </Typography>
      <Typography gutterBottom component="p">
        The <strong>Payer</strong> will soon receive emails through the{" "}
        <strong>NU Core</strong> (Northwestern University) system to complete
        payment.
      </Typography>
    </Box>
  </>
)

export { OrderDescription }
