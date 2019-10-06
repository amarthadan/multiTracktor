import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'

import {TAB, MAIN} from './routes'
import MainScreen from '../components/MainScreen'
import CalendarScreen from '../components/CalendarScreen'
import SettingsScreen from '../components/SettingsScreen'
import NewEventScreen from '../components/NewEventScreen'
import EventScreen from '../components/EventScreen'
import EventsScreen from '../components/EventsScreen'
import SelectPlaceScreen from '../components/SelectPlaceScreen'

const TabNavigator = createMaterialTopTabNavigator(
  {
    [TAB.MAIN]: MainScreen,
    [TAB.CALENDAR]: CalendarScreen,
    [TAB.EVENTS]: EventsScreen,
  },
  {
    tabBarComponent: () => null,
    initialRouteName: TAB.MAIN,
    order: [TAB.EVENTS, TAB.MAIN, TAB.CALENDAR],
  }
)

const MainNavigator = createStackNavigator({
  [MAIN.TABS]: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  [MAIN.SETTINGS]: SettingsScreen,
  [MAIN.NEW_EVENT]: NewEventScreen,
  [MAIN.SELECT_PLACE]: SelectPlaceScreen,
  [MAIN.EVENT]: EventScreen,
})

const AppContainer = createAppContainer(MainNavigator)

export default AppContainer
