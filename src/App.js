import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(false);



 const fetchData = async (city) => {
  try{
    setLoad(true);
    const d = await fetch('https://api.weatherapi.com/v1/current.json?key=c195d38668e744469cd160726242005&q='+city);
    const jsData = await d.json();
    setData({
      "temperature": jsData.current.temp_c,
      "humidity": jsData.current.humidity,
      "condition": jsData.current.condition.text,
      "wind": jsData.current.wind_kph
    });
    setLoad(false);
    console.log(data);
  }
  catch(e)
  {
    setLoad(false);
    alert("Failed to fetch weather data");
    // setLoad(false);
  }
 }

  const handleSearch = (e) => {
    e.preventDefault();

    let city = e.target.elements.city.value;
    fetchData(city);
    let key = "c195d38668e744469cd160726242005";
  }
  return (
    <div className="App">
      <form onSubmit={handleSearch}>
      <input className="inp box" type ="text" name="city" required placeholder="Enter city name"/>
      <button className="search box" type="submit">Search</button>
      {load && <p>Loading data...</p>}
      </form>
      {
        data && <div className="weather-cards">
        <div className="weather-card"><h2>Temperature</h2><p>{data.temperature}</p></div>
        <div className="weather-card"><h2>Humidity</h2><p>{data.humidity}</p></div>
        <div className="weather-card"><h2>Condition</h2><p>{data.condition}</p></div>
        <div className="weather-card"><h2>Wind Speed</h2><p>{data.wind}</p></div>

      </div>
      }
      
    </div>
  );
}

export default App;
