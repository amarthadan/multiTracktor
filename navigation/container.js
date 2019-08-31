import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import routes from './routes'
import MainScreen from '../components/MainScreen'
import CalendarScreen from '../components/CalendarScreen'

const TabNavigator = createMaterialTopTabNavigator(
  {
    [routes.MAIN]: MainScreen,
    [routes.CALENDAR]: CalendarScreen,
  },
  {
    tabBarComponent: () => null,
  }
)

const AppContainer = createAppContainer(TabNavigator)

export default AppContainer
