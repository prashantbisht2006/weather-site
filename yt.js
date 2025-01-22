const search = document.getElementById("searchbutton");
const input = document.getElementById("cityname");
const countryname = document.getElementById("country-name");
const cityname = document.getElementById("city-name");
const temperature = document.getElementById("temperatureC");
const symbol = document.getElementById("symbol");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const bakimage =document.getElementsByClassName("bodi");

// Fetch weather data using an API call
async function getData(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=d4de35667afa4298ac1163358241711&q=${city}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(`Unable to fetch data for city: ${city}`);
    }

    const data = await response.json();
    return data; // Return the JSON data
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    alert("Could not retrieve weather data. Please try again.");
  }
}

// Handle the search button click event
search.addEventListener("click", execute);
input.addEventListener("keydown", async (press) => {
  if (press.key === "Enter") {
    execute();
  }
});

async function execute() {
  const city = input.value.trim(); // Get input value and remove extra spaces
  
  if (!city) {
    alert("Please enter a valid city name.");
    return;
  }

  const result = await getData(city); // Fetch data from the API
  console.log(result);

  if (result) {
    // Update the UI with API data
    countryname.innerText = `${result.location.country}`;
    cityname.innerText = `${result.location.name}`;
    temperature.innerHTML = `${result.current.temp_c}°C`;
    const iconUrl = `https:${result.current.condition.icon}`;
    symbol.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    windSpeed.innerText = `${result.current.wind_kph} km/h`;
    humidity.innerText = `${result.current.humidity}%`;
    backimage.innerHTML = `${result.current.is_day}`;

  }
  // Check the time of day (day or night) and change the background image
if (result.current.is_day === 0) {
  document.body.style.backgroundImage = "url('./assets/night.jpg')";
} else if (result.current.is_day === 1) {
  document.body.style.backgroundImage = "url('./assets/day.jpg')";
}


  // Ensure background styling is consistent
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
  
 
