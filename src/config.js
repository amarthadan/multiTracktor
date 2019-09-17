import Config from 'react-native-config'
import {compose} from 'redux'

const REQUIRED_IN_ENV = ['MAPBOX_ACCESS_TOKEN']

const checkRequired = (config) => {
  const undefinedRequiredConfigs = REQUIRED_IN_ENV.filter((key: string) => config[key] == null)
  if (undefinedRequiredConfigs.length === 0) {
    return config
  } else {
    throw new Error(
      `The following environment variables are not set: ${undefinedRequiredConfigs.join(', ')}.`
    )
  }
}

export default compose(
  checkRequired,
)(Config)
