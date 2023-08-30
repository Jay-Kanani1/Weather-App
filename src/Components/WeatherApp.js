import React, { useState } from 'react';
import './WeatherApp.css'
import search from '../Assets/search.png';
import clear from '../Assets/clear.png';
import clouds from '../Assets/clouds.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import mist from '../Assets/mist.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import feelsLike from '../Assets/feels-like.png';
import visibility from '../Assets/visibility.png';


function WeatherApp() {
    const apiKey = "255c8b9c585407f48bfcb852c8f24369";

    const [weatherIcon, setWeatherIcon] = useState(clear);
    const [display, setDisplay] = useState("weather-hide");
    const [error, setError] = useState("error-hide");
    const [message, setMessage] = useState("message-show");



    const checkWheather = async () => {
        const searchBox = document.getElementsByClassName('cityName');
        const cityname = searchBox[0].value;


        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`);

        if (response.status === 404) {
            setError("error-show");
            setDisplay("weather-hide");
            setMessage("message-hide");
        }
        else {
            var data = await response.json();

            const humidity = document.getElementsByClassName("humidity");
            const wind = document.getElementsByClassName("wind");
            const feelsLike = document.getElementsByClassName("feelsLike");
            const visibility = document.getElementsByClassName("visibility");
            const city = document.getElementsByClassName("weather-city");
            const temp = document.getElementsByClassName("weather-temp");
            const hightemp = document.getElementsByClassName("high-temp");
            const lowtemp = document.getElementsByClassName("low-temp");

            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = data.wind.speed + " KM/H";
            feelsLike[0].innerHTML = Math.floor(data.main.feels_like) + "°C";
            visibility[0].innerHTML = Math.floor(data.visibility / 1000) + " KM";
            city[0].innerHTML = data.name;
            temp[0].innerHTML = Math.floor(data.main.temp) + "°C";
            hightemp[0].innerHTML = "High: " + Math.floor(data.main.temp_max) + "°C";
            lowtemp[0].innerHTML = "Low: " + Math.floor(data.main.temp_min) + "°C";

            if (data.weather[0].main === 'Clouds') {
                setWeatherIcon(clouds);
            }
            else if (data.weather[0].main === "Clear") {
                setWeatherIcon(clear);
            }
            else if (data.weather[0].main === "Rain") {
                setWeatherIcon(rain);
            }
            else if (data.weather[0].main === "Drizzle") {
                setWeatherIcon(drizzle);
            }
            else if (data.weather[0].main === "Mist") {
                setWeatherIcon(mist);
            }
            else if (data.weather[0].main === "Snow") {
                setWeatherIcon(snow);
            }

            setDisplay("weather-show");
            setError("error-hide");
            setMessage("message-hide");

        }

    }
    const searchHandler = (event) => {
        if (event.key === "Enter") {
            checkWheather();
        }
    };


    return (

        <div className='container'>
            <div className="header">
                <input type="text" placeholder=' Enter City Name' className='cityName' spellCheck="false" onKeyUp={searchHandler} />
                <button className="search" onClick={checkWheather}>
                    <img src={search} alt="" />
                </button>
            </div>
            <div className={error}>
                <p>Invalid City Name</p>
            </div>
            <div className={message}>
                <p>Enter a city name to check a weather condition</p>
            </div>
            <div className={display}>
                <div className="weather-detail">
                    <div >
                        <img src={weatherIcon} alt="" className="weather-img" />
                    </div>
                    <div className="weather-city">Toronto</div>
                    <div className="weather-temp">20°C</div>
                    <div className="high-temp">High:</div>
                    <div className="low-temp">Low:</div>

                </div>
                <div className="weather-data">
                    <div className="data-items">
                        <div >
                            <img src={humidity} alt="" />
                            <h3>HUMIDITY</h3>
                        </div>
                        <p className='humidity'>33%</p>
                    </div>
                    <div className="data-items">
                        <div >
                            <img src={wind} alt="" />
                            <h3 >WIND</h3>
                        </div>
                        <p className='wind'>33 KM/H</p>
                    </div>
                    <div className="data-items">
                        <div >
                            <img src={feelsLike} alt="" />
                            <h3>FEELS LIKE</h3>
                        </div>
                        <p className='feelsLike'>33°C</p>
                    </div>
                    <div className="data-items">
                        <div >
                            <img src={visibility} alt="" />
                            <h3>VISIBILITY</h3>
                        </div>
                        <p className='visibility'>33 KM</p>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default WeatherApp
