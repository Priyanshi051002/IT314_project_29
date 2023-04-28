/// <reference types="cypress" />
import { slowCypressDown } from "cypress-slow-down";
slowCypressDown(100);
import { randCatchPhrase, randCity, randSkill } from "@ngneat/falso";

describe("Test the whole app", () => {
  it("Go the Home Page", () => {
    // let name = randFullName();
    // let password = randPassword();
    // let email = randEmail();
    cy.visit("/");
    cy.wait(3000);

    cy.get("button:contains('Get Started.')").click();
    cy.get('a:contains("Sign Up")').click();
    cy.get("[name='name']").type("Devdeep");
    cy.get("[name='username']").type("Dipper@gf.com");
    cy.get("[name='password']").type("12345678");
    cy.get("[name='confirm_password']").type("12345678");
    cy.get("[name='birthplace']").type(randCity());
    cy.get("[name='about']").type(randSkill());
    // 2 type error in description
    cy.get("[name='description']").eq(1).type(randCatchPhrase());
    cy.get("button[type='submit']").click();
    cy.wait(7000);

    cy.get("button:contains('Sign In')").click();
  });

  it("Sign In and show feed page", () => {
    cy.visit("/signinout");
    cy.get("input[name='username']").type("Dipper@gf.com");
    cy.get("input[name='password']").type("12345678");
    cy.get("button[type='submit']").click();
    cy.wait(5000);
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
    cy.reload();
    // if else statement in cypress
    cy.request(process.env.REACT_URL_MONGO + "/user/getProfile").then(
      (response) => {
        if (response.body.sucess) {
          cy.reload();
        }
      }
    );
  });

  it("Go to Profile", () => {
    cy.visit("/profile");
    cy.wait(5000);
  });

  it("Should Edit profile", () => {
    cy.get("button:contains('Edit Profile')").click();
    cy.get("input[name='name']")
      .clear()
      .type("HA AH HA I AM BACK, BILL CIPHER");
    // cy.get("input[name='about']").clear().type("I am the sith loard");
    cy.get("button[type='submit']").click();
    cy.visit("/profile");
    cy.wait(5000);
  });

  it("Should Add Post", () => {
    cy.visit("/profile");
    cy.get("a:contains('Add Post')").eq(0).click();
    // Enter post title and content
    cy.get(".input_title").type(
      "Last post for this projects lots of test cases was written, and lots of test cases will be but this expreince of working woth this brilliant people will always haunt me 😆 . Just kidding I will miss this project and the people who worked on it."
    );
    cy.scrollTo("bottom");
    // Click "Add Post" button
    cy.get("button[classname='add_posts']").click();
    cy.get("button[classname='confirm_bhai']").click().visit("/myposts");
  });

  it("Should show the post", () => {
    cy.visit("/profile");
    cy.get("a:contains('My Posts')").eq(0).click();
    cy.visit("/myposts");
    cy.wait(5000);
  });

  it("Comment on post", () => {
    cy.visit("/feed");
    cy.get("svg[name='comment']").eq(0).click();
    cy.get("textarea[name='comment-text']").type(
      "Remember! Reality's an illusion, the universe is a hologram, buy gold! Byeeee! ."
    );
    cy.get("button[type='submit']").eq(1).click();
    cy.get("svg[name='comment']").eq(0).dblclick();
    cy.get("svg[name='comment']").eq(0).dblclick();
    cy.wait(5000);
  });

  it("Like on post", () => {
    cy.visit("/feed");
    cy.wait(2000);
    // comment on a post
    // cy.get("button").contains("Comment").click();
    cy.get("button[name='like']").eq(9).click();
    cy.wait(4000);
    cy.get("button[name='like']").eq(9).click();
  });

  it("Go to Connections page", () => {
    cy.request(process.env.REACT_URL_MONGO + "/user/getProfile").then(
      (response) => {
        if (response.body.sucess) {
          cy.reload();
        }
      }
    );
    cy.visit("/profile");
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.wait(3000);
  });

  it("Follow a user", () => {
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.get("a:contains('Connect')").eq(1).click();
    cy.get("button:contains('Connect')").eq(0).click();
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.wait(4000);
  });

  it("Check the Connections page now", () => {
    cy.visit("/profile");
    cy.get("a:contains('My Connections')").eq(0).click();
    cy.wait(3000);
  });

  it("Show Elastisearch Implementation in search", () => {
    cy.visit("/feed");
    cy.get("input[name='search']").type("devdeep");
    cy.get("button[type='submit']").click();
    cy.wait(800);
    cy.reload();
  });

  it("Sign Out", () => {
    cy.visit("/");
    cy.clearCookies(); // Clear cookies for the currrent domain
  });
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
