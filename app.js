document.getElementById("weatherForm").addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getweather(city);
})

// const getweather = (city) => {
    const APIkey = "4f62b4511aae25559f2ae77ae94ab77a";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    const cityName = document.getElementById("city")
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            if (data.cod === 200) {
                const weather = data.weather[0].main.toLowerCase();
                let weatherClass;
                let weatherIcon;
                let bodybg = document.getElementById("bg");
                switch (weather) {
                    case 'clear':
                        weatherIcon = 'Images/clear.webp'
                        bodybg.style.background = ""
                        break;
                    case 'sunny':
                        weatherIcon = 'Images/sun.jpg'
                        weatherClass = ''
                        break;
                    case 'clouds':
                        weatherIcon = 'Images/cloud.jpg'
                        let cloud = document.getElementById('cloudbg')
                        break;
                    case 'rainy':
                        weatherIcon = 'Images/rainy.png'
                        weatherClass = 'rainy'
                        break;
                    case 'rain':
                        weatherIcon = 'Images/rainy.png'
                        weatherClass = 'rainy'
                        break;
                    case 'snowy':
                        weatherIcon = 'Images/snowy.jpg'
                        weatherClass = ''
                        break;
                    case 'haze':
                        weatherIcon = 'Images/haze.webp'
                        weatherClass = ''
                        break;
                    case 'smoke':
                        weatherIcon = 'Images/haze.webp'
                        weatherClass = ''
                        break;
                    case 'thunderstorm':
                        weatherIcon = 'Images/thunderstorm.jpg'
                        weatherClass = ''
                        break;

                    default:
                }
                document.body.className = weatherClass;
                weatherResult.innerHTML = `
                <h2><u>${cityName.value.toUpperCase()}</u></h2>
                <img src="${weatherIcon}" alt="" id="weatherIcon">
                <p><b>City:</b>${data.name}</p>
                <p><b>Temprature:</b><span id= 'temp'>${data.main.temp}°C</span></p>
                <p><b>Weather:</b>${data.weather[0].description}</p>
                <p><b>Humidity:</b>${data.main.humidity}%</p>
                <p><b>Wind Speed:</b>${data.wind.speed}(m/s)</p>
                <p><b>Clouds:</b>${data.clouds.all}%</p>                
                <p><b>Feels:</b><span id='feel'>${data.main.feels_like}°C</span></p>                
                `
            } else {
                weatherResult.innerHTML += `<p>${data.message}</p>`
            }

            const weatherMain = data.weather[0].main.toLowerCase();
            if (weatherMain.includes('clear') || weatherMain.includes('sun')) {
                document.body.style.backgroundImage = "url('Images/clearback.webp')";
            } else if (weatherMain.includes('cloud')) {
                document.body.style.backgroundImage = "url('Images/clouds.jpg')";
            } else if (weatherMain.includes('rainy')) {
                document.body.style.backgroundImage = "url('Images/rainybg.jpg')";
            }else if (weatherMain.includes('snowy')) {
                document.body.style.backgroundImage = "url('Images/snowbg.jpg')";
            }else if (weatherMain.includes('haze') || weatherMain.includes('smoke')) {
                document.body.style.backgroundImage = "url('Images/hazebg.webp')";
            } else if (weatherMain.includes('thunderstorm')) {
                document.body.style.backgroundImage = "url('Images/thunderstormbg.jpeg')";
            }  else {
                document.body.style.backgroundImage = "url('Images/default.jpg')";
            }

            if (data.main.feels_like > 40) {
                document.getElementById('feel').style.color = 'red'
            }
            if (data.main.temp > 40) {
                document.getElementById('temp').style.color = 'red'
            }


        })

        .catch(error => {
            document.getElementById('weatherResult').innerHTML += `<p>Error: ${error.message}</p>`
        })
}