/// <reference types="cypress" />

describe("Site is running", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
  });
});
