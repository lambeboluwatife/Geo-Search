const btn = document.querySelector('.btn');
const text = document.querySelector('.text');
const errorMsg = document.querySelector('.errorMsg');
const weatherOutput1 = document.querySelector('.weatherOutput1');
const weatherOutput2 = document.querySelector('.weatherOutput2');


// Function for Map, Autocomplete and Weather Data
function initMap() {
  // Autocomplete
  const input = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(input);

  // Weather Data
  btn.addEventListener('click', () => {
    text.addEventListener('focus', () => {
      text.style.border = '1px solid #7451eb';
      errorMsg.textContent = '';
      text.value = ''
    });
    if (input.value == '') {
      errorMsg.textContent = 'Enter a Location'
      errorMsg.style.color = 'red';
      errorMsg.style.fontFamily = 'Adobe Devanagari';
      errorMsg.style.fontWeight = 'bold';
      text.style.border = '1px solid red';
    }
    else {
      let output1 = '';
      let output2 = '';
      let key = "&APPID=40547464b0a67a8f5d0e5fcd1364a8fe";
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + "&units=metric" + key)
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        console.log(data);
        let lon = data.coord.lon;
        let lat = data.coord.lat;
        let temp = data.main.temp;

        // Map Option
        let options = {
          zoom: 10,
          center: { lat: lat, lng: lon },
        }

        // New Map
        const map = new
        google.maps.Map(document.getElementById('map'), options);

        // Add Marker
        const marker = new google.maps.Marker({
          position: { lat: lat, lng: lon },
          map: map,

        });

        // Output 1
        let iconCode = data.weather[0].icon
        output1 += `
        <style>
        .result {
          min-width: 250px;
          margin-bottom: 30px;
        }
        .weather-city {
          font: Arial black;;
          margin-top: 0;
        }
        img {
          height: 80px;
          width: 80px;
          border-style: none;
        }
        h4 {
          margin-top: 5px;
          margin-bottom: 5px;
          display: block;
        }
        </style>
        <div class='result'>
        <center>
          <h2 class="weather-city">Weather in ${input.value}</h2>
          <img src="http://openweathermap.org/img/w/${iconCode}.png">
          <h4>${temp}℃</h4>
          <p>${data.weather[0].description}</p>
        </center>
        </div>
        `
        weatherOutput1.innerHTML = output1;

        // Output 2
        output2 += `
        <style>
        table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid #ddd;
            text-align: left;
        }

        th, td {
            text-align: left;
            padding: 15px;
            border: 1px solid #ddd;
            text-align: left;
            font-family: Cambria;
        }

        tr:nth-child(even){background-color: #f2f2f2}
        </style>
        <table style="width:100%">
          <tr>
            <td>Description</td>
            <td>${data.weather[0].description}</td>
          </tr>
          <tr>
            <td>Wind Speed</td>
            <td>${data.wind.speed} m/s</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>${temp}℃</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>${data.main.humidity}%</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>${data.main.pressure} hpa</td>
          </tr>
          <tr>
            <td>Geo Coords</td>
            <td>[${lat}, ${lon}]</td>
          </tr>
        </table>
        `
        weatherOutput2.innerHTML = output2;

      })
      .catch(function(error) {
        // catch any errors
        console.log(error.message);
        errorMsg.textContent = 'City not Found'
        errorMsg.style.color = 'red';
        errorMsg.style.fontFamily = 'Adobe Devanagari';
        errorMsg.style.fontWeight = 'bold';
        text.style.border = '1px solid red';
      });


        // Temperature Converter
        document.querySelector('.celcius').addEventListener('click', convertToCelcius);
        document.querySelector('.fahranheit').addEventListener('click', convertToFahranheit);

        function convertToCelcius() {
          var celciusTemp = temp.textContent;
          var celciusTemperature = Math.round(parseFloat(celciusTemp) - 273.15);
          document.querySelector('.celciusContent').innerHTML = celciusTemperature + '&deg' + 'C';
        }

        function convertToFahranheit() {
          var fahranheitTemp = temp.textContent;
          var fahranheitTemperature = Math.round(((parseFloat(fahranheitTemp) - 273.15) * 1.8) + 32);
          document.querySelector('.fahranheitContent').innerHTML = fahranheitTemperature + '&deg' + 'F';
        }
    }
  });

}
