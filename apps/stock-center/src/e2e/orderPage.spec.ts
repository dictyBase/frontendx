import { test, expect, Page } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/stockcenter/strains/DBS0391520")
  await page.getByRole("button", { name: "Add to Cart" }).click()
  await page.getByRole("button", { name: "View Cart" }).click()
  await page.getByRole("button", { name: "Proceed to Checkout" }).click()
})

const shippingData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@university.edu",
  organization: "University Research Lab",
  labGroup: "Molecular Biology Lab",
  phoneNumber: "555-123-4567",
  addressLine1: "123 Research Drive",
  addressLine2: "Suite 456",
  city: "Science City",
  stateProvince: "California",
  zipCode: "12345",
  country: "United States",
  shippingAccountNumber: "123456789",
}

const fillShippingForm = async (page: Page) => {
  await page
    .getByRole("textbox", { name: "First Name" })
    .fill(shippingData.firstName)
  await page
    .getByRole("textbox", { name: "Last Name" })
    .fill(shippingData.lastName)
  await page.getByRole("textbox", { name: "Email" }).fill(shippingData.email)
  await page
    .getByRole("textbox", { name: "Organization" })
    .fill(shippingData.organization)
  await page
    .getByRole("textbox", { name: "Lab/Group" })
    .fill(shippingData.labGroup)
  await page
    .getByRole("textbox", { name: "Phone Number" })
    .fill(shippingData.phoneNumber)
  await page
    .getByRole("textbox", { name: "Address Line 1" })
    .fill(shippingData.addressLine1)
  await page
    .getByRole("textbox", { name: "Address Line 2" })
    .fill(shippingData.addressLine2)
  await page.getByRole("textbox", { name: "City" }).fill(shippingData.city)
  await page
    .getByRole("textbox", { name: "State/Province" })
    .fill(shippingData.stateProvince)
  await page
    .getByRole("textbox", { name: "Zip Code" })
    .fill(shippingData.zipCode)
  await page
    .getByRole("textbox", { name: "Country" })
    .fill(shippingData.country)
  await page.getByRole("option", { name: "United States" }).click()
  await page
    .getByRole("textbox", { name: "Shipping Account Number" })
    .fill(shippingData.shippingAccountNumber)
}

test.describe("Shipping Address Step", () => {
  test("displays shipping address step when order page loads", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Shipping Address" }),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Shipping Address", expanded: true }),
    ).toBeVisible()
  })

  test("shows validation errors when continue button is clicked without required fields", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Continue" }).click()

    await expect(page.getByText("* First name is required")).toBeVisible()
    await expect(page.getByText("* Last name is required")).toBeVisible()
    await expect(page.getByText("* Email is required")).toBeVisible()
    await expect(page.getByText("* Organization is required")).toBeVisible()
    await expect(page.getByText("* Lab/Group is required")).toBeVisible()
    await expect(page.getByText("* Phone number is required")).toBeVisible()
    await expect(page.getByText("* Address is required")).toBeVisible()
    await expect(page.getByText("* City is required")).toBeVisible()
    await expect(page.getByText("* Zip code is required")).toBeVisible()
    await expect(page.getByText("* Country is required")).toBeVisible()
    await expect(
      page.getByText("* Shipping account number is required"),
    ).toBeVisible()
  })

  test("allows filling out shipping form with valid data", async ({ page }) => {
    await fillShippingForm(page)

    await expect(page.getByRole("textbox", { name: "First Name" })).toHaveValue(
      shippingData.firstName,
    )
    await expect(page.getByRole("textbox", { name: "Last Name" })).toHaveValue(
      shippingData.lastName,
    )
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(
      shippingData.email,
    )
    await expect(
      page.getByRole("textbox", { name: "Organization" }),
    ).toHaveValue(shippingData.organization)
    await expect(page.getByRole("textbox", { name: "Lab/Group" })).toHaveValue(
      shippingData.labGroup,
    )
    await expect(
      page.getByRole("textbox", { name: "Phone Number" }),
    ).toHaveValue(shippingData.phoneNumber)
    await expect(
      page.getByRole("textbox", { name: "Address Line 1" }),
    ).toHaveValue(shippingData.addressLine1)
    await expect(
      page.getByRole("textbox", { name: "Address Line 2" }),
    ).toHaveValue(shippingData.addressLine2)
    await expect(page.getByRole("textbox", { name: "City" })).toHaveValue(
      shippingData.city,
    )
    await expect(
      page.getByRole("textbox", { name: "State/Province" }),
    ).toHaveValue(shippingData.stateProvince)
    await expect(page.getByRole("textbox", { name: "Zip Code" })).toHaveValue(
      shippingData.zipCode,
    )
    await expect(page.getByRole("textbox", { name: "Country" })).toHaveValue(
      shippingData.country,
    )
    await expect(
      page.getByRole("textbox", { name: "Shipping Account Number" }),
    ).toHaveValue(shippingData.shippingAccountNumber)
  })

  test("displays `Payment Details` view after continuing from `Shipping Address` view", async ({
    page,
  }) => {
    await fillShippingForm(page)
    await page.getByRole("button", { name: "Continue" }).click()

    await expect(
      page.getByRole("heading", { name: "Payment Address" }),
    ).toBeVisible()
  })
})

