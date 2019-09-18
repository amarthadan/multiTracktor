import {getCenterOfBounds} from 'geolib'

export const mapCenterFromPoints = (realmResult) => {
  const points = Array.from(realmResult)
  if (points.length === 0) {
    return []
  }

  const center = getCenterOfBounds(points)
  return [center.longitude, center.latitude]
}
