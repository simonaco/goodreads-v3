// packages/goodreads/src/containers/auth-checker/index.js
import { Component } from 'react'
import { checkAuth } from './actions'
import { connect } from 'react-redux'

class AuthCheck extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    return dispatch(checkAuth())
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props
    dispatch(checkAuth())
  }

  render() {
    const { children } = this.props
    return children
  }
}

const mapStateToProps = (state) => {
  console.log(state.auth)
  const { username } = state.auth
  return { username }
}

export default connect(mapStateToProps)(AuthCheck)