test.describe("Payment Details", () => {
  test.beforeEach(async ({ page }) => {
    await fillShippingForm(page)
    await page.getByRole("button", { name: "Continue" }).click()

    await page.getByRole("checkbox", { name: "Use Shipping Address" }).check()
  })

  test("fills payment address details when `same as shipping` checkbox is checked", async ({
    page,
  }) => {
    // Verify that payment address fields are filled with shipping data
    await expect(page.getByRole("textbox", { name: "First Name" })).toHaveValue(
      shippingData.firstName,
    )
    await expect(page.getByRole("textbox", { name: "Last Name" })).toHaveValue(
      shippingData.lastName,
    )
    await expect(
      page.getByRole("textbox", { name: "Organization" }),
    ).toHaveValue(shippingData.organization)
    await expect(page.getByRole("textbox", { name: "Lab/Group" })).toHaveValue(
      shippingData.labGroup,
    )
    await expect(
      page.getByRole("textbox", { name: "Phone Number" }),
    ).toHaveValue(shippingData.phoneNumber)
    await expect(
      page.getByRole("textbox", { name: "Address Line 1" }),
    ).toHaveValue(shippingData.addressLine1)
    await expect(
      page.getByRole("textbox", { name: "Address Line 2" }),
    ).toHaveValue(shippingData.addressLine2)
    await expect(page.getByRole("textbox", { name: "City" })).toHaveValue(
      shippingData.city,
    )
    await expect(
      page.getByRole("textbox", { name: "State/Province" }),
    ).toHaveValue(shippingData.stateProvince)
    await expect(page.getByRole("textbox", { name: "Zip Code" })).toHaveValue(
      shippingData.zipCode,
    )
    await expect(page.getByRole("textbox", { name: "Country" })).toHaveValue(
      shippingData.country,
    )
  })

  test("displays `Review Your Order` view after continuing from `Payment Details` view", async ({
    page,
  }) => {
    await page
      .getByRole("textbox", { name: "Purchase Order Number" })
      .fill("123456")
    await page.getByRole("button", { name: "Continue" }).click()

    // Main heading
    await expect(
      page.getByRole("heading", { name: "Order Summary" }),
    ).toBeVisible()

    // Order item details
    await expect(page.getByText("[smp3]-")).toBeVisible()
    await expect(page.getByText("DBS0391520")).toBeVisible()
    await expect(
      page.getByText(
        "Genome Wide Dictyostelium Insertion bank (GWDI) intergenic mutant",
      ),
    ).toBeVisible()
    await expect(page.getByText("$30.00").first()).toBeVisible()

    // Order total
    await expect(page.getByRole("heading", { name: "Total" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "$30.00" })).toBeVisible()

    // Shipping Address section
    await expect(
      page.getByRole("heading", { name: "Shipping Address" }),
    ).toBeVisible()
    await expect(page.getByText("John Doe").first()).toBeVisible()
    await expect(
      page.getByText("University Research Lab").first(),
    ).toBeVisible()
    await expect(page.getByText("Molecular Biology Lab").first()).toBeVisible()
    await expect(
      page.getByText("123 Research Drive, Suite 456").first(),
    ).toBeVisible()
    await expect(
      page.getByText("Science City, California, United States 12345").first(),
    ).toBeVisible()
    await expect(page.getByText("555-123-4567").first()).toBeVisible()
    await expect(
      page.getByText("john.doe@university.edu").first(),
    ).toBeVisible()
    await expect(page.getByText("DHL 1").first()).toBeVisible()

    // Payment Details section
    await expect(
      page.getByRole("heading", { name: "Payment Details" }),
    ).toBeVisible()
    await expect(page.getByText("PurchaseOrder 123456")).toBeVisible()

    // Action buttons
    await expect(page.getByRole("button", { name: "Back" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible()
  })

  test("displays `Order Confirmation` view after continuing from `Order Summary` view", async ({
    page,
  }) => {
    await page
      .getByRole("textbox", { name: "Purchase Order Number" })
      .fill("123456")
    await page.getByRole("button", { name: "Continue" }).click()
    await page.getByRole("button", { name: "Submit" }).click()
    await expect(page.getByText(/Order ID: \d+/)).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Thank you for your order" }),
    ).toBeVisible()
  })
})
