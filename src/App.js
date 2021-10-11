import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Weather from './Weather';
import WeatherDetail from './WeatherDetail';

function App() {

  const cities = [
    {city_name: 'Tokyo', color_name: 'bg-blue-500'},
    {city_name: 'Paris', color_name: 'bg-yellow-500'},
    {city_name: 'Brazil', color_name: 'bg-green-500'},
    {city_name: 'Toronto', color_name: 'bg-red-500'}
  ];

  return (
    <div className="App min-h-screen">
      <div className="inner w-full m-auto">
        <div className="w-full">
          <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Switch>
              <Route exact path="/">
                <div className="max-w-screen-lg mx-auto py-24">
                  <h1 className="text-4xl font-bold text-center">Current Weather</h1>
                  <p className="mt-4 text-center">click to check Hourly Forecast
                    <span className="text-pink-500 text-lg"> :)</span>
                  </p>
                  <div className="flex flex-wrap justify-center p-8">
                    {
                      cities.map((city,index) =>
                        <Weather
                          key={index}
                          city_name={city.city_name}
                          color={city.color_name}
                        />
                      )
                    }
                  </div>
                </div>
              </Route>
              <Route path="/detail/:id" component={WeatherDetail} />
              <Route path="/detail" component={WeatherDetail} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App;
