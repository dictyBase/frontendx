describe("Gene page snapshots", () => {
  it("visits the sadA gene summary page", () => {
    cy.visit("/gene/sadA")
    cy.contains("Molecular Function")
    cy.percySnapshot("Gene summary sadA", { widths: [360, 768, 1000, 1300] })
  })
  it("visits the sadA go annotations page", () => {
    cy.visit("/gene/sadA/goannotations")
    cy.contains("Molecular Function")
    cy.percySnapshot("GO annotations sadA", {
      widths: [360, 768, 1000, 1300],
    })
  })
})
