describe("Profile Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", "http://localhost:3000/");
    cy.reload();
    // if else statement in cypress
    cy.request("http://localhost:5000/user/getProfile").then((response) => {
      if (response.body.sucess) {
        cy.reload();
      }
    });
  });

  it("Should navigate to profile page after successful login", () => {
    cy.visit("http://localhost:3000/profile");
  });

  it("Should Edit profile", () => {
    cy.visit("http://localhost:3000/profile");
    cy.get("button:contains('Edit Profile')").click();
    cy.get("input[name='name']").clear().type("Devdeep is darth vadar");
    // cy.get("input[name='about']").clear().type("I am the sith loard");
    cy.get("button[type='submit']").click();
  });

  it("Should See My post - method:1 (Bottom of profile then show posts)", () => {
    cy.visit("http://localhost:3000/profile");
    cy.wait(2000);
    cy.scrollTo("bottom");
    cy.wait(2000);
    cy.get("a:contains('My Posts')").eq(0).click();
    cy.visit("http://localhost:3000/myposts");
  });

  it("Should see My post - method:2 (My posts button navbar)", () => {
    cy.visit("http://localhost:3000/profile");
    cy.scrollTo("top");
    cy.get("a:contains('My Posts')").eq(0).click();
  });
});
