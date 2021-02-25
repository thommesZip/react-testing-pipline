describe("All tests", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("Validation & Success", () => {
    cy.get(selectors.submitBtn).click();
    cy.get(selectors.validationError).contains("name is a required field");
    cy.get(selectors.nameInput).type("J");
    cy.get(selectors.validationError).contains("Your name is too short!");
    cy.get(selectors.nameInput).type("ohn");
    cy.get(selectors.submitBtn).click();

    cy.location("pathname").should("eq", "/come-in");
    cy.get(selectors.successHeadline).contains("Yay!");

    cy.get(".button").click();
    cy.location("pathname").should("eq", "/");
  });

  it("Not on list", () => {
    cy.get(selectors.nameInput).type("Michael");
    cy.get(selectors.submitBtn).click();
    cy.get(selectors.apiError).contains("not on the list");
  });
});

export const selectors = {
  nameInput: "#name",
  submitBtn: ".button",
  apiError: ".has-text-danger",
  validationError: ".help.is-danger",
  successHeadline: ".title",
};
