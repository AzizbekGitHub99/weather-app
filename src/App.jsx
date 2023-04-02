import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function App() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState(false);
  const [cityName, setCityName] = useState("tashkent");
  const searchRef = useRef();
  const emailRef = useRef()
  const nameRef = useRef()

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=82c9e49a4b64504dd6ac1e90b678d3eb`;

  // login page
  useEffect(() => {
    axios.get("https://reqres.in/api/users/1").then((response) => {
      setUsers(response.data);
      console.log(response.data.data);
    });
  }, []);

  const submit = (e) => {
    e.preventDefault()
    console.log(users);
    
    if (emailRef.current.value == users.data.email && nameRef.current.value == users.data.first_name) {
      setCurrentUser(true);
    } else {
      alert('Try again')
      emailRef.current.value = '';
      nameRef.current.value = ''
    }
  }

  // main page
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setCityName("");
  }, [cityName]);

  const search = (e) => {
    e.preventDefault();
    setCityName(searchRef.current.value);
    searchRef.current.value = "";
  };

  if (data.weather ? data.weather[0].main === "Clouds" : false) {
    document.getElementById("App").style.backgroundImage =
      "url('../images/clouds.jpg')";
  } else if (data.weather ? data.weather[0].main === "Rain" : false) {
    document.getElementById("App").style.backgroundImage =
      "url('../images/rain.jpg')";
  } else if (data.weather ? data.weather[0].main === "Clear" : false) {
    document.getElementById("App").style.backgroundImage =
      "url('../images/clear.jpg')";
  } else if (data.weather ? data.weather[0].main === "Thunderstorm" : false) {
    document.getElementById("App").style.backgroundImage =
      "url('../images/Thunderstorm.webp')";
  } else if (data.weather ? data.weather[0].main === "Mist" : false) {
    document.getElementById("App").style.backgroundImage =
      "url('../images/mist.jpg')";
  }

  return (
    <div id="App">
      {currentUser ? (
        // main section start
        <div className="container">
          <div className="header">
            <input
              required="required"
              ref={searchRef}
              placeholder="Enter Cityname"
              type="text"
            />
            <button className="searchBtn" onClick={(e) => search(e)}>
              <SearchOutlinedIcon />
            </button>
          </div>
          <div className="sidebar">
            <div className="main">
              <p className="city-name">
                {data.name} <br />
                <span>{data.weather ? data.weather[0].main : ""}</span>
              </p>
              <h1>{parseInt(data.main?.temp - 273.15)}°C</h1>
              <div className="weather-info">
                <p>
                  <span>{parseInt(data.main?.feels_like - 273.15)}°C</span>{" "}
                  <br />
                  Feels Like
                </p>
                <p>
                  <span>{data.main?.humidity}%</span> <br />
                  Humidity
                </p>
                <p>
                  <span>{data.wind?.speed} MPH</span> <br /> Wind Speed
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card" onClick={(e) => setCityName("tashkent")}>
                Tashkent
              </div>
              <div className="card" onClick={(e) => setCityName("guliston")}>
                Guliston
              </div>
              <div className="card" onClick={(e) => setCityName("jizzax")}>
                Jizzakh
              </div>
              <div className="card" onClick={(e) => setCityName("samarkand")}>
                Samarkand
              </div>
              <div className="card" onClick={(e) => setCityName("namangan")}>
                Namangan
              </div>
              <div className="card" onClick={(e) => setCityName("fergana")}>
                Fergana
              </div>
              <div className="card" onClick={(e) => setCityName("andijan")}>
                Andijan
              </div>
              <div className="card" onClick={(e) => setCityName("kitob")}>
                Kitob
              </div>
              <div className="card" onClick={(e) => setCityName("termez")}>
                Termez
              </div>
              <div className="card" onClick={(e) => setCityName("bukhara")}>
                Bukhara
              </div>
              <div className="card" onClick={(e) => setCityName("navoiy")}>
                Navoiy
              </div>
              <div className="card" onClick={(e) => setCityName("khiva")}>
                Khiva
              </div>
              <div className="card" onClick={(e) => setCityName("nukus")}>
                Nukus
              </div>
            </div>
          </div>
        </div>
      ) : (
        // second section end
        <div className="registration">
          <form>
            <input className="forms" ref={emailRef} name="email" type="text" placeholder="Enter your email" />
            <input className="forms" ref={nameRef} name="name" type="text" placeholder="Enter your name" />
            <button value={"/"} onClick={(e) => submit(e)}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
