function displayWeatherData(data) {
    console.log(data)
    console.log(data.weather[0].icon)
    $("#temp").html(data.main.temp + ' ℃');
    $("#weather").html(data.weather[0].description);
    $("#w_img").attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}

function getWeatherData() {
    city = $('#city-name').val();
    $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b102de89e5f921f6591d96f3b8999c70&units=metric`,
            type: "GET",
            success: displayWeatherData
        }
    )
}

function setup() {
    // console.log('getw');
    $('#get_weather').click(getWeatherData);
}
$(document).ready(setup);