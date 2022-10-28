const getWeatherData = () => [
    {
        locatin: {
            name: 'Portland',
            coordinates: { lat: 45.5154586, lng: -122.6793461 },
        },
        forecastURl: 'https://api.weather.gov/gridpoints/PQR/112.103/forecast',
        iconUrl: 'https://api.weather.gov/icons/land/day/tsra,40?size=medium',
        weather: 'Chande Showers And Thundersorms',
        temp: '59 F',
    },
    {
        location: {
            name: 'Bend',
            cordinates: {lat: 44.0581728, lng: -121.3153096},
        },
        forecastURl: 'https://api.weather.gov/gridpoints/PDT/34,40/forecast',
        iconUrl: 'https://api.weather.gov/icons/land/day/tsra_sct,50?size=medium',
        weather: 'Scattered Showers And Thundersorms',
        temp: '51 F',
    },
    {
        location: {
            name: 'Manzanita',
            cordinates: {lat: 45.7184398, lng: -123.9351354},
        },
        forecastURl: 'https://api.weather.gov/gridpoints/PQR/73,120/forecast',
        iconUrl: 'https://api.weather.gov/icons/land/day/tsra,90?size=medium',
        weather: 'Showers And Thundersorms',
        temp: '55 F',
    }
]

const weatherMiddlware = async(req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.weatherContext = await getWeatherData()
    next()
}

module.exports = weatherMiddlware