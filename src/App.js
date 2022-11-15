import logo from "./logo.svg";
import "./App.css";
import { data } from "./weather";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import "./reset.css";
import { useEffect, useState } from "react";

function App() {
  const [res, setRes] = useState();
  const [cityInfo, setCityInfo] = useState();
  const [cityNames, setCityNames] = useState();

  const getCityNames = async () => {
    const result = await fetch("http://localhost:8000/weather/city_names");
    setCityNames(await result.json());
  };

  const cityData = async (cityName) => {
    // console.log(cityName)
    const result = await fetch(`http://localhost:8000/weather/${cityName}`);
    setCityInfo([await result.json()]);
  };

  useEffect(() => {
    const f = async () => {
      const result = await fetch("http://localhost:8000/weather");
      setRes((await result.json()).data);

      await cityData("Tokyo");
    };

    f();
    getCityNames();
  }, []);
  // console.log(cityInfo)
  // console.log({cityNames})

  return (
    <>
      {/* <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {res?.map((item, i)=>(
      <div key={i} style={{width:400,height:100,background:"red", borderRadius:30,padding:20}}>
        <div>id: {item.id}</div>
        <div>title: {item.title}</div>
      </div>
    ))}</div> */}
      <select onChange={(v) => cityData(v.target.value)}>
        {cityNames?.map((v, i) => (
          <option value={v} key={i}>
            {v}
          </option>
        ))}
      </select>

      {cityInfo?.map((item, i) => (
        <div className="card" key={i}>
          <img src="/weather.png" alt="天気の画像" />
          <p>City Name</p>
          <div className="city">
            <div className="date">
              <p>{item.name}</p>
            </div>
          </div>
          <p>Weather Condition</p>
          <div className="date">
            <p>{item.weather[0].main}</p>
          </div>
          <div className="under">
            <div className="Date">
              <p>Data</p>
              <div className="date">
                <p>
                  {new Date(item.dt * 1000)
                    .toLocaleDateString()
                    .split("/")
                    .join("-")}
                </p>
              </div>
            </div>
            <div className="Temp">
              <p>Temprature</p>
              <div className="date">
                <p>{~~(item.main.temp - 273)}℃</p>
              </div>
            </div>
            <div className="Humidity">
              <p>Humidiy</p>
              <div className="date">
                <p>{item.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <br />

      {res?.map((item, i) => (
        <div className="card" key={i}>
          <img src="/weather.png" alt="天気の画像" />
          <p>City Name</p>
          <div className="city">
            <div className="date">
              <p>{item.name}</p>
            </div>
          </div>
          <p>Weather Condition</p>
          <div className="date">
            <p>{item.weather[0].main}</p>
          </div>
          <div className="under">
            <div className="Date">
              <p>Data</p>
              <div className="date">
                <p>
                  {new Date(item.dt * 1000)
                    .toLocaleDateString()
                    .split("/")
                    .join("-")}
                </p>
              </div>
            </div>
            <div className="Temp">
              <p>Temprature</p>
              <div className="date">
                <p>{~~(item.main.temp - 273)}℃</p>
              </div>
            </div>
            <div className="Humidity">
              <p>Humidiy</p>
              <div className="date">
                <p>{item.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
