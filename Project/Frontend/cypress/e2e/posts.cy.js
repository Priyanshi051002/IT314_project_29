/// <reference types="cypress" />

describe("Posts testing", () => {
  beforeEach(() => {
    cy.visit("/signinout");
    cy.get("input[name='username']").type("darthvadar@forcechock.com");
    cy.get("input[name='password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/feed");
    cy.reload();
    // if else statement in cypress
    cy.request(process.env.REACT_APP_MONGO + "/user/getProfile").then(
      (response) => {
        if (response.body.sucess) {
          cy.reload();
        }
      }
    );
    cy.visit("/profile");
  });

  it("Massive test: Should create a new post -> After showing the post", () => {
    cy.get("button[name='addPost']").click();
    // Enter post title and content
    cy.get(".input_title").type(
      "How to make test cases from 4:30-5:00 am by devdeep"
    );

    // Attach image file
    // const fileName = "temp.jpg";
    // cy.fixture(fileName).then((fileContent) => {
    //   cy.get("#image-input").upload({
    //     fileContent,
    //     fileName,
    //     mimeType: "image/jpg",
    //   });
    // });

    //TODO : future aspect of adding video and document through cypress
    // // Attach video file
    // const videoFileName = "test-video.mp4";
    // cy.fixture(videoFileName).then((fileContent) => {
    //   cy.get("#video-input").upload({
    //     fileContent,
    //     videoFileName,
    //     mimeType: "video/mp4",
    //   });
    // });

    // // Attach document file
    // const documentFileName = "test-document.pdf";
    // cy.fixture(documentFileName).then((fileContent) => {
    //   cy.get("#document-input").upload({
    //     fileContent,
    //     documentFileName,
    //     mimeType: "application/pdf",
    //   });
    // });
    cy.scrollTo("bottom");
    // Click "Add Post" button
    cy.get("button[classname='add_posts']").click();
    cy.get("button[classname='confirm_bhai']").click().visit("/myposts");

    cy.scrollTo("bottom");
  });

  it("Massive test: Should create a new post using navbar", () => {
    cy.get("a:contains('Add Post')").eq(0).click();
    // Enter post title and content
    cy.get(".input_title").type(
      "How to make test cases from 5:00 with yours truly Devdeep"
    );

    // Attach image file
    // const fileName = "temp.jpg";
    // cy.fixture(fileName).then((fileContent) => {
    //   cy.get("#image-input").upload({
    //     fileContent,
    //     fileName,
    //     mimeType: "image/jpg",
    //   });
    // });

    //TODO : future aspect of adding video and document through cypress
    // // Attach video file
    // const videoFileName = "test-video.mp4";
    // cy.fixture(videoFileName).then((fileContent) => {
    //   cy.get("#video-input").upload({
    //     fileContent,
    //     videoFileName,
    //     mimeType: "video/mp4",
    //   });
    // });

    // // Attach document file
    // const documentFileName = "test-document.pdf";
    // cy.fixture(documentFileName).then((fileContent) => {
    //   cy.get("#document-input").upload({
    //     fileContent,
    //     documentFileName,
    //     mimeType: "application/pdf",
    //   });
    // });
    cy.scrollTo("bottom");
    // Click "Add Post" button
    cy.get("button[classname='add_posts']").click();
    cy.get("button[classname='confirm_bhai']").click().visit("/myposts");

    cy.scrollTo("bottom");
  });

  it("Should delete the post", () => {
    cy.get("svg[name='delete']").eq(1).click();
    // confirmation message
    // cy.wait(cy.get(".MuiAlert-message").should("contain.text", "Post deleted"));
    cy.visit("/myposts");
  });
});
