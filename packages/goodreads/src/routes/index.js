import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from '../components/app'
import DashboardLogin from '../components/login'
import DashboardRegister from '../components/register'
import AuthChecker from '../containers/auth-checker'

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <AuthChecker>
                {' '}
                <App {...props} />
              </AuthChecker>
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <AuthChecker>
                <DashboardLogin {...props} />
              </AuthChecker>
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <AuthChecker>
                <DashboardRegister {...props} />
              </AuthChecker>
            )}
          />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
)

Routes.propTypes = {
  store: PropTypes.shape({}).isRequired,
}

export default Routes
