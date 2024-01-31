import React from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Map } from "./views/Map";
import { useAppState } from "./hooks/useAppState";
import { SearchBar } from "./components/SearchBar";
import { WeatherModal } from "./components/WeatherModal";
import { WeatherAPI } from "./api/weather";

function App() {
  const {
    state,
    query,
    setQuery,
    setQueryResults,
    setPosition,
    setCurrentWeather,
    setHourlyWeather,
  } = useAppState();

  const onSearchClick = () => {
    if (!state.queryResults || state.queryResults?.length === 0) {
      toast.error("No results found");
      return;
    }

    const result = state.queryResults[0];
    setPosition({
      lat: result.lat,
      lng: result.lng,
      name: result.name,
      zoom: 10,
    });

    getWeatherData(result.lat, result.lng);

    setQueryResults([]);
    setQuery({ value: result.name, search: false });
  };

  const onGPSClick = () => {
    const onSuccess = (position: any) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 10,
      });

      getWeatherData(position.coords.latitude, position.coords.longitude);

      setQueryResults([]);
      setQuery({ value: "GPS Location", search: false });
    };

    const onError = (error: any) => {
      toast.error("Error getting GPS location");
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  };

  const onResultClick = (result: {
    lat: number;
    lng: number;
    name: string;
  }) => {
    setPosition({
      lat: result.lat,
      lng: result.lng,
      name: result.name,
      zoom: 10,
    });

    getWeatherData(result.lat, result.lng);

    setQueryResults([]);
    setQuery({ value: result.name, search: false });
  };

  const onMapClick = (e: { lat: number; lng: number }) => {
    setPosition({
      lat: e.lat,
      lng: e.lng,
      zoom: 10,
    });

    getWeatherData(e.lat, e.lng);

    setQueryResults([]);
    setQuery({ value: "Location from map", search: false });
  };

  const onClearClick = () => {
    setQuery({ value: "", search: false });
    setQueryResults([]);
    setCurrentWeather();
    setHourlyWeather();
    setPosition();
  };

  const getWeatherData = (lat: number, lng: number) => {
    const client = new WeatherAPI({
      latitude: lat,
      longitude: lng,
      type: "current",
    });

    client.getCurrent().then((data) => {
      setCurrentWeather(data);
    });

    client.getHourly().then((data) => {
      setHourlyWeather(data);
    });
  };

  return (
    <div className="app">
      <ToastContainer
        transition={Zoom}
        position="bottom-left"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
      />
      <Map
        center={state.center}
        position={state.position}
        zoom={state.zoom}
        onClick={onMapClick}
      />
      <SearchBar
        query={query}
        setQuery={setQuery}
        onGPSClick={onGPSClick}
        onSearchClick={onSearchClick}
        onResultClick={onResultClick}
        onClearClick={onClearClick}
        queryResults={state.queryResults}
      />
      <WeatherModal
        visible={!!state.position}
        currentWeather={state.currentWeather}
        hourlyWeather={state.hourlyWeather}
      />
    </div>
  );
}

export default App;
