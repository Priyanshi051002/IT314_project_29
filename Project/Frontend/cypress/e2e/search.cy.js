/// <reference types="cypress" />

describe("Search test", () => {
  beforeEach(() => {
    cy.visit("/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
    cy.reload();
    // if else statement in cypress
    cy.request(process.env.REACT_APP_MONGO + "/user/getProfile").then(
      (response) => {
        if (response.body.sucess) {
          cy.reload();
        }
      }
    );
  });

  it("Should search this in post", () => {
    cy.get("input[name='search']").type("devdeep");
    cy.get("button[type='submit']").click();
    cy.wait(750);
    cy.reload();
  });

  it("Should search this in post not found so random data", () => {
    cy.get("input[name='search']").type("trade");
    cy.get("button[type='submit']").click();
    cy.reload();
  });
});
