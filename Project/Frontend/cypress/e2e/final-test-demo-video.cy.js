describe("Ultimate final test", () => {
  beforeEach(() => {
    cy.visit("/signinout");
  });

  it("Should give tour of website covering major features", () => {
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid Login Credentials!");

    cy.reload();
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
  });

  // to be continued
});

// sign up random --> flaso
// sign in direct
// home page
// profile
// edit
// add post
// like
// comment
// go to page folow - followr
// connect random
// search
