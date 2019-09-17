import {format, toDate} from 'date-fns'

import {DATETIME_FORMAT} from '../constants'

export const formatTimestamp = (timestamp) => format(toDate(timestamp), DATETIME_FORMAT)
