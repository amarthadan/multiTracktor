export const NAMES = {
  EVENT: 'Event',
  PLACE: 'Place',
  POSITION: 'Position',
}

export const EventSchema = {
  name: NAMES.EVENT,
  primaryKey: 'id',
  properties: {
    id: 'string',
    timestamp: {type: 'int', indexed: true},
    place: NAMES.PLACE,
  },
}

export const PlaceSchema = {
  name: NAMES.PLACE,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    positions: {type: 'linkingObjects', objectType: NAMES.POSITION, property: 'place'},
  },
}

export const PositionSchema = {
  name: NAMES.POSITION,
  primaryKey: 'id',
  properties: {
    id: 'string',
    lat: 'double',
    long: 'double',
    place: NAMES.PLACE,
  },
}

export const schemas = [EventSchema, PlaceSchema, PositionSchema]
