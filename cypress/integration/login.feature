Feature: Logging In

  Tests the user can successfully login and log out

  Scenario: Logging In Sucessfully
    Given I am on the "login" page
    When I input my "email" as "test@test.com"
    And I input my "password" as "password"
    And I click the "login" button
    Then I should be on the "dashboard" page