import { Then } from "cypress-cucumber-preprocessor/steps"

Then(`I should see the {string} title`, title => {
  cy.get("h1").should("be", title)
})
