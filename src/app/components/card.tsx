import React from 'react';
import styles from '../page.module.css';
import Image from 'next/image';

const Card = ({ month, date, minTemp, maxTemp, weather }) => {
  return (
    <div className={styles.card}>
      <h2>{month}/{date}</h2>
      <p>Min temp: {minTemp} °C</p>
      <p>Max temp: {maxTemp} °C</p>
      <p>Condition: {weather}</p>
    </div>
  );
};

export default Card;