describe("Gene page snapshots", () => {
  it("visits the sadA gene summary page", () => {
    cy.visit("/gene/sadA")
    cy.contains("Gene Summary for sadA")
    cy.percySnapshot("Gene summary sadA", { widths: [360, 768, 1000, 1300] })
  })
  it("visits the sadA go annotations page", () => {
    cy.visit("/gene/sadA/goannotations")
    cy.contains("Gene Ontology Annotations for sadA")
    cy.percySnapshot("GO annotations sadA", {
      widths: [360, 768, 1000, 1300],
    })
  })
})
