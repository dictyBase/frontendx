import { ReactNode } from "react"
import { vi, describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { OrderSummaryPdf } from "../order/OrderSummaryPdf"
import { mockValues } from "../utils/mockValues"
import { StrainCartItem } from "../types"

vi.mock("@react-pdf/renderer", async () => {
  const originalModule = (await vi.importActual(
    "@react-pdf/renderer",
  )) as typeof import("@react-pdf/renderer")

  return {
    ...originalModule,
    PDFViewer: ({ children }: { children: ReactNode }) => <>{children}</>,
    StyleSheet: { create: () => ({ body: {}, title: {}, row: {}, items: {} }) },
  }
})

describe("features/OrderForm/Submit/OrderSummaryPDF", () => {
  const items = [
    {
      fee: 30,
      id: "DBS0351365",
      label: "HL501/X55",
      summary: "heterozygote diploid tester strain; Parents: HL501 and X55",
      quantity: 1,
      in_stock: true,
    },
    {
      fee: 30,
      id: "DBS0351365",
      label: "HL501/X55",
      summary: "heterozygote diploid tester strain; Parents: HL501 and X55",
      quantity: 1,
      in_stock: true,
    },
    {
      fee: 15,
      id: "DBP0001068",
      label: "pSigK/lacZ",
      summary:
        "The construct was made by sub-cloning the DDB_G0267476 promoter as a 655 bp XbaI/BglII fragment into XbaI/BglII restricted pDdGal-17. This fragment consists of the region -632_+24 bp from the DDB_G0267476 start and restriction sites. This includes the full intergenic region before DDB_G0267476. The construct drives the expression of β-gal when activated; parental vector: pDdGAI-17; vector length: 9137 bp.",
      quantity: 1,
      in_stock: true,
    },
  ]
  const order = {
    formData: mockValues,
    cartItems: items,
    cartTotal: "$75.00",
    orderID: "123456789",
  }
  test("should display correct items", () => {
    render(<OrderSummaryPdf order={order} />)
    // strain should be listed twice (matches quantity in cart)
    expect(screen.getAllByText((items[0] as StrainCartItem).id)).toHaveLength(2)
    // one plasmid
    expect(
      screen.getByText((items[2] as StrainCartItem).id),
    ).toBeInTheDocument()
    // correct total (30+30+15)
    expect(screen.getByText("$75.00")).toBeInTheDocument()
    // shows order ID
    expect(screen.getByText(`DSC Order #${order.orderID}`)).toBeInTheDocument()
  })
})
