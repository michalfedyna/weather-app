import React, { FC } from "react";
import styled from "styled-components";
import { CurrentWeather, HourlyWeather } from "../App.types";

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

const Container = styled.div<{ $visible: boolean }>`
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  position: absolute;
  bottom: 16px;
  top: 16px;
  right: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 40%;
  z-index: 10000;
  background-color: #efefef;
  border-radius: 20px;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
    @media (max-width: 1050px) {
        top: calc(70px + 1.5rem + 16px);
        width: calc(100% - 32px);
      }
`;

const List = styled.div`
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const ListRow = styled.div`
    box-sizing: border-box;
    padding: 20px 0;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  margin: 10px;
  padding: 0;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
  background-color: #fff;
  border-radius: 20px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const ColumnSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-shadow: rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
    background-color: #fff;
    border-radius: 20px;
    margin: 10px 10px 0;

    &:first-child {
        margin-left: 20px;
    }

    &:last-child {
        margin-right: 20px;
    }
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
`;

const Paragraph = styled.p`
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
    white-space: nowrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ColumnPadding = styled(Column)`
    padding: 5px;
    width: 100%;
    border-bottom: 2px solid #dedede;
    &:last-child {
        border-bottom: none;
    }
`;

export { WeatherModal };
