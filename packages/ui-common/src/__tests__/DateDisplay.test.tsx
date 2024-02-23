import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { DateDisplay } from "../DateDisplay"

const dateMap = [
  ["Fri, 23 Feb 2024 06:00:00 -0500", "February 23, 2024"],
  ["Wed, 04 Sep 2024 12:00:00 -0500", "September 4, 2024"],
]

test.each(dateMap)(
  "converts %s to %s and displays the text",
  (given, expected) => {
    render(<DateDisplay dateString={given} />)
    expect(screen.getByText(expected)).toBeInTheDocument()
  },
)
