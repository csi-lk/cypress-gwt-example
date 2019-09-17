import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"

const localUrl = "http://localhost:3000/"

// Navigation
Given(`I am on the {string} page`, target => navigateUrl(target))
When(`I navigate to the {string} page`, target => navigateUrl(target))

export function navigateUrl(target) {
  cy.visit(`${localUrl}${target.toLowerCase()}`)
}

// Assertions
Then(`I should be on the {string} page`, target => assertUrl(target))

export function assertUrl(target) {
  cy.url().should("be", `${localUrl}${target}`) //TODO: this assertion wrong, need to read the docs
}
