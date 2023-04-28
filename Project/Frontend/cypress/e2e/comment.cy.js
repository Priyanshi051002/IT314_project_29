/// <reference types="cypress" />

describe("Comment test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", "http://localhost:3000/feed");
    cy.reload();
  });

  it("Should comment on posts", () => {
    cy.wait(2000);
    // comment on a post
    // cy.get("button").contains("Comment").click();
    cy.get("svg[name='comment']").eq(0).click();
    cy.get("textarea[name='comment-text']").type(
      "Rick Sanchez here just wanted to say wabalabadubdub  ✊✋✌️🦎🖖 "
    );
    cy.get("button[type='submit']").eq(1).click();
    cy.get("svg[name='comment']").eq(0).dblclick();
    cy.get("svg[name='comment']").eq(0).dblclick();
  });
});
