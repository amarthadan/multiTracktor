import {getCenterOfBounds, findNearest, getDistance} from 'geolib'

export const mapCenterFromPoints = (realmPositions) => {
  const positions = Array.from(realmPositions)
  const center = getCenterOfBounds(positions)
  return [center.longitude, center.latitude]
}

export const distanceFromNearest = (position, realmPositions) => {
  const positions = Array.from(realmPositions)
  const nearest = findNearest(position, positions)

  return getDistance(position, nearest)
}
