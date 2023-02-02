var time = document.getElementById("time")
var date = document.getElementById("date")
var am_pm = document.getElementById("am-pm")
var locations = document.getElementById("location")
var lats = document.getElementById("lat")
var cards = document.getElementById("card")
var currentcard = document.getElementById("currentcard")
var cardsall = document.getElementById("snallcards")

// _________________________________________________________

const API_KEY = '351a7d79a597962bd9a3a9eb63ee8dfb';
var Api_key2 = "49cc8c821cd2aff9af04c9f98c36eb74"

setInterval(function () {
    var d = new Date()
    var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    // console.log(d.getHours())
    var timezone = hours < 10 ? `0${hours}` : hours
    var currtime = timezone + ":" + d.getMinutes()
    var is_am_pm = d.getHours() < 12 ? "am" : "pm"
    // console.log(currtime);
    time.innerHTML = `${currtime} <span id="am-pm">${is_am_pm}</span>`
    var day = new Date().toLocaleTimeString('en-us', { day: "numeric", weekday: "long", month: 'short' }).split(",")
    // console.log(day);
    date.innerHTML = `${day[0]}${day[1]}`
}, 1000)
var lat
var lon;
function getLocations() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log(pos)
            lat = pos.coords.latitude
            lon = pos.coords.longitude

            console.log(lat, lon)
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

                console.log(data)
                locations.innerHTML = data.name
                lats.innerHTML = `${data.coord.lon}/${data.coord.lat}`
                card(data)

            })
            console.log(lat, lon)
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${Api_key2}`).then(res => res.json()).then(data2 => {
                console.log("hi")
                console.log(data2)
                Allcard(data2)
                // locations.innerHTML=data2.name
                // lats.innerHTML=`${data2.coord.lon}/${data2.coord.lat}`
                // card(data2)

            })
        })
    }
    else {
        alert("allow")
    }
}
getLocations()
function card(data) {
    // console.log(data)
    cards.innerHTML = `
    <div class="humi  cards">
    <p>Humidity</p>
    <p>${data.main.humidity}%</p>
</div>
<div class="pres cards">
    <p>pressure</p>
    <p>${data.main.pressure}</p>
</div>
<div class="wind cards">
    <p>Wind Speed</p>
    <p>${data.wind.speed}</p>
</div>
<div class="Sunrise cards">
    <p>Sunrise</p>
    <p>${new Date(data.sys.sunrise * 1000).toLocaleString("en-IN", { formatMatcher: "basic" }).split(",")[1]}</p>
</div>
<div class="Sunset cards">
    <p>Sunset</p>
    <p>${new Date(data.sys.sunset * 1000).toLocaleString("en-IN", { formatMatcher: "basic" }).split(",")[1]}</p>
</div>
<div class="temp cards">
    <p>Temperature</p>
    <p>${data.main.temp}&#176;C</p>
</div>
    `
}


function Allcard(data) {
    var icon = data.daily[0].weather[0].icon
    console.log(icon)
    currentcard.innerHTML = `
    <div class="img" id="img">
    <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="">
</div>
<div class="text">
    <div class="day" id="day">
        ${new Date(data.daily[0].dt * 1000).toLocaleString("en-IN", { weekday: "long" })}
    </div>
    <div id="night " class="days">
        <p>Night- ${data.daily[0].temp.night}&#176;C</p>
        
    </div>
    <div id="Day" class="days">
        <p>Day- ${data.daily[0].temp.day}&#176;C</p>
    </div>
</div>`
data.daily.forEach(function (ele, index)  {
        if (index > 0) {
            console.log(ele.dt)
        cardsall.innerHTML += `
        <div class="cardsall" id="cardsall">
        <div class="day" id="weeks">
        ${new Date(ele.dt * 1000).toLocaleString("en-IN", { weekday: "short" })}
    </div>
    <img src="http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png" alt="">
    <div id="night">
        <p>Night- ${ele.temp.day}&#176;C</p>

        
    </div>
    <div id="Day">
        <p>Day- ${ele.temp.night}&#176;C</p>
        
    </div>
        
        </div>
        `
    }
    });



}

