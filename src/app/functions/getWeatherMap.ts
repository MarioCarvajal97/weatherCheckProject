export async function getWeatherMap(input: string) {
  try {
    let lat, lon;
    const apiKey = '0eebd1fcf852d29ca0340c5c451d4c9a';
    const cityCheckRaw = await fetch(`https://search.reservamos.mx/api/v2/places?q=${input}`)
    const cityCheckResponse = await cityCheckRaw.json();
    let city;
    for (const checkCity of cityCheckResponse) {
      if (checkCity.result_type === 'city')
      city = checkCity
      break;
    }
    lat = city.lat;
    lon = city.long;
    const weatherCheckRaw = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weatherCheckResponse = await weatherCheckRaw.json();
    const weatherList =  weatherCheckResponse.list;
    const weatherMap = new Map();
    for (const weatherTimeStamp of weatherList) {
      const day = new Date(weatherTimeStamp.dt * 1000);
      const date = day.getDate().toString();
      let month = (day.getMonth() + 1).toString();
      let minTemp = Number(weatherTimeStamp.main.temp_min) - 273.15;
      let maxTemp = Number(weatherTimeStamp.main.temp_max) - 273.15;
      let weather = weatherTimeStamp.weather[0].main;
      const checkKey = weatherMap.has(date)
      if (!checkKey && weatherMap.size+1 > 5) break;
      if (checkKey) {
        console.log('mins', minTemp, weatherMap.get(date).minTemp);
        console.log('maxs', maxTemp, weatherMap.get(date).maxTemp);
        minTemp = minTemp < weatherMap.get(date).minTemp ? minTemp : weatherMap.get(date).minTemp;
        maxTemp = maxTemp > weatherMap.get(date).maxTemp ? maxTemp : weatherMap.get(date).maxTemp;
        month = weatherMap.get(date).month;
        weather = weatherMap.get(date).weather;
      }
      weatherMap.set(date, { date, month, minTemp: Math.round(minTemp), maxTemp: Math.round(maxTemp), weather });
    }
    return weatherMap;
  } catch (error) {
    console.error('An issue occurred during call to providers');
  }
 
}