moment().format('M/D/YYYY');


function searchCity(cityname) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=68e76a2223b87817b42c3c7f173f34df";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=68e76a2223b87817b42c3c7f173f34df";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        $("#current").empty();
       var mainDate = moment().format('M/D/YYYY');
 


       var cityNameEl = $("<h2>").text(response.name);
        var displayMainDate = cityNameEl.append(" " + mainDate);
        var tempEL = $("<p>").text("Temp: " + response.main.temp + "°F");
        var humEl = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windEl = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");
        var currentweather = response.weather[0].main;

        if (currentweather === "Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather=== "Clouds") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather === "Clear") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (currentweather === "Drizzle") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (currentweather === "Snow") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }

        var newDiv = $('<div>');

        newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

        $("#current").html(newDiv);
        

        
var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=68e76a2223b87817b42c3c7f173f34df&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvl-display').empty();
            

            var uvlEl = $("<button class='btn bg-success'>").text("UV Index: " + response.value);
      
            $('#uvl-display').html(uvlEl);
            console.log(response);
    
        });
    });



    
    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {

        var results = response.list;

        $("#forecast").empty();
        console.log(results);
        for (var i = 0; i < 49; i +=8) {

           
 
            var dateObj = new Date(Number(results[i].dt) * 1000);
            var date = dateObj.toLocaleDateString();
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
            var wind = results[i].wind.speed;

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                var icon = "http://openweathermap.org/img/wn/09d.png";
            } else if (weather === "Clouds") {
                var icon = "http://openweathermap.org/img/wn/03d.png";                
            } 
             else if (weather === "Clear") {
                var icon = "http://openweathermap.org/img/wn/01d.png";
            }
             else if (weather === "Drizzle") {
                var icon = "http://openweathermap.org/img/wn/10d.png";               
            }
             else if (weather === "Snow") {
                var icon = "http://openweathermap.org/img/wn/13d.png";               
            }

            var forecastContainer = document.querySelector('#forecast')
            var col = document.createElement('div');
            var card = document.createElement('div');
            var cardBody = document.createElement('div');
            var cardTitle = document.createElement('h5');
            var weatherIcon = document.createElement('img');
            var tempEl = document.createElement('p');
            var windEl = document.createElement('p');
            var humidityEl = document.createElement('p');
          
            col.append(card);
            card.append(cardBody);
            cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
          
            col.setAttribute('class', 'col-md');
            col.classList.add('five-day-card');
            card.setAttribute('class', 'card bg-primary h-100 text-white');
            cardBody.setAttribute('class', 'card-body p-2');
            cardTitle.setAttribute('class', 'card-title');
            tempEl.setAttribute('class', 'card-text');
            windEl.setAttribute('class', 'card-text');
            humidityEl.setAttribute('class', 'card-text');

            cardTitle.textContent = date;
            weatherIcon.setAttribute('src', icon);
            tempEl.textContent =  `Temp: ${temp} °F`;           
            humidityEl.textContent = `Humidity: ${hum} %`;
            windEl.textContent = `Wind: ${wind} MPH`;
          
            forecastContainer.append(col);
        }

        

    });



}
pageLoad();


$("#select-city").on("click", function (event) {

    event.preventDefault();

    var cityInput = $("#city-input").val().trim();

    if(cityInput != ''){
        var textContent = $(this).siblings("input").val();
        var storearr = [];
        storearr.push(textContent);
        localStorage.setItem('cityName', JSON.stringify(storearr));
      
        searchCity(cityInput);
        pageLoad();
    }

});

function pageLoad () {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchhistory").prepend(psearch);
}


$("#searchhistory").on('click', '.btn', function(event) {
event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});
