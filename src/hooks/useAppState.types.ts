import { CurrentWeather, HourlyWeather } from "../App.types";

type State = {
  center: {
    lat: number;
    lng: number;
  };
  position?: {
    lat: number;
    lng: number;
    name?: string;
  };
  zoom: number;
  queryResults?: Array<{ lat: number; lng: number; name: string }>;
  currentWeather?: CurrentWeather;
  hourlyWeather?: HourlyWeather;
};

type ChangeLocation = {
  type: "CHANGE_POSITION";
  payload?: { lat: number; lng: number; zoom?: number; name?: string };
};

type Query = {
  type: "QUERY_RESULTS";
  payload: Array<{ lat: number; lng: number; name: string }>;
};

type WeatherCurrent = {
  type: "WEATHER_CURRENT";
  payload?: CurrentWeather;
};

type WeatherHourly = {
  type: "WEATHER_HOURLY";
  payload?: HourlyWeather;
};

type Actions = ChangeLocation | Query | WeatherCurrent | WeatherHourly;

export type { State, Actions };
