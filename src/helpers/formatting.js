import {format} from 'date-fns'

import {DATETIME_FORMAT} from '../constants'

export const formatTimestamp = (timestamp) => format(timestamp, DATETIME_FORMAT)
