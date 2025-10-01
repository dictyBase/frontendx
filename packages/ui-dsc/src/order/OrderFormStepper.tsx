import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

const steps = ["Shipping Address", "Payment Details", "Review Your Order"]


type OrderFormSteperProperties = {
  // Page number the user is on (0, 1, 2)
  step: number
}

/**
 * OrderFormStepper is the display for the steps at the top of the order form
 * page.
 */
const OrderFormStepper = ({ step }: OrderFormSteperProperties) => {
  return (
    <Stepper activeStep={step} sx={(theme) => ({ padding: theme.spacing(3, 0, 5) })}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            sx={{
              "& .MuiStepIcon-root.Mui-active": {
                color: (theme) => theme.palette.primary.light,
              },
            }}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export { OrderFormStepper }
