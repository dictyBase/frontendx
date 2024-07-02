import { expect, describe, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import Create from "../pages/news/create"

const mockNavigate = vi.hoisted(() => vi.fn())

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}))

describe("Create Component", () => {
  test('renders an element with the "textbox" role', () => {
    render(
      <MockedProvider>
        <Create />
      </MockedProvider>,
    )
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })

  test('renders a button with the text "Cancel" that navigates to `/news/editable` when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MockedProvider>
        <Create />
      </MockedProvider>,
    )
    const cancelButton = screen.getByText("Cancel")
    expect(cancelButton).toBeInTheDocument()
    await user.click(cancelButton)
    expect(mockNavigate).toHaveBeenCalledWith("/news/editable")
  })

  test('renders a button with the text "Save"', () => {
    render(
      <MockedProvider>
        <Create />
      </MockedProvider>,
    )
    const saveButton = screen.getByText("Save")
    expect(saveButton).toBeInTheDocument()
  })
})
