### How to get your product owners to write your functional tests

### AKA

## [fit] Using Given / When / Then with Cypress

### 🥒🤖

^ This presentation was written in Markdown for DeckSet (mac) which is why it looks a little weird, see attached PDF output and notes of every slide

---

## Who are you?

# Callum Silcock

### [fit] Frontend Platform Engineer @ Attest (contract)

### https://csi.lk || github.com/csi-lk

^ Have been doing frontend development and trying to take the pain out of testing for >10 years now
^ Not a twitter guy

---

🇦🇺
"dartah" = data
"rehpo" = repo

^ I have an Australian accent and mispronounce things

---

### What are we trying to solve?

^ I started a contract 4 or so years ago that had major issues with their development and deployment pipeline
^ Main goals were to decrease risk in production deployments
^ This is an evolution of that thinking to bring us to this end product
^ So lets dive in

---

```
  .─.                      .─.                                                      .─.
 (   )    ┌────────┬─┐    (   )   ┌──────────┐   ┌──────────┐       ┌──────────┐   (   )         ┌──────────┐
 ┌`─'┐    │  Ticket└─┤    ┌`─'┐   │          │   │          │ Merge │    QA    │   ┌`─'┐ Promote │          │
 │Prd│───>│  Story   │───>│Dev│──>│  Branch  │──>│    PR    │──────>│   STG    │──>│QA │────────>│Production│
 │   │    │   Bug    │    │   │   │          │   │          │       │   UAT    │   │   │         │          │
 └───┘    └──────────┘    └───┘   └──────────┘   └┬─────────┘       └──────────┘   └───┘         └──────────┘
                                                  ├>Tests Pass
                                                  └>Approval

```

^ Your current workflow probably consists of ticket > dev > pr > merge > qa / staging / uat regression > production
^ Shifting your current workflow of putting QA last to putting QA first by chaining a few tools

---

[.code-highlight: all][.code-highlight: 2]
[.code-highlight: 3][.code-highlight: 4-5]
[.code-highlight: 6][.code-highlight: 7]

```javascript
describe('logging in', () => {
	it('logs in, () => {
		cy.visit('http://localhost:3000/login');
		cy.get('email').type('contact@csi.lk');
		cy.get('password').type('hunter2');
		cy.get('input[type="button"]').click();
		cy.url().should('be', 'http://localhost:3000/dashboard');
	});
});
```

^ Let's start with Cypress
^ Classic login scenario, most peoples current tests look something like this
^ Visit, type in email / password, click the button, end up on the dashboard
^ instead of writing within cypress write these in feature

---

```feature
 Feature: Testing

   Ewww regression

   Scenario: Lack of automation
      Given I am a Frontend Developer
      When I am forced to manually test
      Then kill me
```

^ We're going to move them to a BDD approach with an old frield, cucumber
^ I know a lot of people shudder when hearing words like 'gherkins', 'cucumber' and the worst one... 'cukes' but this is quite nice, I promise
^ So if we translate our cypress scenario from before it looks like this

---

[.code-highlight: all][.code-highlight: 1]
[.code-highlight: 3][.code-highlight: 6]
[.code-highlight: 7-8][.code-highlight: 9]
[.code-highlight: 10]

```feature
Feature: Logging In

  Tests the user can successfully login and log out

  Scenario: Logging In Sucessfully
    Given I am on the "login" page
    When I input my "email" as "contact@csi.lk"
    And I input my "password" as "hunter2"
    And I click the "login" button
    Then I should be on the "dashboard" page

```

^ Feature flow of login page > email > password > login button > dashboard page
^ What's up with the quotes? This is where it gets interesting, we are defining params that will be picked up in our function later
^ We are able to start defining these steps globally in a reusable way

---

```javascript

# Given I am on the "login" page

import { Given } from "cypress-cucumber-preprocessor/steps"

Given(`I am on the {string} page`, target => {
  cy.visit(`https://localhost:3000/${target.toLowerCase()}`)
})

```

^ Allows you to define a param as part of the step string which we can pass into our re-usable function
^ Let's switch tracks to a different concept now, using data attributes make it easy for chpres to taget them

---

[.code-highlight: all][.code-highlight: 5, 11, 14]

```html
    <input
      type="email"
      name="email"
      placeholder="Email"
      data-qa="input-email"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      data-qa="input-password"
    />
    <button
      data-qa="button-login"
      onClick={() => {
        setAuthentication(true)
        history.push("/dashboard")
      }}
    >
      Log In
    </button>
```

^ React, vue, jquery, mootools doesn't matter, what we're doing here is adding a specific data attribute to each input above, i'm using 'data-qa' as it's quite declarative but you can set this to whatever you like
^ You can strip your data-qa's out of your build in prod, some do (twitter) some don't (dropbox)
^ The most important thing is to make sure you have a specific format, see above I have {type} dash {name}, depending on your project you will need to define this but make sure it's consistent

---

[.code-highlight: all][.code-highlight: 1]
[.code-highlight: 3][.code-highlight: 4]
[.code-highlight: 5][.code-highlight: 10]

```javascript
// Then the "navigation logout" button should "not" "exist"

Then(
  `the {string} button should {string} {string}`,
  (id, assert, assertion) =>
    cy
      .get(`[data-qa="${type}-${id.replace(" ", "-").toLowerCase()}"]`)
      .should(assert, assertion)
  //cy.get([data-qa="button-navigation-logout"]).should("not", "exist")
)

