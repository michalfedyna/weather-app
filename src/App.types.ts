type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weather: string;
  windDirection: number;
  windSpeed: number;
  windGust: number;
  pressure: number;
  rain: number;
  snow: number;
  cloudCover: number;
  elevation: number;
};

type HourlyWeather = Array<{
  timestamp: number;
  temperature: number;
  apparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  weather: string;
  windSpeed: number;
}>;

export type { CurrentWeather, HourlyWeather };
