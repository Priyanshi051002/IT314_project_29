/// <reference types="cypress" />

describe("Like test", () => {
  beforeEach(() => {
    cy.visit("/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
    cy.reload();
  });

  it("Should like on post if not liked else unlike (toggle) like on 9th post", () => {
    cy.wait(2000);
    // comment on a post
    // cy.get("button").contains("Comment").click();
    cy.get("button[name='like']").eq(9).click();
    cy.wait(5000);
    cy.get("button[name='like']").eq(9).click();
  });
});
