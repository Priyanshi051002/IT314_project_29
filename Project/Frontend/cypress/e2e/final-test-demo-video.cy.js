describe("Ultimate final test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signinout");
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
    cy.url().should("equal", "http://localhost:3000/feed");
  });

  // to be continued
});
