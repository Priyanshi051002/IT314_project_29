/// <reference types="cypress" />

import {
  randCatchPhrase,
  randCity,
  randEmail,
  randFullName,
  randLocale,
  randPassword,
  randSkill,
} from "@ngneat/falso";

describe("Register", () => {
  // cypress register test
  it("Successfully loads the SignUp page", () => {
    cy.visit("http://localhost:3000/signinout");
    cy.url().should("include", "/signinout");
    // got to sign up page
    // cy.get("SIGN UP").click();
    cy.get("form").should("have.length", 1);
  });

  describe("Sign Up Form Testing", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signinout");
      // go to sign up page from nav bar
      // go you have account no problem go to login page
      cy.get('a:contains("Sign Up")').click();
    });

    it("Displays an error message if passwords don't match", () => {
      cy.get("[name='name']").type("Luke Skywalker");
      cy.get("[name='username']").type("luke@gmail.com");
      cy.get("[name='password']").type("password");
      cy.get("[name='confirm_password']").type("wrongpassword");
      cy.get("[name='birthplace']").type("Tatooine");
      cy.get("[name='about']").type("I am a Jedi");
      cy.get("[name='description']").eq(1).type("Jedi Knight");
      cy.get("button[type='submit']").click();
      cy.get(".MuiAlert-message").should(
        "contain.text",
        "Password did not match!"
      );
    });

    it("Successfully signs up a new user", () => {
      cy.get("[name='name']").type("Leia Skywalker");
      cy.get("[name='username']").type("leia@gmail.com");
      cy.get("[name='password']").type("lukeIamYourFather");
      cy.get("[name='confirm_password']").type("lukeIamYourFather");
      cy.get("[name='birthplace']").type("Tatooine");
      cy.get("[name='about']").type("I am a Jedi");
      cy.get("[name='description']")
        .eq(1)
        .type(" Jedi Knight - hates new star wars triliogy");
      cy.get("button[type='submit']").click();
    });

    it("Displays an error message if user already exists", () => {
      cy.get("[name='name']").type("Leia Skywalker");
      cy.get("[name='username']").type("leia@gmail.com");
      cy.get("[name='password']").type("password");
      cy.get("[name='confirm_password']").type("password");
      cy.get("[name='birthplace']").type("Tatooine");
      cy.get("[name='about']").type("I am a Jedi");
      // 2 type error in description
      cy.get("[name='description']")
        .eq(1)
        .type(" Jedi Knight - hates new star wars triliogy");
      cy.get("button[type='submit']").click();
      cy.get(".MuiAlert-message").should(
        "contain.text",
        "User already exists!"
      );
    });

    // it("displays an error message if passwords don't match", () => {
    //   cy.get("[name='name']").type("John Doe");
    //   cy.get("[name='username']").type("johndoe@example.com");
    //   cy.get("[name='password']").type("password");
    //   cy.get("[name='confirm_password']").type("wrongpassword");
    //   cy.get("[name='birthplace']").type("Tatooine");
    //   cy.get("[name='about']").type("I am a software developer");
    //   cy.get("[name='desc']").type(
    //     "I have 5 years of experience in web development"
    //   );
    //   cy.get("button[type='submit']").click();
    //   cy.get(".MuiAlert-message").should(
    //     "contain.text",
    //     "Password did not match!"
    //   );
    // });

    // it("successfully signs up a new user", () => {
    //   cy.get("[name='name']").type("Jane Doe");
    //   cy.get("[name='username']").type("user@example.com");
    //   cy.get("[name='password']").type("password");
    //   cy.get("[name='confirm_password']").type("password");
    //   cy.get("[name='birthplace']").type("Los Angeles");
    //   cy.get("[name='about']").type("I am a software engineer");

    //   cy.get("[name='desc']").type(
    //     "I have 3 years of experience in mobile app development"
    //   );
    //   cy.get("button[type='submit']").click();
    //   cy.url().should("include", "/login");
    // });

    // it("displays an error message if user already exists", () => {
    //   cy.get("[name='name']").type("John Doe");
    //   cy.get("[name='username']").type("user@example.com");
    //   cy.get("[name='password']").type("password");
    //   cy.get("[name='confirm_password']").type("password");
    //   cy.get("[name='birthplace']").type("New York");
    //   cy.get("[name='about']").type("I am a software developer");
    //   cy.get("[name='desc']").type(
    //     "I have 5 years of experience in web development"
    //   );
    //   cy.get("button[type='submit']").click();
    //   cy.get(".MuiAlert-message").should(
    //     "contain.text",
    //     "User already exists!"
    //   );
    // });
  });

  describe("Rigorous testing", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signinout");
      // go to sign up page from nav bar
      // go you have account no problem go to login page
      cy.get('a:contains("Sign Up")').click();
    });

    it("Get 10 users signed up", () => {
      for (let i = 0; i < 10; i++) {
        cy.visit("http://localhost:3000/signinout");
        cy.get('a:contains("Sign Up")').click();
        cy.get("[name='name']").type(randFullName());
        cy.get("[name='username']").type(randEmail());
        let password = randPassword();
        cy.get("[name='password']").type(password);
        cy.get("[name='confirm_password']").type(password);
        cy.get("[name='birthplace']").type(randCity());
        cy.get("[name='about']").type(randSkill());
        // 2 type error in description
        cy.get("[name='description']").eq(1).type(randCatchPhrase());
        cy.get("button[type='submit']").click();
      }
    });
  });
});
