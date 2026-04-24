import { Button, CircularProgress } from "@mui/material"
import { InferType } from "yup"
import { useFormContext, SubmitHandler } from "react-hook-form"
import { match as Bmatch } from "fp-ts/boolean"
import { pipe } from "fp-ts/function"
import { validationSchema } from "../../common/hooks/useCreateContentForm"

type CreateContentFormButtonsProperties = {
  onSubmit: SubmitHandler<InferType<typeof validationSchema>>
  onCancel: () => void
}

const CreateContentFormButtons = ({
  onSubmit,
  onCancel,
}: CreateContentFormButtonsProperties) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<InferType<typeof validationSchema>>()
  const buttonLoading = pipe(
    isSubmitting,
    Bmatch(
      () => <></>,
      () => <CircularProgress size={20} color="secondary" />,
    ),
  )
  return (
    <>
      <Button
        startIcon={buttonLoading}
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}>
        Create
      </Button>
      <Button variant="contained" onClick={onCancel}>
        Cancel
      </Button>
    </>
  )
}

export { CreateContentFormButtons }
