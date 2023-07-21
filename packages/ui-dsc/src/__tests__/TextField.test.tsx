import { ReactNode } from "react"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, FormProvider } from "react-hook-form"
import { TextField } from "../order/TextField"

type FormProviderWrapperProperties = {
  children: ReactNode
}

const FormProviderWrapper = ({ children }: FormProviderWrapperProperties) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("TextField", () => {
  it("renders with default props", () => {
    render(
      <FormProviderWrapper>
        <TextField name="test" label="Test" />
      </FormProviderWrapper>,
    )

    const textField = screen.getByLabelText("Test")

    expect(textField).toBeInTheDocument()
    expect(textField).toHaveAttribute("type", "text")
    expect(textField).toHaveAttribute("margin", "dense")
    expect(textField).toHaveAttribute("variant", "outlined")
    expect(textField).toHaveAttribute("fullWidth")
    expect(textField).not.toHaveClass("Mui-error")
    expect(textField).not.toHaveAttribute("helperText")
  })

  it("renders with custom props", () => {
    render(
      <FormProviderWrapper>
        <TextField
          name="test"
          label="Test"
          margin="normal"
          variant="filled"
          fullWidth={false}
          helperText="This is a helper text"
        />
      </FormProviderWrapper>,
    )

    const textField = screen.getByLabelText("Test")

    expect(textField).toBeInTheDocument()
    expect(textField).toHaveAttribute("type", "text")
    expect(textField).toHaveAttribute("margin", "normal")
    expect(textField).toHaveAttribute("variant", "filled")
    expect(textField).not.toHaveAttribute("fullWidth")
    expect(textField).not.toHaveClass("Mui-error")
    expect(textField).toHaveAttribute("helperText", "This is a helper text")
  })

  it("renders with error", () => {
    const ErrorMessage = () => <div>Required field</div>

    render(
      <FormProviderWrapper>
        <TextField
          name="test"
          label="Test"
          margin="normal"
          variant="filled"
          fullWidth={false}
          error
          helperText={<ErrorMessage />}
        />
      </FormProviderWrapper>,
    )

    const textField = screen.getByLabelText("Test")
    const errorMessage = screen.getByText("Required field")

    expect(textField).toBeInTheDocument()
    expect(textField).toHaveAttribute("type", "text")
    expect(textField).toHaveAttribute("margin", "normal")
    expect(textField).toHaveAttribute("variant", "filled")
    expect(textField).not.toHaveAttribute("fullWidth")
    expect(textField).toHaveClass("Mui-error")
    expect(errorMessage).toBeInTheDocument()
  })

  it("allows user input", () => {
    render(
      <FormProviderWrapper>
        <TextField name="test" label="Test" />
      </FormProviderWrapper>,
    )

    const textField = screen.getByLabelText("Test")
    userEvent.type(textField, "Hello, World!")

    expect(textField).toHaveValue("Hello, World!")
  })
})
