import { test, expect } from "@playwright/test"

test("All Links are working", async ({ page, request }) => {
  await page.goto("https://staging.dictycr.org", { waitUntil: "networkidle" })
  
  //Check that 
  const links = await page.getByRole("link", { includeHidden: true }).evaluateAll((anchors) => anchors.map((a) => a.href))
  for (const link of links) {
    try {
      console.log(link)
      const response = await request.get(link)
      // console.log(response)
    } catch {
      console.log("error")
    }
  }
})
