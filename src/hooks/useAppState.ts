import { useCallback, useEffect, useReducer, useState } from "react";
import { useDebounce } from "use-debounce";
import { initialState, reducer, provider } from "./useAppState.utils";
import { CurrentWeather, HourlyWeather } from "../App.types";

function useAppState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState<{ value: string; search: boolean }>({
    value: "",
    search: false,
  });
  const [queryDebounce] = useDebounce(query, 500);

  useEffect(() => {
    const getLocationsFromQuery = async () => {
      if (queryDebounce.value === "") setQueryResults([]);
      if (!queryDebounce.search) return;

      const results = await provider.search({ query: queryDebounce.value });
      const payload = results.map((result) => ({
        lat: result.y,
        lng: result.x,
        name: result.label,
      }));
      setQueryResults(payload);
    };

    getLocationsFromQuery();
  }, [queryDebounce]);

  const setPosition = useCallback(
    (payload?: { lat: number; lng: number; zoom?: number; name?: string }) => {
      dispatch({ type: "CHANGE_POSITION", payload });
    },
    [],
  );

  const setQueryResults = useCallback(
    (payload: Array<{ lat: number; lng: number; name: string }>) => {
      dispatch({ type: "QUERY_RESULTS", payload });
    },
    [],
  );

  const setCurrentWeather = useCallback((payload?: CurrentWeather) => {
    dispatch({ type: "WEATHER_CURRENT", payload });
  }, []);

  const setHourlyWeather = useCallback((payload?: HourlyWeather) => {
    dispatch({ type: "WEATHER_HOURLY", payload });
  }, []);

  return {
    state,
    query,
    setQuery,
    setPosition,
    setQueryResults,
    setCurrentWeather,
    setHourlyWeather,
  };
}

export { useAppState };
