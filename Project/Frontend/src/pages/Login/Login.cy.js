describe("Login component", () => {
  it("should display the login form", () => {
    cy.get("form").should("exist");
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should allow the user to log in with valid credentials", () => {
    cy.intercept("POST", "http://localhost:5000/user/login", {
      fixture: "login-success.json",
    });

    cy.get('input[name="username"]').type("john_doe");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.get("h1").should("contain", "Welcome to the app!");
  });

  it("should show an error message when the user enters invalid credentials", () => {
    cy.intercept("POST", "http://localhost:5000/user/login", {
      fixture: "login-failure.json",
    });

    cy.get('input[name="username"]').type("jane_doe");
    cy.get('input[name="password"]').type("wrong_password");
    cy.get('button[type="submit"]').click();

    cy.get(".MuiAlert-root").should("exist");
    cy.get(".MuiAlert-message").should("contain", "Invalid Login Credentials!");
  });
});
