import logo from "./logo.svg";
import "./App.css";
import { data } from "./weather";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import "./reset.css";

function App() {
  return (
    <>
    {data.map(item=>(
      <>
    <div className="card">
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
      
      </>

    ))}
    </>
  );
}

export default App;
