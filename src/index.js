import './style.css';
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const errorMessage = document.querySelector('#errorMessage');
let currentLocation = null;
submit.addEventListener('click', (event) => {
    event.preventDefault();
    /*
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=68a43187485fd7018b65c705f29ea3cb`)
        .then(data.json())
    .then()
    */
    if (currentLocation != null) {
        console.log(currentLocation)
        let location = currentLocation.name.toLowerCase();
        if (search.value.toLowerCase() === location) {
            errorMessage.textContent = 'The location is already displayed';
        }
    }
    if (search.value == '') {
        errorMessage.textContent = 'Please type in a location';
    } else if (/\d/.test(search.value)) {
        errorMessage.textContent = 'Input shouldn\'t have any numbers'
    }
    if (search.value != '' && search.value.toLowerCase() != location &&
        /\d/.test(search.value) === false) {
        getData(search.value);
    }
})
//do this first
async function getData(location) {
    try {
        //Jsonifys the string, and them process it
        let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=68a43187485fd7018b65c705f29ea3cb`)
        let jsonify = await data.json();
        processJSON(jsonify);
    } catch (error) {
        console.log('error')
        errorMessage.textContent = 'The location doesn\'t exist!';
    }
}
//then this
function processJSON(json) {
    try {
        //create a weather object and then display it on page
        let weather = {
            location: json.name,
            temperature: json.main.temp,
            min: json.main.temp_min,
            max: json.main.temp_max
        }
        displayWeather(weather);
        errorMessage.textContent = '';
        //if it works make currentLocation to location
        currentLocation = json;
    } catch (error) {
        errorMessage.textContent = 'The location doesn\'t exist!';
    }
}
//finally this
async function displayWeather(weatherObject) {
    try {
        let location = document.querySelector('#location');
        let temperature = document.querySelector('#temp');
        let min = document.querySelector('#min');
        let max = document.querySelector('#max');
        location.textContent = weatherObject.location;
        temperature.textContent = weatherObject.temperature + '°F';
        min.textContent = weatherObject.min + '°F';
        max.textContent = weatherObject.max + '°F';
    } catch (error) {
        errorMessage.textContent = 'The location doesn\'t exist!';
    }
}
getData('London');