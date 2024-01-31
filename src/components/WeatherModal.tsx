import React, { FC } from "react";
import { CurrentWeather, HourlyWeather } from "../App.types";
import {
  Container,
  List,
  ListRow,
  Column,
  ColumnSection,
  ColumnPadding,
  Header,
  Section,
  SectionHeader,
  Paragraph,
} from "./WeatherModal.styled";

type WeatherModalProps = {
  currentWeather?: CurrentWeather;
  hourlyWeather?: HourlyWeather;
  visible: boolean;
};

const WeatherModal: FC<WeatherModalProps> = ({
  currentWeather,
  hourlyWeather,
  visible,
}) => {
  const getTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    return `${hours}:${minutes.slice(-2)}`;
  };

  if (!currentWeather || !hourlyWeather) return null;

  return (
    <Container $visible={visible}>
      <List>
        <Header>Current Weather</Header>
        <Section>
          <Column>
            <SectionHeader>Weather</SectionHeader>
            <Paragraph>{currentWeather.weather}</Paragraph>
          </Column>
          <Column>
            <SectionHeader>Cloud Cover</SectionHeader>
            <Paragraph>{currentWeather.cloudCover}%</Paragraph>
          </Column>
        </Section>
        <Section>
          <Column>
            <SectionHeader>Temperature</SectionHeader>
            <Paragraph>{currentWeather.temperature}°C</Paragraph>
          </Column>
          <Column>
            <SectionHeader>Feels like</SectionHeader>
            <Paragraph>{currentWeather.apparentTemperature}°C</Paragraph>
          </Column>
        </Section>
        <Section>
          <Column>
            <SectionHeader>Humidity</SectionHeader>
            <Paragraph>{currentWeather.humidity}%</Paragraph>
          </Column>
          <Column>
            <SectionHeader>Pressure</SectionHeader>
            <Paragraph>{currentWeather.pressure}hPa</Paragraph>
          </Column>
        </Section>
        <Section>
          <Column>
            <SectionHeader>Wind Speed</SectionHeader>
            <Paragraph>{currentWeather.windSpeed}m/s</Paragraph>
          </Column>
          <Column>
            <SectionHeader>Wind Gust</SectionHeader>
            <Paragraph>{currentWeather.windGust}m/s</Paragraph>
          </Column>
          <Column>
            <SectionHeader>Wind Direction</SectionHeader>
            <Paragraph>{currentWeather.windDirection}°</Paragraph>
          </Column>
        </Section>
        <Section>
          <Column>
            <SectionHeader>Rain</SectionHeader>
            <Paragraph>{currentWeather.rain}mm</Paragraph>
          </Column>
          <Column>
            <SectionHeader>Snow</SectionHeader>
            <Paragraph>{currentWeather.snow}mm</Paragraph>
          </Column>
        </Section>
      </List>
      <>
        <Header>Hourly Forecast</Header>
        <ListRow>
          {hourlyWeather.map((item) => (
            <ColumnSection key={item.timestamp}>
              <ColumnPadding>
                <SectionHeader>Time</SectionHeader>
                <Paragraph>{getTime(item.timestamp)}</Paragraph>
              </ColumnPadding>
              <ColumnPadding>
                <SectionHeader>Weather</SectionHeader>
                <Paragraph>{item.weather}</Paragraph>
              </ColumnPadding>
              <ColumnPadding>
                <SectionHeader>Temperature</SectionHeader>
                <Paragraph>{item.temperature}°C</Paragraph>
              </ColumnPadding>
              <ColumnPadding>
                <SectionHeader>Feels like</SectionHeader>
                <Paragraph>{item.apparentTemperature}°C</Paragraph>
              </ColumnPadding>
              <ColumnPadding>
                <SectionHeader>Precipitation</SectionHeader>
                <Paragraph>{item.precipitation}mm</Paragraph>
              </ColumnPadding>
              <ColumnPadding>
                <SectionHeader>Probability</SectionHeader>
                <Paragraph>{item.precipitationProbability}%</Paragraph>
              </ColumnPadding>
              <ColumnPadding>
                <SectionHeader>Wind Speed</SectionHeader>
                <Paragraph>{item.windSpeed}m/s</Paragraph>
              </ColumnPadding>
            </ColumnSection>
          ))}
        </ListRow>
      </>
    </Container>
  );
};

export { WeatherModal };
