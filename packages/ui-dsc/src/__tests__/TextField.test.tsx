import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, FormProvider } from "react-hook-form"
import { TextField } from "../order/TextField"

describe("TextField", () => {
  it("renders with default props", () => {
    render(
      <FormProvider {...useForm()}>
        <TextField name="test" label="Test" />
      </FormProvider>,
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
      <FormProvider {...useForm()}>
        <TextField
          name="test"
          label="Test"
          margin="normal"
          variant="filled"
          fullWidth={false}
          helperText="This is a helper text"
        />
      </FormProvider>,
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
      <FormProvider {...useForm()}>
        <TextField
          name="test"
          label="Test"
          margin="normal"
          variant="filled"
          fullWidth={false}
          error
          helperText={<ErrorMessage />}
        />
      </FormProvider>,
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
      <FormProvider {...useForm()}>
        <TextField name="test" label="Test" />
      </FormProvider>,
    )

    const textField = screen.getByLabelText("Test")
    userEvent.type(textField, "Hello, World!")

    expect(textField).toHaveValue("Hello, World!")
  })
})
