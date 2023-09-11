/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Chainable;
    createBlog({
      author,
      title,
      url,
    }: {
      author: string;
      title: string;
      url: string;
      likes?: number;
    }): Chainable;
  }
}
