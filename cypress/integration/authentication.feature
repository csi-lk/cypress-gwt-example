Feature: Authentication

  Scenario: Can't access protected routes   
    Given I "am not" logged in
    When I navigate to the "dashboard" page
    Then I should be on the "home" page

  Scenario: Should be able to log out   
    Given I "am" logged in
    When I click the "navigation logout" button
    Then I should be on the "home" page
    And the "navigation logout" button should "not" "exist"