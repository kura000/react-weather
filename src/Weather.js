import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function Weather({city_name, color}) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_OW_API_URL}/weather/?q=${city_name}&APPID=${process.env.REACT_APP_OW_API_KEY}&units=metric`)
    .then(res => res.json())
    .then(result => {
      setData(result);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
  },[city_name])

  if (loading) {
    return <div></div>
  }


  return (
    <Link to={`/detail/${data.name}`} className={`${color} mt-12 rounded-xl shadow-2xl text-white p-8 transform duration-300 hover:-translate-y-6 w-full md:w-1/2 lg:w-1/4`}>

      <div className="w-full">
        <div className="font-bold tracking-more-wider text-sm">
          { dayjs(data.ts).format('YYYY-MM-DD')}
        </div>


        <div className="flex justify-between">
          <p className="text-3xl font-bold">
            { data.name }
          </p>

          <div>
            <img src={`${process.env.REACT_APP_OW_ICON_URL}/${data.weather[0].icon}.png`} alt={data.weather[0].description}/>
          </div>
        </div>

        <div className="pt-4">
          <p className="font-light text-xs">Weather Condition</p>
          <p className="text-lg font-medium tracking-wide">
            { data.weather[0].description }
          </p>
        </div>

        <div className="pt-6 flex">
          <div className="mr-4">
            <p className="font-light text-xs">Temp</p>
            <p className="font-bold tracking-more-wider text-sm mt-1">
              {Math.round(data.main.temp)}°C
            </p>
          </div>

          <div className="mr-4">
            <p className="font-light text-xs">Max</p>
            <p className="font-bold tracking-more-wider text-sm mt-1">
              {Math.round(data.main.temp_max)}°C
            </p>
          </div>

          <div className="">
            <p className="font-light text-xs">Min</p>
            <p className="font-bold tracking-more-wider text-sm mt-1">
              {Math.round(data.main.temp_min)}°C
            </p>
          </div>
        </div>

        <div className="pt-6">
          <p className="font-light text-xs">
            Humidity
          </p>
          <p className="font-bold tracking-more-wider text-sm mt-1">
            {data.main.humidity}%
          </p>
        </div>

      </div>

    </Link>
  )
}

export default Weather
