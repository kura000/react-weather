import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WeatherDetail(props) {

  const city_name = props.match.params.id
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coverColor, setCoverColor] = useState('');

  function utcToJSTime(utcTime){
    return utcTime * 1000;
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_OW_API_URL}/forecast?q=${city_name}&APPID=${process.env.REACT_APP_OW_API_KEY}&units=metric`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      pickCoverColor(result)
      setLoading(false)
    })
    .finally(() => {
      setLoading(false)
    });
  },[city_name])

  function pickCoverColor(data){
    // 色の設定-coverの背景
    const weatherMain = data.list[0].weather[0].main
    const color =
      (weatherMain === 'Clouds') ? 'from-gray-800 to-purple-200' : // 曇り
      (weatherMain === 'Rain') ? 'from-blue-800 to-pink-300' : // 雨
      (weatherMain === 'Clear') ? 'from-green-400 to-blue-700' : // 晴れ
      'from-yellow-400 to-green-500'
    setCoverColor(color)
  }

  if (loading) {
    return <div></div>
  }


  return (
    <div className="bg-gray-300 pb-24">
      <div className="m-auto">
        {data.list.map(function(forecast, index){
          const dateTime = new Date(utcToJSTime(forecast.dt))
          const month = dateTime.getMonth() + 1
          const date = dateTime.getDate()
          const hours = dateTime.getHours()
          const min = String(dateTime.getMinutes()).padStart(2, '0')
          const temperature = Math.round(forecast.main.temp)
          const description = forecast.weather[0].description
          const iconPath = `${process.env.REACT_APP_OW_ICON_URL}/${forecast.weather[0].icon}.png`

          // 現在の天気
          if ( index === 0 ){
            return (
              <div key={index} className="">
                <div className={`bg-gradient-to-r ${coverColor} m-auto text-white text-center pt-24 pb-28 px-10 mb-4`}>
                  <h1 className="text-3xl font-bold">Hourly Forecast</h1>
                  <div className="mt-12 text-2xl ">{data.city.name}</div>
                  <div className="mt-0">
                    <span className="pr-4">{month}/{date}</span>
                    <span className="">{hours}:{min}</span>
                  </div>
                  <div className="icon" className="py-4"><img className="m-auto" src={iconPath} alt={description}  /></div>
                  <div className="info">
                      <p>
                          <span className="block text-2xl">{description}</span>
                          <span className="block text-2xl mt-2">{temperature}°C</span>
                      </p>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="text-gray-900 pt-4 pb-4 px-8 flex items-center justify-between border-b border-gray-900 font-bold max-w-screen-sm m-auto">
                  <div className="info h-16 text-normal flex justify-center items-center flex-col">
                      <span className="block">{month}/{date}</span>
                      <span className="block">{hours}:{min}</span>
                  </div>
                  <picture className="icon w-16"><img src={iconPath} alt={description} /></picture>
                  <div className="text-left w-1/4 text-lg"><span className="description block">{description}</span></div>
                  <div className="w-1/4 text-right text-xl"><span className="temp">{temperature}°C</span></div>
              </div>
            )
          }
        })}
        <div className="text-center px-4">
          <Link to="/" className={`bg-gray-100 text-gray-900 shadow-2xl max-w-screen-sm mx-auto text-center p-6 mt-24 rounded-xl block text-lg font-bold duration-500 transform hover:-translate-y-6`}>
            <span className="">back</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetail
