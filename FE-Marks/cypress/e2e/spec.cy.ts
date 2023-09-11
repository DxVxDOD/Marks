describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "David Orban Jozsef",
      username: "David",
      password: "987456123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  describe("Login", function () {
    it("Successful login with right credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("David");
      cy.get("#password").type("987456123");
      cy.get("#login-button").click();

      cy.contains("David Orban Jozsef is logged in");
    });

    it("Unsuccessful login witth wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Wrong");
      cy.get("#password").type("Credentials");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "David Orban Jozsef is logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "David", password: "987456123" });
    });

    it("Creating a new blog", function () {
      cy.createBlog({
        author: "Testing author field for creating it",
        title: "Testing title field for creating it",
        url: "Testing url field for creating it",
      });
      cy.contains(
        "Testing title field for creating it Testing author field for creating it",
      );
    });
    describe("A blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          author: "Testing author field",
          title: "Testing title field",
          url: "Testing url field",
        });
        cy.contains("Testing title field Testing author field");
      });

      it("Liking a blog", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("1");
      });

      it("Only users can like the blogs", function () {
        cy.contains("Log out").click();
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("0");
        cy.get("#likes").should("not.contain", "1");
      });

      it("Deleting a blog", function () {
        cy.contains("view").click();
        cy.contains("remove").click();

        cy.get(".success")
          .should("contain", "Testing title field has been removed")
          .and("have.css", "color", "rgb(0, 128, 0)");
        cy.contains("Testing title field Testing author field").should(
          "not.exist",
        );
      });

      it("Only the author can delete the blog", function () {
        cy.contains("Log out").click();
        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });
    });

    describe("Multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          author: "Testing author field",
          title: "Testing title field",
          url: "Testing url field",
        });
        cy.contains("Testing title field Testing author field");

        cy.createBlog({
          author: "Blog with the most likes",
          title: "Blog with the most likes",
          url: "Blog with the most likes",
        });
        cy.contains("Blog with the most likes Blog with the most likes");
      });
      it("The blog with the most likes is first", function () {
        cy.contains("Blog with the most likes Blog with the most likes")
          .contains("view")
          .click();
        for (let n = 0; n < 10; n++) {
          cy.get("#likeButton").click();
          cy.wait(500);
        }
        cy.contains("hide").click();

        cy.contains("Testing title field Testing author field")
          .contains("view")
          .click()
          .get("#likeButton")
          .click();
        cy.contains("hide").click();

        cy.get(".blog")
          .eq(0)
          .should(
            "contain",
            "Blog with the most likes Blog with the most likes",
          );
        cy.get(".blog")
          .eq(1)
          .should("contain", "Testing title field Testing author field");
      });
    });
  });
});
