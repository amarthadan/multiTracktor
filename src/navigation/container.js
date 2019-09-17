import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'

import {ROOT, MAIN, EVENTS} from './routes'
import MainScreen from '../components/MainScreen'
import CalendarScreen from '../components/CalendarScreen'
import SettingsScreen from '../components/SettingsScreen'
import NewEventScreen from '../components/NewEventScreen'
import EventScreen from '../components/EventScreen'
import EventsScreen from '../components/EventsScreen'
import SelectPlaceScreen from '../components/SelectPlaceScreen'

const MainNavigator = createStackNavigator({
  [ROOT.MAIN]: {
    screen: MainScreen,
    navigationOptions: () => ({
      header: null}),
  },
  [MAIN.SETTINGS]: SettingsScreen,
  [MAIN.NEW_EVENT]: NewEventScreen,
  [MAIN.SELECT_PLACE]: SelectPlaceScreen,
})

const EventsNavigator = createStackNavigator({
  [ROOT.Events]: {
    screen: EventsScreen,
    navigationOptions: () => ({
      header: null}),
  },
  [EVENTS.EVENT]: EventScreen,
})

const RootNavigator = createMaterialTopTabNavigator(
  {
    [ROOT.MAIN]: MainNavigator,
    [ROOT.CALENDAR]: CalendarScreen,
    [ROOT.EVENTS]: EventsNavigator,
  },
  {
    tabBarComponent: () => null,
    initialRouteName: ROOT.MAIN,
    order: [ROOT.EVENTS, ROOT.MAIN, ROOT.CALENDAR],
  }
)

const AppContainer = createAppContainer(RootNavigator)

export default AppContainer
