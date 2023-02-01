const inputField = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");
const weatherContainer = document.getElementById("weatherContainer");

async function getWeather(location) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=94efddd9a6148271849304d0587de840&q=${location}`
    );

    const data = await response.json();

    if (data.cod !== "200") {
      alert("City not found");
    } else {
      console.log(data);

      const getCurrentWeather = data.list[0];

      let city = data.city.name;
      let temperature = getCurrentWeather.main.temp - 272.15;
      let feelsLike = getCurrentWeather.main.feels_like - 272.15;
      let humidity = getCurrentWeather.main.humidity;
      let wind = getCurrentWeather.wind.speed * 3.6;

      new CurrentWeather(
        city,
        temperature.toFixed(2),
        feelsLike.toFixed(2),
        humidity,
        wind.toFixed(2)
      );
    }
  } catch (err) {
    throw new Error();
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputField.value === "") {
    alert("Input field is empty");
  } else {
    getWeather(inputField.value);
  }
});

function CurrentWeather(city, temperature, feelsLike, humidity, wind) {
  this.city = city;
  this.temperature = temperature;
  this.feelsLike = feelsLike;
  this.humidity = humidity;
  this.wind = wind;

  weatherContainer.innerText = "";
  weatherContainer.style.backgroundColor = "#1e212d";

  // city
  let cityName = document.createElement("h2");
  cityName.innerText = city;
  cityName.id = "cityName";
  weatherContainer.appendChild(cityName);

  // temperature
  let currentTemperature = document.createElement("p");
  currentTemperature.innerText = `${temperature}°C`;
  currentTemperature.id = "currentTemperature";
  weatherContainer.appendChild(currentTemperature);

  // feels like temperature
  let feelsLikeTemperature = document.createElement("p");
  feelsLikeTemperature.innerText = `Feels like: ${feelsLike}°C`;
  feelsLikeTemperature.classList.add("weatherDetails");
  weatherContainer.appendChild(feelsLikeTemperature);

  // humidity
  let currentHumidity = document.createElement("p");
  currentHumidity.innerText = `Humidity: ${humidity}%`;
  currentHumidity.classList.add("weatherDetails");
  weatherContainer.appendChild(currentHumidity);

  // wind
  let currentWind = document.createElement("p");
  currentWind.innerText = `Wind: ${wind} km/h`;
  currentWind.classList.add("weatherDetails");
  weatherContainer.appendChild(currentWind);
}
