const myKey = "0689eea5e35b2fb1c29f2bf679c7d9d9";

// Select our DOM elements

let city = document.querySelector("#city");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const country = document.querySelector("#country");
const celsius = document.querySelector("#celsius");
const button = document.querySelector("#button");
const reverse = document.querySelector("#reverse");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const pressure = document.querySelector("#pressure");
const humidityDiv = document.querySelector(".humidity");
const windSpeedDiv = document.querySelector(".wind-speed");
const pressureDiv = document.querySelector(".pressure");

let data;

// Hide our elements

city.innerHTML = "Search city";
icon.style.display = "none";
temperature.innerHTML = "";
description.innerHTML = "";
country.innerHTML = "";
celsius.innerHTML = "";
reverse.style.display = "none";
humidityDiv.innerHTML = "";
windSpeedDiv.style.display = "none";
pressureDiv.style.display = "none";

// Event listener & Fetch

form.addEventListener("submit", function (e) {
    e.preventDefault();

    myLocation = document.querySelector("input").value;
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${myLocation}&APPID=${myKey}&units=metric`
    )
        // then if we get incorrect input
        .then((info) => {
            if (!info.ok) {
                city.innerHTML = "Not Found!";
                icon.style.display = "none";
                temperature.textContent = "";
                description.textContent = "";
                country.textContent = "";
                celsius.textContent = "";
                reverse.style.display = "none";
                humidityDiv.innerHTML = "";
                windSpeedDiv.innerHTML = "";
                pressureDiv.innerHTML = "";
            }

            // If we get correct input we make our response to JSON
            else {
                return info.json();
            }
        })

        // We change our DOM based our API response
        .then((tempData) => {
            data = tempData;
            chooseIcon(data.weather[0].main);
            icon.style.display = "inline";
            reverse.style.display = "inline";
            city.textContent = data.name + ",";
            temperature.textContent = data.main.temp;
            description.textContent = data.weather[0].description;
            country.textContent = data.sys.country;
            celsius.innerHTML = "&#8451";
            humidityDiv.innerHTML = `<h4>Humidity:</h4>
            <h3 id="humidity">${data.main.humidity}</h3>`;
            windSpeedDiv.style.display = "block";
            pressureDiv.style.display = "block";
            humidity.innerHTML = data.main.humidity;
            windSpeed.textContent = `${data.wind.speed} km/hour`;
            pressure.textContent = data.main.pressure;

            // Convert Celsius/Fahrenheit
        });
});

// Fuction for choose icon

function chooseIcon(temperature) {
    switch (temperature) {
        case "Clouds":
            icon.src = "/images/cloudy-img.png";
            break;
        case "Rain":
            icon.src = "/images/rain-img.png";
            break;
        case "Snow":
            icon.src = "/images/snow-img.png";
            break;
        case "Clear":
            icon.src = "/images/sun-img.png";
    }
}

function notShowIcon() {
    return (icon.style.display = "none");
}

reverse.addEventListener("click", function reverseDegrees() {
    let degrees = data.main.temp;
    if (celsius.textContent === "℃") {
        celsius.innerHTML = "&#8457";
        temperature.textContent = ((degrees * 9) / 5 + 32).toFixed(2);
    } else {
        temperature.textContent = degrees;
        celsius.innerHTML = "&#8451";
    }
});
