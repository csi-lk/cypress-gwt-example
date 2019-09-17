import { When } from "cypress-cucumber-preprocessor/steps"

// Inputs

When(`I input my {string} as {string}`, (id, input) => inputString(id, input))

export function inputString(id, input) {
  dataQa("input", id).type(input)
}

// Buttons

When(`I click the {string} button`, id => clickButton(id))
When(`the {string} button should {string} {string}`, (id, assert, assertion) =>
  assertButton(id, assert, assertion)
)

export function clickButton(id) {
  dataQa("button", id).click()
}

// Complex assertion example
export function assertButton(id, assert, assertion) {
  dataQa("button", id).should(assert, assertion)
  //And the "logout" button "should say" "login"
}

// Utility
// As your tests grow and get more complex these should be moved to helpers / library functions

export function dataQa(type, id) {
  return cy.get(`[data-qa="${type}-${id.replace(" ", "-").toLowerCase()}"]`)
}
