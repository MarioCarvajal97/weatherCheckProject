"use client"
import React from 'react';
import styles from './page.module.css';
import Card from './components/card';
import Stack from '@mui/material/Stack';
import { getWeatherMap } from './functions/getWeatherMap';

const IndexPage = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [titleValue, setTitleValue] = React.useState('');
  const [forecastMap, setForecastMap] = React.useState(new Map());
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setForecastMap(new Map());
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (inputValue === '' || specialChars.test(inputValue) || /\d/.test(inputValue)) {
      console.log('Empty or restricted characters in input');
      return;
    }
    setTitleValue(inputValue.toUpperCase());
    const weatherMap = await getWeatherMap(inputValue);
    setForecastMap(weatherMap as Map<string, {date: string, month: string, minTemp: number, maxTemp: number, weather: string}>);
    setInputValue('');
  };

  return (
    <div className={styles.container}>
      <Stack >
        <div className={styles.content}>
          <h1>WEATHER FORECAST SEARCH</h1>
          <p>Enter which city's forecast you'd like to check</p>
          <input type="text" className={styles.inputField} placeholder="Enter city name" value={inputValue} onChange={handleInputChange}/>
          <button className={styles.inputButton} onClick={handleButtonClick}>Search</button>
        </div>
        <div className={styles.additionalContent}>
          <h2>FORECAST FOR {titleValue}</h2>
          <div className={styles.cards}>
          {forecastMap && Array.from(forecastMap.values()).map((card, index) => (
            <Card key={index} month={card.month} date={card.date} minTemp={card.minTemp} maxTemp={card.maxTemp} weather={card.weather} />
            ))}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default IndexPage;