// Reuse!

// Then the "login" button should "be" "disabled"
```

^ This leads up the coolest part, combining the global step definitions and the data qa attributes we can do some cool shit like this
^ Allows us to reuse this over and over
^ going back to our workflow

---

```


  .─.                      .─.                    .─.
 (   )    ┌────────┬─┐    (   )   ┌──────────┐   (   )   ┌──────────┐             ┌──────────┐
 ┌`─'┐    │  Ticket└─┤    ┌`─'┐   │          │   ┌`─'┐   │          │    Merge    │          │
 │Prd│───>│  Story   │───>│QA │──>│  Branch  │──>│Dev│──>│    PR    │──────┬─────>│Production│
 │   │    │          │    │   │   │          │   │   │   │          │      │      │          │
 └───┘    └──────────┘    └───┘   └──────────┘   └───┘   └┬─────────┘      │      └──────────┘
                                                          ├>Tests Pass     │      ┌──────────┐
                                                          ├>Approval       │      │ .feature │
                                                          └>Canary for UAT └─────>│  static  │
                                                                                  │   site   │
                                                                                  └──────────┘

```

^ move qa to start of pipeline
^ Using this approach allows your product owners to write the GWT scenarios in plain english, QA picks up and validates over to dev
^ Also is powerful for Bug flows

---

```
        .─.                             .─.
       (   )    ┌────────┬─┐           (   )
       ┌`─'┐    │        └─┤  Validate ┌`─'┐
       │QA │─┬─>│   Bug    │──────────>│Prd│<┐
       │   │ │  │          │           │   │ │
       └───┘ │  └──────────┘           └───┘ │
             │                  .─.          │
             │  ┌──────────┐   (   )   ┌──────────┐             ┌──────────┐
             │  │          │   ┌`─'┐   │          │    Merge    │          │
             └─>│  Branch  │──>│Dev│──>│    PR    │──────┬─────>│Production│
                │          │   │   │   │          │      │      │          │
                └──────────┘   └───┘   └┬─────────┘      │      └──────────┘
                                        ├>Tests Pass     │      ┌──────────┐
                                        ├>Approval       │      │ .feature │
                                        └>Canary for UAT └─────>│  static  │
                                                                │   site   │
                                                                └──────────┘

```

^ Now enabled QA to create branches of these bugs through the branch / ticket
^ dev proves bug is fixed through the functional tests
^ you can even have a validation step in there for product
^ then straight to prod!

---

```

       ┌──────────┐                     ┌──────────┐        .─.
       │   new    │  parse .feature(s)  │  Static  │      │(   )│wow!
       │ .feature │────────────────────>│   Site   │      │┌`─'┐│
       │   test   │                     │Generator │      └┤Prd├┘
       └──────────┘┌──────────┐         └──────────┘       │   │
             │     │ Cypress  │               │            └───┘
             ├────>│Dashboard │<────┐         │              │
             │     │          │     │         ▼              │
             │     └──────────┘     │     ┌─────┬┐       ┌───────┐
             │     ┌──────────┐     │read │     └┤ rsync │  s3   │
             │     │  Visual  │     ├─────│output│──────>│bucket │
             └────>│Regression│<────┘     │      │       │ serve │
                   │          │           └──────┘       └───────┘
                   └──────────┘
```

^ To complete the loop publish the `.feature` files to an internal s3 bucket (or something similar) for product to know what is covered
^ Visual regression can be linked too (screenshots)
^ Cypress dashboard showing videos of the flows and screenshots, what is passing and failing
^ Gives product a overall dashboard showing what is covered, even could show build status (if you're feeling confident)
^ Ok you now understand the approach so what are the pros and cons?

---

### Cons

- Abstracting tests from code
- Lack of IDE tooling
- Lots of tests make for slow builds
- BDD Is hard

^ Your runner is now in the feature files rather than the code itself
^ There's no great intelligent IDE tools yet to bridge that gap
^ Having a ton of tests takes a while to run (although you can counter this by running against only what's changed and running tests across multiple runners)
^ BDD is a difficult state to get to, requires a lot of buy in from your product owners to dev to qa
^ But let's focus on the positive with Pros

---

### Pros

- Product owners write the tests and see the whole pipeline
- QA moves to the front of the pipeline
- Devs have less tests to write
- Less risk with deployments

^ Everyone is happy
^ Product owners can now see everything happening and the gaps they need to fill, can go to whole business
^ QA is happy as they're moving to proactive rather than reactive
^ Dev is happy because they can focus on code rather than tests
^ Lastly, less risk with production deployments as all major scnearios are covered

---

## Live Tech Demo

### 💻😱🤖

^ Show http://github.com/csi-lk/cypress-gwt-example repo
^ Show github action workflow: https://github.com/csi-lk/cypress-gwt-example/blob/master/.github/workflows/run-cypress.yml
^ Show CI working: https://github.com/csi-lk/cypress-gwt-example/actions
^ Show cypress dashboard: https://dashboard.cypress.io/#/projects/syj7cg/runs

---

# Thanks

# [FIT] github.com/csi-lk/cypress-gwt-example

#### ❤️ Callum Silcock

^ Companion repo showing how to set this up
^ if you have questions let me know
^ Thanks
