const navigationEventsRegExp = /PUSH|NAVIGATE|POP|BACK|RESET|POP_TO_TOP|REPLACE/
const isEmpty = obj => {
  return !obj || Object.keys(obj).length === 0
}
export const getActiveRouteName = navigationState => {
  if (isEmpty(navigationState)) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return {
    routeName: route.routeName,
    routeParams: route.params,
    parentRouteName: navigationState.routeName,
    parentParams: navigationState.params,
  }
}

export const onRouteChange = (prevState, currentState, action, listeners) => {
  const { type } = action
  if (navigationEventsRegExp.test(type)) {
    const currentScreenState = getActiveRouteName(currentState)
    const prevScreenState = getActiveRouteName(prevState)
    if (listeners) {
      listeners.forEach(
        listener =>
          typeof listener === 'function' &&
          listener(prevScreenState, currentScreenState, action),
      )
    }
  }
}
