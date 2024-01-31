import type { Actions, State } from "./useAppState.types";
import { OpenStreetMapProvider } from "leaflet-geosearch";

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case "CHANGE_POSITION": {
      if (!action.payload) return { ...state, position: undefined };
      const { zoom, lat, lng, name } = action.payload;
      return {
        ...state,
        position: { lat, lng, name },
        zoom: zoom || state.zoom,
      };
    }
    case "QUERY_RESULTS":
      return { ...state, queryResults: [...action.payload] };
    case "WEATHER_CURRENT":
      return { ...state, currentWeather: action.payload };
    case "WEATHER_HOURLY":
      return { ...state, hourlyWeather: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  center: {
    lat: 52.0409,
    lng: 19.285,
  },
  zoom: 5,
};

const provider = new OpenStreetMapProvider();

export { reducer, initialState, provider };
