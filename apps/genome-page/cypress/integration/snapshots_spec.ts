describe("Gene page snapshots", () => {
  it("visits the sadA gene summary page", () => {
    cy.visit("/gene/sadA")
    cy.contains("Molecular Function")
  })

  it("visits the sadA go annotations page", () => {
    cy.visit("/gene/sadA/goannotations")
    cy.contains("Molecular Function")
  })

  // TODO: Uncomment when graphql server has implemented the required "allStrains" query
  // it("visits the sadA phenotypes page", () => {
  //   cy.visit("/gene/sadA/phenotypes")
  //   cy.contains("Phenotypes for sadA")
  //   cy.contains("Strain")
  //   cy.contains("Characteristics")
  //   cy.contains("Phenotype")
  //   cy.contains("Reference(s)")
  // })

  // TODO: Uncomment when graphql server has implemented the required "allPublications" query
  // it("visits the sadA references page", () => {
  //   cy.visit("/gene/sadA/references")
  //   cy.contains("Reference")
  //   cy.contains("Other Genes Mentioned")
  // })
})
