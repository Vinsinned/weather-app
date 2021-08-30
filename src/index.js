import './style.css';
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const errorMessage = document.querySelector('#errorMessage');
const body = document.querySelector('body');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    getData(search.value);
})
async function getData(location) {
    try {
        //Jsonifys the string, and them process it
        let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=68a43187485fd7018b65c705f29ea3cb`)
        let jsonify = await data.json();
        processJSON(jsonify);
        console.log(jsonify)
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = 'The location doesn\'t exist!';
    }
}
function processJSON(json) {
    try {
        //create a weather object and then display it on page
        let weather = {
            location: json.name,
            temperature: json.main.temp,
            min: json.main.temp_min,
            max: json.main.temp_max
        }
        errorMessage.textContent = '';
        displayWeather(weather);
    } catch {
        errorMessage.textContent = 'The location doesn\'t exist!';
    }
}
function displayWeather(weatherObject) {
    let location = document.querySelector('#location');
    let temperature = document.querySelector('#temp');
    let min = document.querySelector('#min');
    let max = document.querySelector('#max');

    location.textContent = weatherObject.location;
    temperature.textContent = weatherObject.temperature + '°F';
    min.textContent = weatherObject.min + '°F';
    max.textContent = weatherObject.max + '°F';
}
getData('London');