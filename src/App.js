import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom"
import "./App.css"

const AuthButton = withRouter(
  ({ history, isAuthenticated, setAuthentication }) =>
    isAuthenticated ? (
      <button
        onClick={() => {
          setAuthentication(false)
          history.push("/home")
        }}
      >
        Log out
      </button>
    ) : (
      <button
        onClick={() => {
          history.push("/login")
        }}
      >
        Log In
      </button>
    )
)

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const Login = withRouter(({ history, setAuthentication }) => (
  <div className="form">
    <h2>Please login to continue</h2>
    <p>Requires no credentials, just click log in</p>
    <input type="email" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <button
      onClick={() => {
        history.push("/dashboard")
        setAuthentication(true)
      }}
    >
      Log In
    </button>
  </div>
))

const Navigation = ({ isAuthenticated, setAuthentication }) => (
  <nav>
    <Link to="/home">
      <span role="img" aria-label="robot">
        🤖
      </span>
      Home
    </Link>
    {isAuthenticated && (
      <Link to="/dashboard">
        <span role="img" aria-label="robot">
          🚙
        </span>
        Dashboard
      </Link>
    )}
    <AuthButton
      isAuthenticated={isAuthenticated}
      setAuthentication={setAuthentication}
    />
  </nav>
)

const Home = () => (
  <div className="page">
    <h1>Cypress GWT Example</h1>
    <h2>This is a dummy portal for cypress to test</h2>
    <p>Created by Callum Silcock for a talk on how to use GWT with Cypress</p>
  </div>
)

const Dashboard = () => (
  <div className="page">
    <h1>Cypress GWT Dashboard</h1>
    <h2>This is a dashboard</h2>
  </div>
)

const App = () => {
  const [isAuthenticated, setAuthentication] = useState(false)
  return (
    <Router>
      <div className="app">
        <Navigation
          isAuthenticated={isAuthenticated}
          setAuthentication={setAuthentication}
        />
        <Route path="/home" component={Home} />
        <Route
          path="/login"
          component={() => <Login setAuthentication={setAuthentication} />}
        />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Router>
  )
}

export default App
