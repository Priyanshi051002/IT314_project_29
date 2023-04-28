/// <reference types="cypress" />

describe("Login component", () => {
  beforeEach(() => {
    cy.visit("/signinout");
  });

  it("Displays the login form", () => {
    cy.contains("Sign in");
    cy.get("form").should("have.length", 1);
    cy.get("input[name='username']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  it("Redirects to the home page after successful login", () => {
    // // Stub the login API call
    // cy.intercept("POST", "/user/login", { fixture: "login-success.json" });

    // Fill in the form and submit
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();

    // cy.wait("@signin").its("request.body").should("deep.equal", {
    //   username: "d@gmail.com",
    //   password: "1234",
    // });

    // Verify that the user is redirected to the home page
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
  });

  it("Displays an error message for invalid login credentials", () => {
    // Stub the login API call to return an error
    cy.intercept("POST", "/user/login", {
      statusCode: 401,
      body: { success: false, message: "Invalid login credentials" },
    });

    // Fill in the form and submit
    cy.get("input[name='username']").type("johndoe");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();

    // Verify that an error message is displayed
    cy.contains("Invalid Login Credentials!");
  });

  it("Don't have account go to sign up", () => {
    cy.get('a:contains("Sign Up")').click();
    cy.url().should("equal", Cypress.config().baseUrl + "/signinout");
  });

  it("Forgot Password birthplce->return-->password change", () => {
    cy.get('a:contains("Forgot Password")').click();
    cy.url().should("equal", Cypress.config().baseUrl + "/pc");

    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='birthplace']").type("Tatooine");
    cy.get("button[type='submit']").click();

    cy.get("input[name='password']").type("1234");
    cy.get("input[name='confirmPass']").type("1234");
    cy.get("button[type='submit']").click();
  });

  it("Check is password is changed and login", () => {
    // // Stub the login API call
    // cy.intercept("POST", "/user/login", { fixture: "login-success.json" });

    // Fill in the form and submit
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();

    // // Verify that the login API was called with the correct credentials
    // cy.wait("@signin").its("request.body").should("deep.equal", {
    //   username: "d@gmail.com",
    //   password: "1234",
    // });

    // Verify that the user is redirected to the home page
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
  });
});
