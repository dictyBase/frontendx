import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/flex")
})

test("Pressing <Enter> in a paragraph creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(2)
})

test("Pressing <Backspace> in an empty paragraph removes the paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(2)
  await editor.press("Backspace")
  await expect(editor.locator("p")).toBeVisible()
})

test("Pressing <Enter> in a Heading creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Heading 1" }).click()

  await expect(editor.locator("h1")).toBeVisible()
  await editor.press("Enter")
  await expect(editor.locator("p")).toBeVisible()
})

test("Pressing <Enter> in a heading creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Heading 1" }).click()

  await expect(editor.locator("h1")).toBeVisible()
  await editor.press("Enter")
  await expect(editor.locator("p")).toBeVisible()
})

test("Pressing <Enter> in a non-empty bulleted list listitem creates a listitem", async ({
  page,
}) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Bulleted List" }).click()

  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ul")).toBeVisible()
  await expect(editor.locator("li")).toBeVisible()
  await editor.pressSequentially("item 1")
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(2)
})

test("Pressing <Enter> in an empty bulleted list listitem removes that list item and creates a paragraph", async ({
  page,
}) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Bulleted List" }).click()

  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ul")).toBeVisible()
  await expect(editor.locator("li")).toBeVisible()
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(0)
  await expect(editor.locator("p")).toBeVisible()
})

test("Pressing <Enter> in a non-empty numbered list listitem creates a listitem", async ({
  page,
}) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Numbered List" }).click()

  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ol")).toBeVisible()
  await expect(editor.locator("li")).toBeVisible()
  await editor.pressSequentially("item 1")
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(2)
})

test("Pressing <Enter> in an empty numbered list listitem removes that list item and creates a paragraph", async ({
  page,
}) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Numbered List" }).click()

  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ol")).toBeVisible()
  await expect(editor.locator("li")).toBeVisible()
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(0)
  await expect(editor.locator("p")).toBeVisible()
})

test("Pressing <Enter> in a quote block creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Quote" }).click()

  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("blockquote")).toBeVisible()
  await editor.press("Enter")
  await expect(editor.locator("p")).toBeVisible()
})

const sampleText = "This is a link"

test.describe("Link Node", () => {
  test("Toolbar's Link Insertion Button inserts a link into the selected paragraph", async ({
    page,
  }) => {
    const editor = page.getByRole("textbox")
    await editor.click()
    await page.getByRole("button", { name: "Open Link Dialog" }).click()
    const linkTextField = page.getByRole("textbox", { name: "Link Text" })
    await linkTextField.fill(sampleText)

    const linkUrlField = page.getByRole("textbox", { name: "Link URL" })
    await linkUrlField.fill("dictybase.dev")

    await page.getByRole("button", { name: "Insert Link" }).click()

    expect(editor.locator("p").locator("a")).toBeVisible()
  })

  test("Pressing <Enter> in a link node in a paragraph creates a new paragraph", async ({
    page,
  }) => {
    const editor = page.getByRole("textbox")
    await editor.click()
    await page.getByRole("button", { name: "Open Link Dialog" }).click()
    const linkTextField = page.getByRole("textbox", { name: "Link Text" })
    await linkTextField.fill(sampleText)

    const linkUrlField = page.getByRole("textbox", { name: "Link URL" })
    await linkUrlField.fill("dictybase.dev")

    await page.getByRole("button", { name: "Insert Link" }).click()
    await editor.press("Enter")
    expect(editor.locator("p")).toHaveCount(2)
  })
  test("Deleting all text in a link node removes the node", async ({ page }) => {
    const editor = page.getByRole("textbox")
    await editor.click()
    await page.getByRole("button", { name: "Open Link Dialog" }).click()
    const linkTextField = page.getByRole("textbox", { name: "Link Text" })
    await linkTextField.fill(sampleText)

    const linkUrlField = page.getByRole("textbox", { name: "Link URL" })
    await linkUrlField.fill("dictybase.dev")

    await page.getByRole("button", { name: "Insert Link" }).click()
    for (let i = 0; i <= sampleText.length; i++) {
      await editor.press("Backspace")
    }
    expect(editor.locator("a")).toHaveCount(0)
  })

  test("Toolbar Insertion Button inserts a link into the selected list item", async ({ page }) => {
    const editor = page.getByRole("textbox")
    await editor.click()
    await page.getByText("Normal").click()
    await page.getByRole("option", { name: "Bulleted List" }).click()

    await page.getByRole("button", { name: "Open Link Dialog" }).click()
    const linkTextField = page.getByRole("textbox", { name: "Link Text" })
    await linkTextField.fill(sampleText)

    const linkUrlField = page.getByRole("textbox", { name: "Link URL" })
    await linkUrlField.fill("dictybase.dev")
    await page.getByRole("button", { name: "Insert Link" }).click()

    expect(editor.getByRole("listitem").getByRole("link")).toBeVisible()
  })
})

test.describe("Image Node", () => {
  test("Toolbar Image Button inserts an image into the editor", async ({ page }) => {
    const editor = page.getByRole("textbox")
    await page.getByRole("button", { name: "Image" }).click()

    expect(editor.getByRole("img")).toBeVisible()
  })

  test("Clicking an Image changes the selection to the ImageNode ", async ({ page }) => {
    const editor = page.getByRole("textbox")
    await page.getByRole("button", { name: "Image" }).click()
    const image = editor.getByRole("img")
    expect(image).toBeVisible()
    await image.click()
  })
  test("Pressing <Enter> when an ImageNode is selected inserts a paragraph as its next sibling", async ({
    page,
  }) => {
    const editor = page.getByRole("textbox")
    await page.getByRole("button", { name: "Image" }).click()
    const image = editor.getByRole("img")
    expect(image).toBeVisible()
    expect(editor.getByRole("paragraph")).toHaveCount(1)
    expect(image)
    await image.click()
    await editor.press("Enter")
    expect(editor.getByRole("paragraph")).toHaveCount(2)
    expect(editor.locator("p:below(img)")).toBeVisible()
  })
  test("Clicking on the ImageNode's outer div selects the ImageNode", async ({ page }) => {
    const editor = page.getByRole("textbox")
    await page.getByRole("button", { name: "Image" }).click()
    const imageOuterDiv = editor.locator(".editor-image")
    await imageOuterDiv.click()
    expect(page.getByTestId("selected-image")).toBeVisible()
  })
})
