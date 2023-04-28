/// <reference types="cypress" />

describe("Site is running", () => {
  it("passes", () => {
    cy.visit("/");
  });
});
