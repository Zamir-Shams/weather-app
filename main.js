const apiKey = "aff44b3dbce4797f603acbe55cd40d20";


const weatherData = document.querySelector('.weather-data');
const cityInput = document.getElementById('city-input');
const formEl = document.querySelector('#subm');




formEl.addEventListener("click", (event)=> {
  event.preventDefault()
  const cityValue = cityInput.value;
  getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

      if(!response.ok){
        throw new Error("Network fails")
      }

      const data = await response.json();
      // console.log(data);

      const temperature = Math.round(data.main.temp)
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const lat = Math.round(data.coord.lat * 10) / 10;
      const lon = Math.round(data.coord.lon *10) / 10;
      const countryName = data.sys.country;


      const details = [
        `Country: ${countryName}`,
        `Lat: ${lat}°`,
        `Lon: ${lon}°`,
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity} %`,
        `Wind Spedd: ${data.wind.speed} m/s`
      ]

      weatherData.querySelector(".icon").innerHTML = `<img src="https://www.openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
      weatherData.querySelector(".temperature").textContent = `${temperature}℃`;
      weatherData.querySelector(".description").textContent = description;
      weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");



  }catch(error){
    alert("Network fails, tray again in few seconds")
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent = "";
    weatherData.querySelector(".details").innerHTML = "";

  }
}
