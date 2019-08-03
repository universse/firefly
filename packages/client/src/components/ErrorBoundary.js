import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { logError } from 'utils/amplitude'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    this.props.onError(error.toString(), info.componentStack)
  }

  render () {
    const { children, fallback } = this.props

    if (this.state.hasError) {
      return fallback
    }

    return children
  }
}

ErrorBoundary.defaultProps = {
  fallback: <h1>Some shit went wrong</h1>,
  onError: (error, componentStack) => logError({ error, componentStack })
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func
}
