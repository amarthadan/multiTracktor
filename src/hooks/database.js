import {useEffect, useState} from 'react'

import {getEvent, getEventByDate, getPlace, getPlaces} from '../helpers/database'
import {distanceFromNearest} from '../helpers/maps'

export const useEvent = (eventId) => {
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const loadEvent = async () => {
      setEvent(await getEvent(eventId))
    }

    loadEvent()
  }, [eventId])

  return event
}

export const useEventByDate = (date) => {
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const loadEvent = async () => {
      setEvent(await getEventByDate(date))
    }

    loadEvent()
  }, [date])

  return event
}

export const usePlace = (placeId) => {
  const [place, setPlace] = useState()

  useEffect(() => {
    const loadPlace = async () => {
      setPlace(await getPlace(placeId))
    }

    if (placeId) {
      loadPlace()
    }
  }, [placeId])

  return place
}

export const usePlaces = (currentPosition) => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const loadPlaces = async () => {
      const dbPlaces = await getPlaces()
      if (currentPosition) {
        const sortedPlaces = dbPlaces
          .map((place) =>
            ({...place, distance: distanceFromNearest(currentPosition, place.positions)}))
          .sort((a, b) => a.distance - b.distance)
        setPlaces(sortedPlaces)

        return
      }

      setPlaces(dbPlaces)
    }

    loadPlaces()
  }, [currentPosition])

  return places
}
