import { StatusBar, Platform } from 'react-native'

const isIos = Platform.OS === 'ios'
const noop = () => {}
const isNotEqual = (a, b) => JSON.stringify(a) !== JSON.stringify(b)

const StatusBarPlatform = {
  setBarStyle: StatusBar.setBarStyle,
  setHidden: StatusBar.setHidden,
  setNetworkActivityIndicatorVisible: isIos
    ? StatusBar.setNetworkActivityIndicatorVisible
    : noop,
  setBackgroundColor: isIos ? noop : StatusBar.setBackgroundColor,
  setTranslucent: isIos ? noop : StatusBar.setTranslucent,
}

const DEFAULT_STATUS_BAR_CONFIG = {
  setBarStyle: ['light-content'],
  setHidden: [false],
  setNetworkActivityIndicatorVisible: [false],
  setBackgroundColor: ['#000000'],
  setTranslucent: [false],
}

let currentStatusBarState = DEFAULT_STATUS_BAR_CONFIG

export const statusBarHandler = (prevState, currentState) => {
  const { routeParams = {}, parentParams = {} } = currentState
  const nextStatusBarState = routeParams.statusBar || parentParams.statusBar
  if (isNotEqual(currentStatusBarState, nextStatusBarState)) {
    const configToInvoke = {
      ...DEFAULT_STATUS_BAR_CONFIG,
      ...nextStatusBarState,
    }

    Object.keys(configToInvoke).forEach(methodName => {
      const args = configToInvoke[methodName]
      StatusBarPlatform[methodName](...args)
    })

    currentStatusBarState = nextStatusBarState
  }
}
