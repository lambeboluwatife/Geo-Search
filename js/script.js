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
        let iconCode = data.weather[0].icon;

        weatherOutput1.style.border =  '1px solid #7451eb';
        weatherOutput1.style.borderRadius = '5px';

        document.querySelector('.inputValue').innerHTML = `Weather in ${input.value}`;
        document.querySelector('.iconCode').innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode}.png">`;
        document.querySelector('.description').innerHTML = `${data.weather[0].description}`
        document.querySelector('.temp1').innerHTML = `${Math.round(temp)}℃`;

        document.querySelector('.desc').innerHTML = `Description &#8594; ${data.weather[0].description}`;
        document.querySelector('.desc').style.border = '1px solid #7451eb';
      	document.querySelector('.temp').innerHTML = `Temperature &#8594; ${Math.round(temp)}℃`;
        document.querySelector('.temp').style.border = '1px solid #7451eb';
      	document.querySelector('.speed').innerHTML = `Wind Speed &#8594; ${data.wind.speed}m/s`;
        document.querySelector('.speed').style.border = '1px solid #7451eb';
        document.querySelector('.humidity').innerHTML = `Humidity &#8594; ${data.main.humidity}%`;
        document.querySelector('.humidity').style.border = '1px solid #7451eb';
      	document.querySelector('.press').innerHTML = `Pressure &#8594; ${data.main.pressure} hpa`;
        document.querySelector('.press').style.border = '1px solid #7451eb';
      	document.querySelector('.coord').innerHTML = `Geo Coord &#8594; [${lat}, ${lon}]`;
        document.querySelector('.coord').style.border = '1px solid #7451eb';

        // Temperature Converter
        document.querySelector('.celcius').addEventListener('click', convertToCelcius);
        document.querySelector('.fahranheit').addEventListener('click', convertToFahranheit);

        function convertToCelcius() {
          var celciusTemp = temp;
          document.querySelector('.temp').innerHTML = Math.round(temp) + '&deg' + 'C';
          document.querySelector('.temp1').innerHTML = Math.round(temp) + '&deg' + 'C';
        }

        function convertToFahranheit() {
          var fahranheitTemp = temp;
          var fahranheitTemperature = (temp * 9/5) + 32;
          document.querySelector('.temp').innerHTML = Math.round(fahranheitTemperature) + '&deg' + 'F';
          document.querySelector('.temp1').innerHTML = Math.round(fahranheitTemperature) + '&deg' + 'F';
        }
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
