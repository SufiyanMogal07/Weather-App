import React from "react";
import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const WeatherCard = () => {
  const [data, setdata] = useState({});
  const [locationName, setlocationName] = useState("");
  const [isclicked, setisclicked] = useState(false);
  const [error, seterror] = useState(null);
  const [fetched, setfetched] = useState(false);

  const apikey = useRef("31a01e120bfce571f4e28f51bf2f5041");
  async function getData() {
    try {
      let raw = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apikey.current}`
      );
      if (!raw.ok) {
        throw new Error("City Not Found!!!!");
      }
      let res = await raw.json();
      setdata(res);
      setfetched(true);
      seterror(null);
      console.log(res);
    } catch (err) {
      seterror(err.message);
      setfetched(false);
    }
  }
  useEffect(() => {
    if (locationName != "" && isclicked) {
      getData();
      setisclicked(false);
    }
  }, [isclicked]);

  function handleChange(e) {
    setlocationName(e.target.value);
  }

  function handleSearchClick() {
    setisclicked(true);
  }

  
  return (
    <div className="w-container">
      <div className="w-card">
        <div className="w-search-container">
          <input
            value={locationName}
            onChange={handleChange}
            className="w-search-bar"
            type="search"
            name="search-bar"
            placeholder="Enter City Name"
          />
          <button onClick={handleSearchClick} className="w-search-button">
            <IoSearch className="search-icon" />
          </button>
        </div>
        {error && (
          <div className="w-error">
            <h2>{error}</h2>
          </div>
        )}
        {fetched && (
          <div className="w-content">
            <img
              className="w-icon"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
            <div className="w-temperature">
              <h2>{(data.main.temp - 273.15).toFixed(2)}°c</h2>
            </div>
            <div className="w-location">
              <h1>{data.name}</h1>
            </div>
            <div className="w-bottom">
              <div className="w-humidity">
                <span>Humidity: </span>
                <span className="white">{data.main.humidity + "%"}</span>
              </div>
              <div className="w-wind">
                <span>Wind Speed:</span>
                <span className="white">{data.wind.speed + "km/h"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
