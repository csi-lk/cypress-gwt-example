import { Given } from "cypress-cucumber-preprocessor/steps"
import { navigateUrl } from "./navigation"
import { inputString, clickButton } from "./forms"

Given(`I {string} logged in`, status => {
  if (status === "am not") return navigateUrl("home")
  // Can set a cookie here for eg, don't need to fill out manually each time
  navigateUrl("login")
  inputString("email", "test@test.com")
  inputString("password", "password")
  clickButton("login")
})
