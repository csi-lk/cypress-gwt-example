# 🤖 cypress-gwt-example

> Example repo showing how to use Cypress with Cucumber Feature files

A companion to [Callum Silcock's](https://csi.lk) talk on "How to get your product owners to write your functional tests" this repo gives you some simple examples on how to connect Cypress with Cucumber and test an app

## 🙊 The Talk

If you missed the talk check out:

- [Speakerdeck - External (slides)](https://speakerdeck.com/csilk/then-with-cypress)
- [PDF - Here (slides)](./talk/using-gwt-with-cypress.pdf)
- [Raw markdown - Here (notes + slides)](./talk/using-gwt-with-cypress-raw.md)

## 😎 How It Works

Using [cypress](https://www.cypress.io) and the [cypress-cucumber-preprocessor plugin](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor) we setup `.feature` files in the [integration folder](https://github.com/csi-lk/cypress-gwt-example/tree/master/cypress/integration) that reads the step definitions in the [step_definitions folder](https://github.com/csi-lk/cypress-gwt-example/tree/master/cypress/support/step_definitions) to generate our Cypress tests.

These then test our served [App](https://github.com/csi-lk/cypress-gwt-example/blob/master/src/App.js)

## 🔥Running Locally

```sh
# Clone me
git clone git@github.com:csi-lk/cypress-gwt-example.git
```

```sh
# Install dependencies
yarn
```

```sh
# Build the app
yarn build
```

```sh
# Open Cypress
yarn test
```

```sh
# Run Cypress in headless mode 🤯
yarn test:ci
```

## 🛂 CI

Have setup a [workflow](https://github.com/csi-lk/cypress-gwt-example/blob/master/.github/workflows/run-cypress.yml) in the [Actions](https://github.com/csi-lk/cypress-gwt-example/actions) tab above that should give you a good idea of how it operates in a CI environment

If you're interested, I've also connected the [cypress dashboard](https://dashboard.cypress.io/#/projects/syj7cg/runs) so you can check also check the videos of it in action.

---

If you have any questions please [raise an issue](https://github.com/csi-lk/cypress-gwt-example/issues/new) above

<3 [Callum Silcock](https://csi.lk)
