/// <reference types="cypress" />

describe("Connect user test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", "http://localhost:3000/feed");
    cy.reload();
    // if else statement in cypress
    cy.request("http://localhost:5000/user/getProfile").then((response) => {
      if (response.body.sucess) {
        cy.reload();
      }
    });
    cy.visit("http://localhost:3000/profile");
  });

  it("Go to Connections page", () => {
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.wait(3000);
  });

  it("Connect with a user", () => {
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.get("a:contains('Connect')").eq(1).click();
    cy.get("button:contains('Connect')").eq(0).click();
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.wait(3000);
  });

  it("Connect with multiple users", () => {
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.get("a:contains('Connect')").eq(1).click();
    cy.get("button:contains('Connect')").eq(0).click();
    cy.get("button:contains('Connect')").eq(1).click();
    cy.get("button:contains('Connect')").eq(2).click();
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.wait(3000);
  });

  afterEach(() => {
    cy.visit("http://localhost:3000");
  });
});

describe("After the case connections", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", "http://localhost:3000/feed");
    cy.reload();
    // if else statement in cypress
    cy.request("http://localhost:5000/user/getProfile").then((response) => {
      if (response.body.sucess) {
        cy.reload();
      }
    });
    cy.visit("http://localhost:3000/profile");
  });

  it("Go to Connections page", () => {
    cy.get("a:contains('My Connections')").eq(0).click();
  });
});
