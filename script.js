const apiKey = "YOUR_API_KEY";

const weatherBox = document.getElementById("weather");
const error = document.getElementById("error");

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();

    if(city !== ""){
        getWeatherByCity(city);
    }
});

document.getElementById("locationBtn").addEventListener("click", () => {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeatherByLocation(lat, lon);

        }, ()=>{
            showError("Location access denied.");
        });

    }else{
        showError("Geolocation not supported.");
    }

});

async function getWeatherByCity(city){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

async function getWeatherByLocation(lat, lon){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

async function fetchWeather(url){

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error();
        }

        const data = await response.json();

        displayWeather(data);

    }catch{
        showError("City not found!");
    }

}

function displayWeather(data){

    error.textContent = "";
    weatherBox.classList.remove("hidden");

    document.getElementById("cityName").textContent =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temp").textContent =
        `${Math.round(data.main.temp)}°C`;

    document.getElementById("condition").textContent =
        data.weather[0].description;

    document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;

    document.getElementById("wind").textContent =
        `${data.wind.speed} m/s`;

    document.getElementById("feels").textContent =
        `${Math.round(data.main.feels_like)}°C`;

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function showError(message){

    weatherBox.classList.add("hidden");
    error.textContent = message;

}