import { Config } from "./weather.types";
import { CurrentWeather, HourlyWeather } from "../App.types";

class WeatherAPI {
  private readonly url: string;

  constructor(config: Config) {
    this.url = "https://api.open-meteo.com/v1/forecast?";
    this.url += `latitude=${config.latitude}&`;
    this.url += `longitude=${config.longitude}&`;
  }

  async getCurrent(): Promise<CurrentWeather> {
    const params =
      "current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timeformat=unixtime";
    const response = await fetch(this.url + params);
    const body = await response.json();

    return {
      temperature: body.current.temperature_2m,
      apparentTemperature: body.current.apparent_temperature,
      humidity: body.current.relative_humidity_2m,
      weather: this.getWeatherCode(body.current.weather_code),
      windDirection: body.current.wind_direction_10m,
      windSpeed: body.current.wind_speed_10m,
      windGust: body.current.wind_gusts_10m,
      pressure: body.current.surface_pressure,
      rain: body.current.rain,
      snow: body.current.snowfall,
      cloudCover: body.current.cloud_cover,
      elevation: body.elevation,
    };
  }

  async getHourly(): Promise<HourlyWeather> {
    const params =
      "hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&timeformat=unixtime&forecast_days=1";
    const response = await fetch(this.url + params);
    const body = await response.json();

    const data = [];

    for (let i = 0; i < body.hourly.time.length; i++) {
      data.push({
        timestamp: body.hourly.time[i],
        temperature: body.hourly.temperature_2m[i],
        apparentTemperature: body.hourly.apparent_temperature[i],
        precipitationProbability: body.hourly.precipitation_probability[i],
        precipitation: body.hourly.precipitation[i],
        weather: this.getWeatherCode(body.hourly.weather_code[i]),
        windSpeed: body.hourly.wind_speed_10m[i],
      });
    }

    return data;
  }

  private getWeatherCode(code: number): string {
    switch (code) {
      case 0:
        return "Clear sky";
      case 1:
        return "Nearly clear sky";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 45:
      case 48:
        return "Fog";
      case 51:
        return "Light drizzle";
      case 53:
        return "Moderate drizzle";
      case 55:
        return "Heavy drizzle";
      case 56:
        return "Light freezing drizzle";
      case 57:
        return "Heavy freezing drizzle";
      case 61:
        return "Slight rain";
      case 63:
        return "Moderate rain";
      case 65:
        return "Heavy rain";
      case 66:
        return "Light freezing rain";
      case 67:
        return "Heavy freezing rain";
      case 71:
        return "Slight show fall";
      case 73:
        return "Moderate show fall";
      case 75:
        return "Heavy show fall";
      case 77:
        return "Snow grains";
      case 80:
        return "Slight rain showers";
      case 81:
        return "Moderate rain showers";
      case 82:
        return "Violent rain showers";
      case 85:
        return "Slight snow showers";
      case 86:
        return "Heavy snow showers";
      case 95:
        return "Thunderstorm";
      case 96:
        return "Thunderstorm with slight hail";
      case 99:
        return "Thunderstorm with heavy hail";
      default:
        return "Unknown";
    }
  }
}

export { WeatherAPI };
